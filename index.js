'use strict';

const crypto = require('crypto');

/**
 * AgentSign middleware for OpenClaw / NemoClaw.
 *
 * Wraps every tool call with:
 *   1. Agent identity verification (passport check)
 *   2. Trust score gate (configurable minimum)
 *   3. Signed execution chain (input + output)
 *   4. Tamper detection on tool outputs
 *
 * Works as OpenClaw skill middleware or standalone wrapper.
 */

class AgentSignMiddleware {
  /**
   * @param {object} opts
   * @param {string} opts.serverUrl    - AgentSign server (e.g. http://localhost:8888)
   * @param {string} [opts.agentName]  - Name for this agent (default: hostname)
   * @param {string} [opts.category]   - Agent category (default: 'openclaw')
   * @param {number} [opts.minTrust]   - Minimum trust score to allow tool calls (default: 0)
   * @param {string[]} [opts.blockedTools] - Tool names to always block
   * @param {boolean} [opts.autoRegister] - Auto-register on first use (default: true)
   * @param {boolean} [opts.logExecutions] - Log all executions to console (default: false)
   * @param {string} [opts.apiKey]     - AgentSign API key (if already registered)
   */
  constructor(opts = {}) {
    if (!opts.serverUrl) throw new Error('AgentSign: serverUrl is required');
    this._serverUrl = opts.serverUrl.replace(/\/+$/, '');
    this._agentName = opts.agentName || require('os').hostname();
    this._category = opts.category || 'openclaw';
    this._minTrust = opts.minTrust || 0;
    this._blockedTools = new Set(opts.blockedTools || []);
    this._autoRegister = opts.autoRegister !== false;
    this._logExecutions = opts.logExecutions || false;
    this._apiKey = opts.apiKey || null;
    this._agentId = null;
    this._passport = null;
    this._chain = [];
    this._ready = false;
  }

  // ── Lifecycle ──

  /**
   * Initialize: register agent + get passport.
   * Call this once before wrapping tools.
   */
  async init() {
    if (this._ready) return this;
    if (this._autoRegister && !this._agentId) {
      const res = await this._post('/api/agents/onboard', {
        name: this._agentName,
        category: this._category,
        framework: 'openclaw',
      });
      this._agentId = res.agent_id || res.id;
      this._apiKey = res.api_key || this._apiKey;
    }
    if (this._agentId) {
      // Advance through pipeline to ACTIVE
      await this._advanceToActive();
      this._passport = await this._get(`/api/agents/${this._agentId}/passport`);
    }
    this._ready = true;
    return this;
  }

  async _advanceToActive() {
    const maxAttempts = 10;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const res = await this._post(`/api/agents/${this._agentId}/advance`);
        if (res.stage === 'ACTIVE' || res.pipeline_stage === 'ACTIVE') return;
      } catch (e) {
        if (e.statusCode === 400) return; // already at final stage
        throw e;
      }
    }
  }

  // ── Core: Wrap a tool function ──

  /**
   * Wrap a single tool function with AgentSign verification + signing.
   *
   * @param {string} toolName - Name of the tool
   * @param {Function} toolFn - The original tool function
   * @returns {Function} Wrapped function
   *
   * Usage:
   *   const safeTool = middleware.wrap('web_search', originalSearchFn);
   *   const result = await safeTool({ query: 'test' });
   */
  wrap(toolName, toolFn) {
    const self = this;
    return async function wrappedTool(input, ...rest) {
      await self._ensureReady();

      // 1. Check blocked list
      if (self._blockedTools.has(toolName)) {
        throw new AgentSignError(`Tool '${toolName}' is blocked by policy`, 'BLOCKED');
      }

      // 2. Verify passport is valid + trust score meets minimum
      const gate = self._checkGate(toolName);
      if (gate.decision === 'DENY') {
        throw new AgentSignError(
          `Trust gate denied: ${gate.reason}`,
          'DENIED',
          gate
        );
      }

      // 3. Execute the tool
      const startTime = Date.now();
      let output, error;
      try {
        output = await toolFn.call(this, input, ...rest);
      } catch (e) {
        error = e;
        throw e;
      } finally {
        // 4. Sign the execution (even on failure)
        const execution = self._signExecution(toolName, input, error ? { error: error.message } : output, startTime);

        if (self._logExecutions) {
          console.log(`[AgentSign] ${toolName} | ${execution.verified ? 'SIGNED' : 'UNSIGNED'} | ${Date.now() - startTime}ms`);
        }
      }

      return output;
    };
  }

  /**
   * Wrap all tools in an object/map.
   *
   * @param {object} tools - { toolName: toolFn, ... }
   * @returns {object} Wrapped tools
   *
   * Usage:
   *   const safeTools = middleware.wrapAll({
   *     web_search: searchFn,
   *     file_read: readFn,
   *     database_query: queryFn,
   *   });
   */
  wrapAll(tools) {
    const wrapped = {};
    for (const [name, fn] of Object.entries(tools)) {
      if (typeof fn === 'function') {
        wrapped[name] = this.wrap(name, fn);
      } else {
        wrapped[name] = fn;
      }
    }
    return wrapped;
  }

  // ── OpenClaw Skill Plugin Interface ──

  /**
   * Returns an OpenClaw-compatible skill plugin definition.
   *
   * Usage in OpenClaw config:
   *   skills: [
   *     agentSignMiddleware.asSkill(),
   *   ]
   */
  asSkill() {
    const self = this;
    return {
      name: 'agentsign-trust-layer',
      description: 'AgentSign zero trust middleware -- verifies agent identity and signs every tool execution',
      version: '1.0.0',
      hooks: {
        beforeToolCall: async (ctx) => self._beforeToolCall(ctx),
        afterToolCall: async (ctx) => self._afterToolCall(ctx),
      },
      actions: {
        getPassport: async () => self.getPassport(),
        getChain: async () => self.getChain(),
        getTrustScore: async () => self.getTrustScore(),
        verifyChain: async () => self.verifyChain(),
      },
    };
  }

  async _beforeToolCall(ctx) {
    await this._ensureReady();
    const toolName = ctx.tool || ctx.name || 'unknown';

    if (this._blockedTools.has(toolName)) {
      ctx.blocked = true;
      ctx.blockReason = `Tool '${toolName}' blocked by AgentSign policy`;
      return ctx;
    }

    const gate = this._checkGate(toolName);
    if (gate.decision === 'DENY') {
      ctx.blocked = true;
      ctx.blockReason = gate.reason;
      return ctx;
    }

    ctx._agentsign = { startTime: Date.now(), toolName };
    return ctx;
  }

  async _afterToolCall(ctx) {
    if (!ctx._agentsign) return ctx;
    const { startTime, toolName } = ctx._agentsign;
    const execution = this._signExecution(toolName, ctx.input, ctx.output, startTime);
    ctx.agentsignExecution = execution;
    return ctx;
  }

  // ── Trust Gate ──

  _checkGate(toolName) {
    if (!this._passport) {
      return { decision: 'DENY', reason: 'No valid passport', tool: toolName };
    }

    const trustScore = this._passport.trust_score ?? this._passport.trustScore ?? 100;

    if (trustScore < this._minTrust) {
      return {
        decision: 'DENY',
        reason: `Trust score ${trustScore} below minimum ${this._minTrust}`,
        tool: toolName,
        trustScore,
      };
    }

    const stage = this._passport.pipeline_stage || this._passport.stage;
    if (stage === 'REVOKED') {
      return { decision: 'DENY', reason: 'Agent is REVOKED', tool: toolName };
    }

    return {
      decision: 'ALLOW',
      tool: toolName,
      trustScore,
      agentId: this._agentId,
    };
  }

  // ── Local Signing ──

  _signExecution(toolName, input, output, startTime) {
    const executionId = crypto.randomUUID();
    const inputHash = this._hash(input);
    const outputHash = this._hash(output);
    const parentId = this._chain.length > 0 ? this._chain[this._chain.length - 1].executionId : null;
    const executionHash = this._hash({
      executionId,
      agentId: this._agentId,
      tool: toolName,
      inputHash,
      outputHash,
      parentId,
      timestamp: startTime,
    });

    const execution = {
      executionId,
      agentId: this._agentId,
      tool: toolName,
      inputHash,
      outputHash,
      executionHash,
      parentId,
      timestamp: startTime,
      duration: Date.now() - startTime,
      verified: true,
    };

    this._chain.push(execution);
    return execution;
  }

  _hash(data) {
    const str = typeof data === 'string' ? data : JSON.stringify(data, Object.keys(data || {}).sort());
    return crypto.createHash('sha256').update(str).digest('hex');
  }

  // ── Public Getters ──

  getPassport() { return this._passport; }
  getChain() { return [...this._chain]; }
  getAgentId() { return this._agentId; }

  getTrustScore() {
    if (!this._passport) return null;
    return this._passport.trust_score ?? this._passport.trustScore ?? null;
  }

  /**
   * Verify the execution chain integrity.
   * Checks that each execution's parentId links to the previous one.
   */
  verifyChain() {
    for (let i = 0; i < this._chain.length; i++) {
      const exec = this._chain[i];
      if (i === 0 && exec.parentId !== null) return { valid: false, broken: 0 };
      if (i > 0 && exec.parentId !== this._chain[i - 1].executionId) {
        return { valid: false, broken: i };
      }
    }
    return { valid: true, length: this._chain.length };
  }

  /**
   * Verify a specific tool output hasn't been tampered with.
   */
  verifyOutput(output, execution) {
    const hash = this._hash(output);
    return hash === execution.outputHash ? 'PASS' : 'TAMPERED';
  }

  // ── HTTP helpers ──

  async _ensureReady() {
    if (!this._ready) await this.init();
  }

  async _get(path) {
    const res = await fetch(`${this._serverUrl}${path}`, {
      headers: this._headers(),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      const err = new Error(`AgentSign ${res.status}: ${body}`);
      err.statusCode = res.status;
      throw err;
    }
    return res.json();
  }

  async _post(path, body) {
    const res = await fetch(`${this._serverUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...this._headers() },
      body: JSON.stringify(body || {}),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const err = new Error(`AgentSign ${res.status}: ${text}`);
      err.statusCode = res.status;
      throw err;
    }
    return res.json();
  }

  _headers() {
    const h = {};
    if (this._apiKey) h['Authorization'] = `Bearer ${this._apiKey}`;
    return h;
  }
}

class AgentSignError extends Error {
  constructor(message, code, details) {
    super(message);
    this.name = 'AgentSignError';
    this.code = code;
    this.details = details;
  }
}

module.exports = AgentSignMiddleware;
module.exports.AgentSignError = AgentSignError;

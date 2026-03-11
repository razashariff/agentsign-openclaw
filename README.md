<p align="center">
  <h1 align="center">agentsign-openclaw</h1>
  <p align="center"><strong>Zero Trust Middleware for OpenClaw & NemoClaw</strong></p>
  <p align="center">
    <a href="https://www.npmjs.com/package/agentsign-openclaw"><img src="https://img.shields.io/npm/v/agentsign-openclaw?color=blue" alt="npm"></a>
    <a href="https://github.com/razashariff/agentsign-openclaw"><img src="https://img.shields.io/github/stars/razashariff/agentsign-openclaw?style=social" alt="stars"></a>
    <a href="https://github.com/razashariff/agentsign-openclaw/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license"></a>
    <a href="https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"></a>
  </p>
</p>

---

Drop-in trust layer for [OpenClaw](https://github.com/openclaw/openclaw) and [NemoClaw](https://nemoclaw.bot). Every tool call gets identity verification, signed execution chains, and trust gating. Zero runtime dependencies.

```
Agent Runtime (OpenClaw / NemoClaw)
    |
  AgentSign Middleware
    |-- Verify agent identity (passport)
    |-- Check trust score before tool access
    |-- Sign execution (input + output hash)
    |-- Build cryptographic execution chain
    |
  MCP Tools / APIs
```

## Try It

**[Open in Google Colab](https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb)** -- interactive demo with live server, no setup needed.

**Live server:** `https://agentsign-api.fly.dev`

## Install

```bash
npm install agentsign-openclaw agentsign
```

## Quick Start -- Wrap Tools (3 lines)

```javascript
const AgentSignMiddleware = require('agentsign-openclaw');

const middleware = new AgentSignMiddleware({
  serverUrl: 'http://localhost:8888',
  agentName: 'My OpenClaw Agent',
  minTrust: 50,  // block tools if trust drops below 50
});

// Wrap individual tools
const safeSearch = middleware.wrap('web_search', originalSearchFn);
const result = await safeSearch({ query: 'latest news' });
// -> tool executes, input/output signed, added to execution chain

// Or wrap all tools at once
const safeTools = middleware.wrapAll({
  web_search: searchFn,
  file_read: readFn,
  database_query: queryFn,
  send_email: emailFn,
});
```

## OpenClaw Skill Plugin

```javascript
const AgentSignMiddleware = require('agentsign-openclaw');

const middleware = new AgentSignMiddleware({
  serverUrl: 'http://localhost:8888',
  minTrust: 50,
  blockedTools: ['shell_exec', 'file_delete'],
  logExecutions: true,
});

// Register as OpenClaw skill
module.exports = {
  skills: [
    middleware.asSkill(),
    // ... your other skills
  ],
};
```

The skill hooks run automatically:
- **beforeToolCall** -- checks passport, trust score, blocked list
- **afterToolCall** -- signs the execution, adds to chain

## Trust Gating

Block tools based on trust score or policy:

```javascript
const middleware = new AgentSignMiddleware({
  serverUrl: 'http://localhost:8888',
  minTrust: 70,                              // minimum trust score
  blockedTools: ['shell_exec', 'file_delete'], // always blocked
});

// Agent with trust score 45 tries to call a tool:
// -> AgentSignError: Trust score 45 below minimum 70

// Agent tries shell_exec:
// -> AgentSignError: Tool 'shell_exec' is blocked by policy
```

## Execution Chain

Every tool call is signed and linked to the previous one:

```javascript
await safeSearch({ query: 'test' });
await safeRead({ path: '/data.json' });
await safeQuery({ sql: 'SELECT *' });

// Get the full chain
const chain = middleware.getChain();
// [
//   { executionId: '...', tool: 'web_search', parentId: null, ... },
//   { executionId: '...', tool: 'file_read', parentId: '<search-id>', ... },
//   { executionId: '...', tool: 'database_query', parentId: '<read-id>', ... },
// ]

// Verify chain integrity
middleware.verifyChain();  // { valid: true, length: 3 }

// Verify specific output wasn't tampered
middleware.verifyOutput(result, chain[0]);  // 'PASS' or 'TAMPERED'
```

## API

| Method | Description |
|--------|-------------|
| `new AgentSignMiddleware(opts)` | Create middleware instance |
| `init()` | Register agent + get passport (auto-called on first wrap) |
| `wrap(name, fn)` | Wrap a single tool function |
| `wrapAll(tools)` | Wrap all tools in an object |
| `asSkill()` | Get OpenClaw skill plugin definition |
| `getPassport()` | Get agent's cryptographic passport |
| `getChain()` | Get signed execution chain |
| `getAgentId()` | Get agent ID |
| `getTrustScore()` | Get current trust score |
| `verifyChain()` | Verify chain integrity |
| `verifyOutput(output, exec)` | Check output for tampering |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `serverUrl` | string | required | AgentSign server URL |
| `agentName` | string | hostname | Agent display name |
| `category` | string | 'openclaw' | Agent category |
| `minTrust` | number | 0 | Minimum trust score to allow tool calls |
| `blockedTools` | string[] | [] | Tools to always block |
| `autoRegister` | boolean | true | Auto-register on first use |
| `logExecutions` | boolean | false | Log executions to console |
| `apiKey` | string | null | Pre-existing AgentSign API key |

## How It Works

1. **Agent registers** with AgentSign server, gets cryptographic passport
2. **Before each tool call**: passport validity checked, trust score verified, blocked list consulted
3. **Tool executes** normally
4. **After each tool call**: input/output hashed, execution signed, linked to chain
5. **Chain is verifiable** -- any tampering breaks the hash links

## Requirements

- Node >= 18 (uses native `fetch` and `crypto`)
- AgentSign server running ([self-host](https://github.com/razashariff/agentsign) or use hosted)

---

CyberSecAI Ltd -- [agentsign.dev](https://agentsign.dev)

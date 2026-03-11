#!/usr/bin/env node
/**
 * AgentSign + OpenClaw Live Demo
 *
 * Shows the zero trust middleware wrapping agent tool calls:
 *   1. Agent registers + gets cryptographic passport
 *   2. Tools are wrapped with trust verification
 *   3. Every tool call is signed into an execution chain
 *   4. Trust gating blocks low-trust or dangerous tools
 *   5. Tamper detection catches modified outputs
 *
 * Usage:
 *   node demo.js [server-url]
 *   node demo.js https://agentsign-api.fly.dev
 */

const AgentSignMiddleware = require('./index');

const SERVER = process.argv[2] || 'http://localhost:8888';

// Simulated OpenClaw tools
const tools = {
  web_search: async (input) => {
    return { results: [`Result for: ${input.query}`, 'https://example.com'], count: 2 };
  },
  file_read: async (input) => {
    return { content: `Contents of ${input.path}`, size: 1024 };
  },
  database_query: async (input) => {
    return { rows: [{ id: 1, name: 'Agent Alpha' }], count: 1 };
  },
  send_email: async (input) => {
    return { sent: true, to: input.to, messageId: 'msg_' + Date.now() };
  },
  shell_exec: async (input) => {
    return { stdout: 'command output', exitCode: 0 };
  },
};

function log(icon, msg) {
  console.log(`  ${icon}  ${msg}`);
}

function divider(title) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  ${title}`);
  console.log('='.repeat(60));
}

async function demo() {
  console.log('\n');
  console.log('  ================================================');
  console.log('  AgentSign + OpenClaw/NemoClaw -- Live Demo');
  console.log('  Zero Trust Middleware for AI Agents');
  console.log('  ================================================');
  console.log(`\n  Server: ${SERVER}\n`);

  // ── Step 1: Create middleware ──
  divider('STEP 1: Initialize AgentSign Middleware');

  const middleware = new AgentSignMiddleware({
    serverUrl: SERVER,
    agentName: 'OpenClaw Research Agent',
    category: 'research',
    minTrust: 30,
    blockedTools: ['shell_exec'],
    logExecutions: true,
  });

  await middleware.init();
  const passport = middleware.getPassport();

  log('OK', `Agent registered: ${middleware.getAgentId()}`);
  log('OK', `Trust score: ${middleware.getTrustScore()}`);
  log('OK', `Passport received (${Object.keys(passport).length} fields)`);

  // ── Step 2: Wrap tools ──
  divider('STEP 2: Wrap OpenClaw Tools with Trust Layer');

  const safeTools = middleware.wrapAll(tools);
  log('OK', `Wrapped ${Object.keys(safeTools).length} tools`);
  log('OK', 'Every tool call now verified + signed automatically');

  // ── Step 3: Execute tools ──
  divider('STEP 3: Execute Tools (signed execution chain)');

  console.log('\n  --- web_search ---');
  const searchResult = await safeTools.web_search({ query: 'AI agent security' });
  log('OK', `Result: ${JSON.stringify(searchResult)}`);

  console.log('\n  --- file_read ---');
  const fileResult = await safeTools.file_read({ path: '/data/agents.json' });
  log('OK', `Result: ${JSON.stringify(fileResult)}`);

  console.log('\n  --- database_query ---');
  const dbResult = await safeTools.database_query({ sql: 'SELECT * FROM agents' });
  log('OK', `Result: ${JSON.stringify(dbResult)}`);

  console.log('\n  --- send_email ---');
  const emailResult = await safeTools.send_email({ to: 'team@example.com', body: 'Report ready' });
  log('OK', `Result: ${JSON.stringify(emailResult)}`);

  // ── Step 4: Blocked tool ──
  divider('STEP 4: Trust Gate -- Blocked Tool');

  console.log('\n  --- shell_exec (BLOCKED by policy) ---');
  try {
    await safeTools.shell_exec({ cmd: 'rm -rf /' });
    log('!!', 'ERROR: should have been blocked!');
  } catch (e) {
    log('BLOCKED', `${e.message}`);
    log('OK', 'Dangerous tool blocked by AgentSign policy');
  }

  // ── Step 5: Execution chain ──
  divider('STEP 5: Signed Execution Chain');

  const chain = middleware.getChain();
  console.log(`\n  Chain length: ${chain.length} executions\n`);

  chain.forEach((exec, i) => {
    const parent = exec.parentId ? exec.parentId.substring(0, 8) + '...' : 'null (root)';
    console.log(`  [${i}] ${exec.tool}`);
    console.log(`      ID:     ${exec.executionId.substring(0, 8)}...`);
    console.log(`      Parent: ${parent}`);
    console.log(`      Input:  ${exec.inputHash.substring(0, 16)}...`);
    console.log(`      Output: ${exec.outputHash.substring(0, 16)}...`);
    console.log(`      Time:   ${exec.duration}ms`);
    console.log('');
  });

  // ── Step 6: Chain verification ──
  divider('STEP 6: Verify Chain Integrity');

  const verification = middleware.verifyChain();
  log(verification.valid ? 'OK' : '!!', `Chain valid: ${verification.valid}`);
  log('OK', `Chain length: ${verification.length}`);

  // ── Step 7: Tamper detection ──
  divider('STEP 7: Tamper Detection');

  const originalOutput = searchResult;
  const tamperedOutput = { ...searchResult, results: ['INJECTED RESULT'] };

  log('OK', `Original output: ${middleware.verifyOutput(originalOutput, chain[0])}`);
  log('!!', `Tampered output: ${middleware.verifyOutput(tamperedOutput, chain[0])}`);

  // ── Summary ──
  divider('SUMMARY');

  console.log(`
  Agent:       ${middleware.getAgentId()}
  Trust Score: ${middleware.getTrustScore()}
  Tools:       ${Object.keys(tools).length} wrapped
  Executions:  ${chain.length} signed
  Blocked:     1 (shell_exec)
  Chain:       ${verification.valid ? 'VALID' : 'BROKEN'}
  Tamper:      DETECTED

  Every tool call cryptographically signed.
  Every execution linked to the previous one.
  Trust verified before every action.
  No verification, no trust.
  `);
}

demo().catch(e => {
  console.error('\n  ERROR:', e.message);
  console.error('  Make sure AgentSign server is running at', SERVER);
  process.exit(1);
});

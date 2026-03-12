# AgentSign Launch Posts -- All Platforms

Contact: contact@agentsign.dev
Site: https://agentsign.dev
Colab: https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb
GitHub: https://github.com/razashariff/agentsign
npm: https://www.npmjs.com/package/agentsign-openclaw
Patent: GB2604808.2 (UKIPO)

---

## 1. PRODUCT HUNT

**Tagline:** Zero trust identity for AI agents. OWASP Agentic Top 10 aligned. Cryptographic passports, signed executions, instant revocation.

**Description:**

AI agents are being deployed without identity, without audit trails, and without kill switches.

135,000 OpenClaw instances were found exposed to the internet. 36% of ClawHub skills contain prompt injection. OWASP's 2026 Top 10 for Agentic Applications now defines the risks -- from Goal Hijacking (ASI01) to Rogue Agents (ASI10). Every one of these risks requires an identity and trust layer that doesn't exist in any current framework.

AgentSign fixes this.

Every agent gets a cryptographic passport. Every execution is signed and chained. Every MCP tool call goes through THE GATE -- identity + trust score + pipeline stage verified before access is granted. Our 13-point scanner maps directly to 7 of the 10 OWASP Agentic risks.

**What it does:**
- 7-stage pipeline: INTAKE -> VETTING -> TESTING -> DEV -> PROD -> ACTIVE | REVOKED
- 13-point SDLC security scanner aligned to OWASP Agentic Top 10 (ASI01-ASI10)
- Scanner catches: prompt injection (ASI01), tool misuse (ASI02), privilege abuse (ASI03), oversight gaps (ASI04), unsafe memory (ASI05), unsafe execution (ASI07), rogue agents (ASI10)
- Trust scoring (0-100) earned through verified behavior, not assumed
- MCP verification gate -- agents must prove identity before accessing any tool server
- CA co-signing for external trust (like SSL certs for agents)
- Instant revocation -- trust drops to 0, all access denied, wallet frozen
- Works with ANY framework: OpenClaw, NemoClaw, AutoGen, CrewAI, LangChain, Claude MCP

**On-prem. Customer-owned keys. Nothing phones home. OWASP-aligned security from day one.**

Built by AI security architects. Patent pending (GB2604808.2).

Try the full pipeline in 5 minutes:
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

https://agentsign.dev
contact@agentsign.dev

---

## 2. HACKER NEWS (Show HN)

**Title:** Show HN: AgentSign -- Zero trust engine for AI agents (cryptographic passports, signed executions)

**Body:**

We built AgentSign because AI agents have no identity.

The problem is real. 135K OpenClaw instances exposed to the internet. 36% of ClawHub skills contain prompt injection. OWASP's 2026 Top 10 for Agentic Applications now defines the threat landscape -- Goal Hijacking (ASI01), Tool Misuse (ASI02), Identity Abuse (ASI03), Insufficient Oversight (ASI04), Unsafe Memory (ASI05), Unsafe Execution (ASI07), Rogue Agents (ASI10). Every agent framework has the same blind spot: no way to verify who the agent is, what it did, or whether it should be trusted.

AgentSign is an on-prem zero trust engine that gives every agent:

1. A cryptographic passport (signed, self-verifying, works offline)
2. A 7-stage pipeline (INTAKE -> VETTING -> TESTING -> DEV -> PROD -> ACTIVE)
3. A 13-point SDLC scanner mapped to OWASP Agentic Top 10 -- each check tagged with the ASI code it addresses
4. A trust score (0-100, earned through verified behavior)
5. MCP verification gate (agents must prove identity before accessing any tool server)
6. Instant revocation (trust -> 0, all access denied)

The scanner covers 7 of 10 OWASP Agentic risks out of the box. Framework-agnostic. 3 lines to integrate. Customer-owned keys. Nothing phones home.

We scanned 10 popular GitHub agents (GPT-Engineer 55K stars, BrowserUse 80K stars, FinRobot 6K stars). Every single one triggers multiple OWASP risk codes -- hardcoded tokens (ASI03), eval() (ASI07), no Docker isolation (ASI10), autonomous execution with no human oversight (ASI04).

Full interactive demo (runs against live server):
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

Site: https://agentsign.dev
GitHub: https://github.com/razashariff/agentsign
npm: npm install agentsign-openclaw
Patent pending: GB2604808.2

Happy to answer questions about the crypto, the scanner, or the trust model.

contact@agentsign.dev

---

## 3. REDDIT -- r/artificial

**Title:** We built a zero trust engine for AI agents after seeing 135K OpenClaw instances exposed to the internet

**Body:**

The agent security problem is getting worse. Fast.

- 135,000 OpenClaw instances exposed publicly (SecurityScorecard STRIKE team)
- 36% of ClawHub skills contain prompt injection (Snyk ToxicSkills study)
- CVE-2026-25253: Remote takeover of local OpenClaw instances, no user interaction needed
- OWASP published the Top 10 for Agentic Applications (2026) -- goal hijacking, tool misuse, identity abuse, rogue agents
- Every framework focuses on what agents CAN do. None verify WHO the agent is or WHAT it actually did.

We built AgentSign to fix this. It's an on-prem zero trust engine aligned to OWASP Agentic Top 10:

- Every agent gets a cryptographic passport (signed, self-verifying)
- 7-stage pipeline with gates at each stage
- 13-point security scanner mapped to OWASP ASI codes (catches secrets [ASI03], eval() [ASI07], prompt injection [ASI01], sandbox escapes [ASI10], framework misconfig [ASI04])
- Trust score 0-100, earned through verified behavior
- MCP verification gate -- THE GATE -- checks identity + trust + stage before any tool access
- Instant revocation: trust drops to 0, all access cut

We scanned 10 real GitHub agents (166K+ combined stars). None passed clean. Each triggers multiple OWASP risk codes. GPT-Engineer: ASI07 + ASI10 (LLM-generated bash, no isolation). FinRobot: ASI04 + ASI10 (use_docker=False, fully autonomous). Agentic DevOps: ASI03 + ASI07 (tokens in shell commands).

Full interactive demo -- runs every section against our live server:
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

https://agentsign.dev | contact@agentsign.dev

---

## 4. REDDIT -- r/MachineLearning

**Title:** [P] AgentSign: Cryptographic identity and trust scoring for AI agents (signed passports, 13-point SDLC scanner)

**Body:**

Open-source zero trust engine for AI agents. Scanner aligned to OWASP Top 10 for Agentic Applications (2026), covering 7 of 10 ASI risk categories.

**Architecture:**
- Agent passport: Cryptographically signed JSON, self-verifying offline
- Pipeline: 7-stage (INTAKE -> ACTIVE) with automated gate checks
- SDLC scanner: 13 checks mapped to OWASP ASI codes:
  - ASI01 (Goal Hijacking): prompt injection, input validation
  - ASI02 (Tool Misuse): dependency risk, network exposure, tool safety
  - ASI03 (Privilege Abuse): secret scan, permission review
  - ASI04 (Insufficient Oversight): metadata, framework misconfig
  - ASI05 (Insecure Memory): data handling
  - ASI07 (Unsafe Execution): code integrity, dangerous code
  - ASI10 (Rogue Agents): sandbox escape
- Trust score: 5-factor weighted (code attestation, execution verification rate, success rate, history depth, pipeline stage)
- MCP gate: Agent-to-tool-server verification (identity + trust + stage) -- addresses ASI06
- Co-signing: Dual signatures (local + CA) for external trust

**Key results from scanning 10 popular GitHub agents:**
- GPT-Engineer (55K stars): ASI07 + ASI10 -- LLM-generated bash on host, no isolation
- FinRobot (6K stars): ASI04 + ASI10 -- use_docker=False, human_input_mode=NEVER
- BrowserUse (80K stars): ASI05 + ASI02 -- sensitive data in memory, telemetry to external server
- Agentic DevOps (188 stars): ASI03 + ASI07 -- GitHub tokens in shell commands, subprocess shell=True

Framework-agnostic. Works with OpenClaw, NemoClaw, AutoGen, CrewAI, LangChain, Claude MCP.

Interactive Colab demo (10 sections, live server):
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

GitHub: https://github.com/razashariff/agentsign
Paper/patent: GB2604808.2 (UKIPO, filed March 2026)

contact@agentsign.dev

---

## 5. REDDIT -- r/cybersecurity

**Title:** Zero trust for AI agents: cryptographic passports, signed execution chains, instant revocation

**Body:**

If you've been following the OpenClaw situation:

- CVE-2026-25253 (CVSS 8.8): Remote takeover via WebSocket, no interaction needed
- 135,000 instances exposed to the public internet
- 1,467 malicious payloads found across ClawHub skills
- 36% of all skills contain prompt injection

The root cause: agents have no identity. No verification. No audit trail. No kill switch.

We built AgentSign -- an on-prem zero trust engine for AI agents, aligned to OWASP's Top 10 for Agentic Applications (2026). Think of it as what Okta/AD does for humans, but for autonomous agents.

**How it works:**
- Every agent gets a cryptographically signed passport (self-verifying, works offline)
- 7-stage pipeline with security gates (INTAKE -> VETTING -> TESTING -> DEV -> PROD -> ACTIVE)
- 13-point SDLC scanner mapped to OWASP Agentic Top 10 (ASI01-ASI10):
  - Secret scan → ASI03 (Identity & Privilege Abuse)
  - Dangerous code (eval, exec, os.system) → ASI07 (Unsafe Code Execution)
  - Prompt injection → ASI01 (Goal Hijacking)
  - Sandbox escape → ASI10 (Rogue Agents)
  - Framework misconfig → ASI04 (Insufficient Oversight)
  - Tool safety / dependency risk → ASI02 (Tool & Function Misuse)
  - Data handling → ASI05 (Insecure Agent Memory)
  - + 6 more checks covering input validation, network exposure, permissions
- Trust score (0-100) earned through verified execution history
- MCP verification gate: every agent-to-tool request verified (identity + trust + stage)
- Instant revocation: trust -> 0, all access denied

Covers 7 of 10 OWASP Agentic risks. Customer-owned keys. On-prem. Nothing phones home. Patent pending.

We scanned 10 real agents from GitHub (GPT-Engineer, BrowserUse, FinRobot, etc.). All flagged. The results are in our interactive demo:
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

https://agentsign.dev | contact@agentsign.dev

---

## 6. REDDIT -- r/ChatGPT

**Title:** AI agents have no identity. We built the fix.

**Body:**

Quick question: when an AI agent calls a tool, how do you know which agent made the call? How do you know it wasn't modified? How do you revoke it instantly if it goes rogue?

You can't. Not with any current framework.

After the OpenClaw ClawJacked vulnerability (135K exposed instances), the ClawHub malware problem (36% of skills contain prompt injection), and OWASP publishing the Agentic Top 10 risks for 2026 -- we built AgentSign.

It gives every AI agent:
- A cryptographic passport (like SSL certs, but for agents)
- A trust score earned through behavior (not assumed)
- A 13-point security scan aligned to OWASP Agentic Top 10 -- catches prompt injection (ASI01), privilege abuse (ASI03), unsafe execution (ASI07), rogue agent behavior (ASI10)
- An instant kill switch (revoke = trust drops to 0, all access cut)

Works with ChatGPT agents, Claude MCP, OpenClaw, NemoClaw, AutoGen, CrewAI -- any framework.

Try it yourself (runs in your browser, hits our live server):
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

https://agentsign.dev | contact@agentsign.dev

---

## 7. X/TWITTER -- Thread

**Tweet 1:**
AI agents have no identity. No signed audit trail. No kill switch.

135,000 OpenClaw instances exposed. 36% of ClawHub skills contain prompt injection. OWASP published the Agentic Top 10 -- ASI01 to ASI10.

We built the fix. AgentSign -- zero trust for AI agents. OWASP-aligned from day one.

agentsign.dev

**Tweet 2:**
How it works:

Every agent gets a cryptographic passport.

7-stage pipeline: INTAKE -> VETTING -> TESTING -> DEV -> PROD -> ACTIVE

13-point scanner mapped to OWASP Agentic Top 10:
ASI01 prompt injection
ASI03 privilege abuse
ASI07 unsafe execution
ASI10 rogue agents
...covers 7 of 10 risks.

Trust score 0-100. Earned, not assumed.

**Tweet 3:**
THE GATE.

Every agent-to-MCP tool request goes through verification:
- Is the agent revoked? -> DENY
- Is the pipeline stage allowed? -> DENY
- Is trust above threshold? -> DENY
- All checks pass? -> ALLOW

No exceptions. No backdoors.

**Tweet 4:**
We scanned 10 popular GitHub agents (166K+ combined stars).

Each triggers multiple OWASP Agentic risks:

- GPT-Engineer (55K): ASI07 + ASI10. LLM bash, no sandbox.
- FinRobot (6K): ASI04 + ASI10. No Docker, no human oversight.
- Agentic DevOps: ASI03 + ASI07. Tokens in shell commands.

None passed clean.

**Tweet 5:**
Works with ANY framework:
- OpenClaw / NemoClaw
- AutoGen / CrewAI
- LangChain / LangGraph
- Claude MCP

3 lines to integrate. On-prem. Customer-owned keys. Nothing phones home.

Patent pending (GB2604808.2).

**Tweet 6:**
Try the full pipeline yourself. 10 sections. Runs against our live server.

Register an agent. Walk the pipeline. Scan malicious code. Watch THE GATE deny and allow. Revoke and reinstate.

All in a Colab notebook:
[Colab link]

contact@agentsign.dev

---

## 8. LINKEDIN

**Title:** AI agents have no identity. Here's why that's a critical security gap -- and how we fix it.

**Body:**

The AI agent security problem is no longer theoretical.

In the past 60 days:
- 135,000 OpenClaw instances were found exposed to the public internet (SecurityScorecard)
- 36% of ClawHub skills contain prompt injection (Snyk ToxicSkills study)
- CVE-2026-25253: Remote takeover of local agent instances, CVSS 8.8
- OWASP published its Top 10 for Agentic Applications, ranking identity abuse at #3
- NVIDIA announced NemoClaw for enterprise-grade agent security at GTC 2026

The root cause across all of these: agents have no verifiable identity.

No cryptographic proof of who the agent is. No signed record of what it did. No instant way to revoke access when something goes wrong. OWASP now formally defines these risks in their Top 10 for Agentic Applications -- from Goal Hijacking (ASI01) to Rogue Agents (ASI10).

We built AgentSign to address this directly -- aligned to OWASP Agentic Top 10 security best practices.

AgentSign is an on-premise zero trust engine for AI agents. Every agent receives a cryptographic passport, advances through a 7-stage security pipeline, undergoes a 13-point SDLC inspection mapped to OWASP ASI codes, and earns a trust score through verified execution history. Tool access is gated -- agents must prove identity, pipeline stage, and trust score before any MCP server grants access.

OWASP Agentic Risk Coverage:
- ASI01 Goal Hijacking → prompt injection + input validation checks
- ASI02 Tool Misuse → dependency risk + network exposure + tool safety checks
- ASI03 Privilege Abuse → secret scan + permission review checks
- ASI04 Insufficient Oversight → framework misconfig + metadata checks
- ASI05 Insecure Memory → data handling checks
- ASI07 Unsafe Execution → code integrity + dangerous code checks
- ASI10 Rogue Agents → sandbox escape checks

Key design decisions:
- Customer-owned keys. No cloud dependency.
- Self-verifying passports work offline.
- Framework-agnostic: OpenClaw, NemoClaw, AutoGen, CrewAI, LangChain, Claude MCP.
- Instant revocation: trust drops to 0, all access denied.

We scanned 10 widely-used open-source agents (166,000+ combined GitHub stars). Every single one triggers multiple OWASP risk codes -- from hardcoded AWS keys (ASI03) to unsandboxed code execution (ASI07/ASI10) to prompt injection (ASI01).

The interactive Colab demo walks through all 10 sections against our live server:
https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

Built by AI security architects. OWASP Agentic Top 10 aligned. Patent pending (GB2604808.2, UKIPO).

https://agentsign.dev
contact@agentsign.dev

#AIAgents #ZeroTrust #CyberSecurity #AgenticAI #MCP #OWASP #OWASPAgenticTop10 #OpenClaw #NemoClaw

---

## 9. DEV.TO / MEDIUM -- Technical Article

**Title:** We Scanned 10 Popular AI Agents from GitHub. None Passed Clean.

**Subtitle:** Inside AgentSign's 13-point SDLC security scanner and why every AI agent needs a cryptographic passport.

**Body:**

### The Problem

AI agents are shipping without identity.

When an agent calls a tool, there's no cryptographic proof of which agent made the call. When an agent produces output, there's no signed record to detect tampering. When an agent goes rogue, there's no instant kill switch.

This isn't theoretical. In February 2026, SecurityScorecard's STRIKE team found 135,000 OpenClaw instances exposed to the public internet. Snyk's ToxicSkills study found 36% of ClawHub skills contain prompt injection. OWASP's 2026 Top 10 for Agentic Applications ranks agent identity abuse at #3.

### What We Built

AgentSign is an on-prem zero trust engine for AI agents. It's framework-agnostic -- works with OpenClaw, NemoClaw, AutoGen, CrewAI, LangChain, Claude MCP.

Every agent gets:
- **Cryptographic passport** (signed, self-verifying, works offline)
- **7-stage pipeline** (INTAKE -> VETTING -> TESTING -> DEV -> PROD -> ACTIVE)
- **13-point security scan** before pipeline entry
- **Trust score** (0-100) earned through verified execution history
- **MCP verification gate** (identity + trust + stage checked on every tool call)
- **Instant revocation** (trust -> 0, all access denied)

### The 13-Point Scanner -- OWASP Agentic Top 10 Aligned

We built a static analysis scanner that runs on every agent before it enters the pipeline. Every check is mapped to an OWASP Agentic Top 10 risk code:

| # | Check | Catches | OWASP | Severity |
|---|-------|---------|-------|----------|
| 1 | Code Integrity | Hash mismatch (tampering) | ASI07 | CRITICAL |
| 2 | Secret Scan | AWS keys, Stripe keys, GitHub PATs, passwords | ASI03 | CRITICAL |
| 3 | Dangerous Code | eval(), exec(), os.system(), pickle.loads() | ASI07 | HIGH |
| 4 | Permission Review | shell, admin, root, sudo, delete | ASI03 | MEDIUM |
| 5 | Metadata | Missing description, code, permissions | ASI04 | LOW |
| 6 | Prompt Injection | "ignore previous instructions", role override | ASI01 | HIGH |
| 7 | Dependency Risk | pickle, ctypes, telnetlib, smtplib imports | ASI02 | MEDIUM |
| 8 | Network Exposure | HTTP clients, data exfiltration patterns | ASI02 | HIGH |
| 9 | Sandbox Escape | Docker socket, setuid, pty.spawn, chroot | ASI10 | CRITICAL |
| 10 | Framework Misconfig | use_docker=False, human_input_mode=NEVER | ASI04 | HIGH |
| 11 | Tool Safety | Wildcard tool access, allow_all_tools=True | ASI02 | MEDIUM |
| 12 | Input Validation | User input to eval/exec/LLM unsanitized | ASI01 | MEDIUM |
| 13 | Data Handling | Passwords in memory, PII logged/transmitted | ASI05 | HIGH |

**OWASP coverage: 7 of 10 Agentic risks addressed** (ASI01, ASI02, ASI03, ASI04, ASI05, ASI07, ASI10).

Any CRITICAL finding = BLOCKED. Cannot enter pipeline.

### The Wild Agent Audit

We scanned 10 real agents from popular GitHub repositories. Combined: 166,000+ stars.

**GPT-Engineer (55,218 stars)** -- Executes LLM-generated bash scripts directly on the host. No Docker. No sandbox. The AI writes code and runs `bash entrypoint.sh` on your machine.

**FinRobot (6,337 stars)** -- AutoGen-based financial analysis. Runs with `use_docker=False` and `human_input_mode='NEVER'`. Fully autonomous code execution with no isolation and no human oversight. In a financial context.

**Agentic DevOps (188 stars)** -- Passes GitHub tokens directly into shell commands via f-strings. Writes private keys to arbitrary file paths. Runs user-provided scripts with `subprocess shell=True`.

**BrowserUse (79,810 stars)** -- Stores sensitive data dict in memory. Sends telemetry to external server. Full browser control with Playwright. 100-step autonomous execution loops.

**PandasGPT (67 stars)** -- User queries go to LLM, LLM generates Python, agent runs `exec()` on the result. Classic code injection pipeline.

None of these agents have cryptographic identity. None have signed execution chains. None have trust scoring. None have a kill switch. All of them trigger multiple OWASP Agentic risk codes.

### Try It

The full pipeline demo -- all 10 sections -- runs against our live server in a Colab notebook:

https://colab.research.google.com/github/razashariff/agentsign-openclaw/blob/main/agentsign_openclaw_demo.ipynb

You'll register an agent, walk the pipeline, scan clean and malicious code, watch THE GATE deny and allow, co-sign a passport, revoke and reinstate -- all live.

### Links

- Site: https://agentsign.dev
- GitHub: https://github.com/razashariff/agentsign
- npm: `npm install agentsign-openclaw`
- Patent: GB2604808.2 (UKIPO, Filed March 2026)
- Contact: contact@agentsign.dev

---

## 10. GITHUB README UPDATE (agentsign-openclaw)

See separate file: README_UPDATE.md

---

## 11. MCP DIRECTORY LISTINGS

### Smithery / PulseMCP / Glama Description:

**AgentSign -- Zero Trust Identity for AI Agents**

Cryptographic passports, signed execution chains, and trust-gated MCP access for any AI agent framework. 13-point SDLC security scanner aligned to OWASP Agentic Top 10 (2026). Instant revocation. On-prem, customer-owned keys.

Works with: OpenClaw, NemoClaw, AutoGen, CrewAI, LangChain, Claude MCP.

https://agentsign.dev | contact@agentsign.dev

---

## 12. HACKER NEWS -- Comment for OpenClaw/NemoClaw threads

For use when OpenClaw security or NemoClaw threads appear:

The root issue with OpenClaw's security problems isn't the specific CVEs -- it's that there's no agent identity layer. OWASP formalized this in their 2026 Agentic Top 10: Goal Hijacking (ASI01), Tool Misuse (ASI02), Identity Abuse (ASI03), Rogue Agents (ASI10). When skills execute, there's no cryptographic proof of which agent did what. When something goes wrong, there's no instant revocation that actually works.

We built AgentSign specifically for this. It's an on-prem zero trust engine: cryptographic passports, 7-stage pipeline, 13-point scanner mapped to OWASP ASI codes, trust scoring, and an MCP verification gate. Covers 7 of 10 OWASP Agentic risks. Framework-agnostic -- works with OpenClaw, NemoClaw, AutoGen, any framework.

Full interactive demo: [Colab link]

https://agentsign.dev

---

## POSTING ORDER (Priority)

1. Hacker News (Show HN) -- developer audience, high signal
2. Product Hunt -- launch platform
3. LinkedIn -- enterprise/professional audience
4. Reddit r/cybersecurity -- security community
5. Reddit r/artificial -- AI community
6. Reddit r/MachineLearning -- technical ML community
7. X/Twitter thread -- real-time reach
8. Reddit r/ChatGPT -- mainstream AI audience
9. Dev.to article -- technical deep dive
10. MCP directories -- tool discovery
11. HN comments on OpenClaw/NemoClaw threads -- contextual

---

## KEY STATS TO REFERENCE

- 135,000 OpenClaw instances exposed (SecurityScorecard STRIKE)
- 36% of ClawHub skills contain prompt injection (Snyk ToxicSkills)
- 1,467 malicious payloads across 3,984 skills scanned
- CVE-2026-25253: CVSS 8.8, remote takeover, no interaction
- 512 vulnerabilities in OpenClaw audit, 8 critical
- OWASP Agentic Top 10 (2026): ASI01-ASI10 -- formal risk taxonomy for AI agents
- AgentSign scanner covers 7 of 10 OWASP Agentic risks (ASI01, ASI02, ASI03, ASI04, ASI05, ASI07, ASI10)
- 48% of cybersecurity pros say agentic AI is #1 attack vector for 2026
- Gartner: 1,000+ legal claims for AI agent harm by end of 2026
- 166,000+ combined GitHub stars across 10 wild agents scanned
- NemoClaw: NVIDIA's enterprise agent platform, GTC March 2026

---

## TIMING NOTE

NemoClaw launches at GTC mid-March 2026. Post the HN Show HN and Product Hunt BEFORE GTC for maximum visibility. Then use NemoClaw threads to introduce AgentSign as the trust layer that works with NemoClaw.

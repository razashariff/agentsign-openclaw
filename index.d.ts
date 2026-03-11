export interface MiddlewareOptions {
  serverUrl: string;
  agentName?: string;
  category?: string;
  minTrust?: number;
  blockedTools?: string[];
  autoRegister?: boolean;
  logExecutions?: boolean;
  apiKey?: string;
}

export interface GateResult {
  decision: 'ALLOW' | 'DENY';
  tool: string;
  reason?: string;
  trustScore?: number;
  agentId?: string;
}

export interface Execution {
  executionId: string;
  agentId: string;
  tool: string;
  inputHash: string;
  outputHash: string;
  executionHash: string;
  parentId: string | null;
  timestamp: number;
  duration: number;
  verified: boolean;
}

export interface ChainVerification {
  valid: boolean;
  length?: number;
  broken?: number;
}

export interface SkillPlugin {
  name: string;
  description: string;
  version: string;
  hooks: {
    beforeToolCall: (ctx: any) => Promise<any>;
    afterToolCall: (ctx: any) => Promise<any>;
  };
  actions: {
    getPassport: () => Promise<any>;
    getChain: () => Promise<Execution[]>;
    getTrustScore: () => Promise<number | null>;
    verifyChain: () => Promise<ChainVerification>;
  };
}

declare class AgentSignMiddleware {
  constructor(opts: MiddlewareOptions);
  init(): Promise<this>;
  wrap<T extends (...args: any[]) => any>(toolName: string, toolFn: T): T;
  wrapAll<T extends Record<string, Function>>(tools: T): T;
  asSkill(): SkillPlugin;
  getPassport(): any;
  getChain(): Execution[];
  getAgentId(): string | null;
  getTrustScore(): number | null;
  verifyChain(): ChainVerification;
  verifyOutput(output: any, execution: Execution): 'PASS' | 'TAMPERED';
}

export declare class AgentSignError extends Error {
  code: string;
  details?: any;
  constructor(message: string, code: string, details?: any);
}

export default AgentSignMiddleware;

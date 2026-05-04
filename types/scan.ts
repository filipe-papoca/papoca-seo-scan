// types/scan.ts

export type CheckStatus = "pass" | "warn" | "fail" | "error";

export interface CheckResult {
  id: string;
  category: CheckCategory;
  name: string;
  status: CheckStatus;
  weight: number; // 1-10, para cálculo de score
  message: string; // Explicação curta em PT-BR para o usuário final
  technical?: string; // Detalhe técnico para debug/copy avançada
  evidence?: Record<string, unknown>; // Dados crus do que foi encontrado
}

export type CheckCategory =
  | "discoverability"
  | "structure"
  | "ai_signals"
  | "performance";

export interface ScanResult {
  url: string;
  scannedAt: string; // ISO timestamp
  durationMs: number;
  score: number; // 0-100
  scoreLevel: "critical" | "low" | "medium" | "good" | "excellent";
  checks: CheckResult[];
  topActions: string[]; // 3 ações prioritárias geradas a partir dos checks
  summary: {
    pass: number;
    warn: number;
    fail: number;
    error: number;
  };
}

export interface ScanContext {
  url: string;
  origin: string; // protocol://host
  hostname: string;
  html: string;
  headers: Record<string, string>;
  responseTimeMs: number;
  status: number;
}

export type CheckFn = (ctx: ScanContext) => Promise<CheckResult>;

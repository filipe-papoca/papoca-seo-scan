// lib/checks/llmsTxt.ts
// llms.txt é proposta de padrão (https://llmstxt.org) para guiar LLMs.
// Adoção é nascente — ter já é diferencial. Não ter ainda não é fail crítico.

import type { CheckFn, CheckResult } from "../../types/scan";
import { fetchSafe } from "../utils/fetcher";

export const llmsTxtCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const url = `${ctx.origin}/llms.txt`;
  const res = await fetchSafe(url, { timeoutMs: 5000 });

  if (!res.ok || res.status !== 200) {
    return {
      id: "llms-txt",
      category: "ai_signals",
      name: "llms.txt",
      status: "warn",
      weight: 4,
      message: "Você não tem llms.txt. Ainda é padrão novo — adoção é baixa. Implementar agora coloca você à frente da maioria, e custa pouco: um arquivo simples na raiz, listando o que você quer que IA priorize.",
      technical: `HTTP ${res.status} em ${url}`,
      evidence: { url, status: res.status },
    };
  }

  // Validação mínima: tem cabeçalho H1 (formato exige)
  const hasH1 = /^#\s+.+/m.test(res.body);
  if (!hasH1 || res.body.trim().length < 30) {
    return {
      id: "llms-txt",
      category: "ai_signals",
      name: "llms.txt",
      status: "warn",
      weight: 4,
      message: "llms.txt existe, mas o formato está fora do padrão. Para funcionar, precisa ter cabeçalho H1 e estrutura mínima — confira em llmstxt.org.",
      technical: `Conteúdo com ${res.body.length} caracteres, hasH1=${hasH1}`,
    };
  }

  return {
    id: "llms-txt",
    category: "ai_signals",
    name: "llms.txt",
    status: "pass",
    weight: 4,
    message: "llms.txt configurado. Você está adotando um padrão que ainda é minoria — sinal de maturidade técnica.",
    technical: `${res.body.length} caracteres, formato válido.`,
  };
};

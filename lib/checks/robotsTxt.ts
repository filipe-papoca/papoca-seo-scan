// lib/checks/robotsTxt.ts
// Verifica robots.txt: presença, validade, e regras específicas para bots de IA.
// Bots monitorados: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bytespider, Amazonbot.

import type { CheckFn, CheckResult } from "../../types/scan";
import { fetchSafe } from "../utils/fetcher";

const AI_BOTS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bytespider", "Amazonbot"];

interface RobotsRule {
  userAgents: string[];
  disallows: string[];
  allows: string[];
}

function parseRobotsTxt(content: string): RobotsRule[] {
  const rules: RobotsRule[] = [];
  let current: RobotsRule | null = null;

  const lines = content.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const directive = line.slice(0, colonIdx).trim().toLowerCase();
    const value = line.slice(colonIdx + 1).trim();

    if (directive === "user-agent") {
      if (!current || current.disallows.length || current.allows.length) {
        current = { userAgents: [], disallows: [], allows: [] };
        rules.push(current);
      }
      current.userAgents.push(value);
    } else if (current) {
      if (directive === "disallow") current.disallows.push(value);
      else if (directive === "allow") current.allows.push(value);
    }
  }
  return rules;
}

function botIsAllowed(bot: string, rules: RobotsRule[]): { allowed: boolean; matched: string | null } {
  // Procura regra específica para o bot
  for (const rule of rules) {
    if (rule.userAgents.some((ua) => ua.toLowerCase() === bot.toLowerCase())) {
      const fullDisallow = rule.disallows.includes("/");
      return { allowed: !fullDisallow, matched: bot };
    }
  }
  // Sem regra específica → cai no wildcard
  for (const rule of rules) {
    if (rule.userAgents.includes("*")) {
      const fullDisallow = rule.disallows.includes("/");
      return { allowed: !fullDisallow, matched: "*" };
    }
  }
  // Sem nenhuma regra → assume permitido (default robots.txt)
  return { allowed: true, matched: null };
}

export const robotsTxtCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const robotsUrl = `${ctx.origin}/robots.txt`;
  const res = await fetchSafe(robotsUrl, { timeoutMs: 5000 });

  if (!res.ok || res.status !== 200) {
    return {
      id: "robots-txt",
      category: "discoverability",
      name: "robots.txt",
      status: "fail",
      weight: 8,
      message: "Sem robots.txt acessível, os robôs de IA decidem sozinhos o que ler do seu site — e quando travam, simplesmente ignoram. Esse arquivo é a porta de entrada para ChatGPT, Claude e Gemini.",
      technical: `HTTP ${res.status} ao buscar ${robotsUrl}`,
      evidence: { url: robotsUrl, status: res.status },
    };
  }

  const rules = parseRobotsTxt(res.body);
  const botStatus: Record<string, { allowed: boolean; matched: string | null }> = {};
  for (const bot of AI_BOTS) {
    botStatus[bot] = botIsAllowed(bot, rules);
  }

  const blocked = AI_BOTS.filter((b) => !botStatus[b].allowed);
  const explicitlyAllowed = AI_BOTS.filter((b) => botStatus[b].matched && botStatus[b].matched !== "*" && botStatus[b].allowed);

  if (blocked.length === AI_BOTS.length) {
    return {
      id: "robots-txt",
      category: "discoverability",
      name: "robots.txt",
      status: "fail",
      weight: 8,
      message: "Seu robots.txt bloqueia explicitamente os robôs de IA. Para essas plataformas, seu site não existe — qualquer pergunta sobre sua marca no ChatGPT é respondida sem você.",
      technical: `Bloqueados: ${blocked.join(", ")}`,
      evidence: { botStatus, totalRules: rules.length },
    };
  }

  if (blocked.length > 0) {
    return {
      id: "robots-txt",
      category: "discoverability",
      name: "robots.txt",
      status: "warn",
      weight: 8,
      message: `Você bloqueia ${blocked.join(", ")}. Se foi decisão estratégica (proteção de conteúdo, por exemplo), tudo bem — só registre que você está ausente nessas IAs. Se foi padrão herdado, vale revisar.`,
      technical: `Bloqueados: ${blocked.join(", ")}. Permitidos: ${AI_BOTS.filter((b) => botStatus[b].allowed).join(", ")}`,
      evidence: { botStatus },
    };
  }

  if (explicitlyAllowed.length === 0) {
    return {
      id: "robots-txt",
      category: "discoverability",
      name: "robots.txt",
      status: "warn",
      weight: 8,
      message: "Seu robots.txt funciona, mas trata todos os robôs igual. Declarar regras específicas para GPTBot, ClaudeBot e PerplexityBot é controle fino. Vale meia hora de implementação.",
      technical: "Apenas regra wildcard (*) aplica.",
      evidence: { botStatus },
    };
  }

  return {
    id: "robots-txt",
    category: "discoverability",
    name: "robots.txt",
    status: "pass",
    weight: 8,
    message: `Configurado corretamente: você declara regras específicas para ${explicitlyAllowed.length} dos principais robôs de IA. Boa fundação.`,
    technical: `Permitidos: ${AI_BOTS.filter((b) => botStatus[b].allowed).join(", ")}`,
    evidence: { botStatus },
  };
};

// lib/orchestrator.ts
// Coordena: monta contexto, dispara checks em paralelo, calcula score.

import type { CheckFn, CheckResult, ScanContext, ScanResult } from "../types/scan";
import { fetchSafe } from "./utils/fetcher";
import { robotsTxtCheck } from "./checks/robotsTxt";
import { llmsTxtCheck } from "./checks/llmsTxt";
import { sitemapCheck } from "./checks/sitemap";
import { structuredDataCheck } from "./checks/structuredData";
import {
  metaTagsCheck,
  openGraphCheck,
  httpsCanonicalCheck,
  responseTimeCheck,
  htmlSemanticCheck,
} from "./checks/index";

const ALL_CHECKS: CheckFn[] = [
  robotsTxtCheck,
  llmsTxtCheck,
  sitemapCheck,
  structuredDataCheck,
  metaTagsCheck,
  openGraphCheck,
  httpsCanonicalCheck,
  responseTimeCheck,
  htmlSemanticCheck,
];

// Pesos recalibrados (v0.3, baseado em calibração com 6 sites):
// - warn = 0.3 (atenção não é meio-caminho, é problema não resolvido)
// - fail = 0 + penalty: cada fail em check de peso >= 7 reduz 10pts do score final
// - Cap especial: se robots.txt bloqueia TODOS os bots de IA, score teto = 50.
//   Lógica: bloqueio total invalida tudo o mais — IA não consegue ler o site.
// - Faixas: critical <25, low 25-49, medium 50-64, good 65-79, excellent 80+
function statusValue(status: CheckResult["status"]): number | null {
  if (status === "pass") return 1;
  if (status === "warn") return 0.3;
  if (status === "fail") return 0;
  return null; // error: ignorado
}

const CRITICAL_FAIL_PENALTY = 10; // pontos descontados por fail em check de peso >= 7
const CRITICAL_WEIGHT_THRESHOLD = 7;
const TOTAL_BOT_BLOCK_CAP = 50; // teto quando robots.txt bloqueia todos os bots de IA

function isTotalBotBlock(checks: CheckResult[]): boolean {
  // Detecta cenário em que o check de robots.txt sinalizou bloqueio total.
  // O check robotsTxt usa esse texto exato para o fail crítico de bloqueio total.
  const robots = checks.find((c) => c.id === "robots-txt");
  if (!robots || robots.status !== "fail") return false;
  return robots.message.toLowerCase().includes("bloqueando todos os bots");
}

function calcScore(checks: CheckResult[]): { score: number; level: ScanResult["scoreLevel"] } {
  let weighted = 0;
  let totalWeight = 0;
  let criticalFails = 0;

  for (const c of checks) {
    const v = statusValue(c.status);
    if (v === null) continue;
    weighted += v * c.weight;
    totalWeight += c.weight;
    if (c.status === "fail" && c.weight >= CRITICAL_WEIGHT_THRESHOLD) {
      criticalFails++;
    }
  }

  const baseScore = totalWeight === 0 ? 0 : (weighted / totalWeight) * 100;
  const penalty = criticalFails * CRITICAL_FAIL_PENALTY;
  // Mínimo 5 (não 0) — score zero parece scan quebrado, prejudica credibilidade.
  // Site catastrófico continua sinalizado como tal, mas com nota mensurável.
  let score = Math.max(5, Math.round(baseScore - penalty));

  // Cap especial: bloqueio total de bots de IA invalida o resto
  if (isTotalBotBlock(checks)) {
    score = Math.min(score, TOTAL_BOT_BLOCK_CAP);
  }

  let level: ScanResult["scoreLevel"];
  if (score < 25) level = "critical";
  else if (score < 50) level = "low";
  else if (score < 65) level = "medium";
  else if (score < 80) level = "good";
  else level = "excellent";

  return { score, level };
}

function buildTopActions(checks: CheckResult[]): string[] {
  // Top 3 problemas: ordem = fail antes de warn, weight desc
  const problems = checks
    .filter((c) => c.status === "fail" || c.status === "warn")
    .sort((a, b) => {
      const order = { fail: 0, warn: 1, pass: 2, error: 3 };
      const diff = order[a.status] - order[b.status];
      if (diff !== 0) return diff;
      return b.weight - a.weight;
    })
    .slice(0, 3);

  return problems.map((p) => p.message);
}

export async function runScan(targetUrl: string): Promise<ScanResult> {
  const start = Date.now();
  const urlObj = new URL(targetUrl);

  // Fetch principal — usado por vários checks via ctx.html
  const mainRes = await fetchSafe(targetUrl, { timeoutMs: 10_000 });

  if (!mainRes.ok && mainRes.status === 0) {
    // Erro de rede / timeout: retorna scan degradado
    // Score mínimo 5 (não 0) — coerente com regra geral: zero parece bug, não diagnóstico.
    return {
      url: targetUrl,
      scannedAt: new Date().toISOString(),
      durationMs: Date.now() - start,
      score: 5,
      scoreLevel: "critical",
      checks: [
        {
          id: "fetch-error",
          category: "performance",
          name: "Acesso ao site",
          status: "fail",
          weight: 10,
          message: `Não conseguimos acessar seu site: ${mainRes.error || "timeout"}. O servidor pode estar fora do ar, atrás de WAF/Cloudflare bloqueando bots, ou demorando demais para responder.`,
        },
      ],
      topActions: ["Verifique se o site responde a requisições HTTP automatizadas (ex: curl). Bloqueios por WAF, Cloudflare anti-bot ou firewall agressivo podem impedir ferramentas legítimas."],
      summary: { pass: 0, warn: 0, fail: 1, error: 0 },
    };
  }

  const ctx: ScanContext = {
    url: mainRes.finalUrl || targetUrl,
    origin: `${urlObj.protocol}//${urlObj.host}`,
    hostname: urlObj.hostname,
    html: mainRes.body,
    headers: mainRes.headers,
    responseTimeMs: mainRes.responseTimeMs,
    status: mainRes.status,
  };

  // Roda em paralelo, capturando erros individuais
  const results = await Promise.all(
    ALL_CHECKS.map(async (check): Promise<CheckResult> => {
      try {
        return await check(ctx);
      } catch (err) {
        return {
          id: "unknown-error",
          category: "structure",
          name: "Check com erro",
          status: "error",
          weight: 0,
          message: "Esse check falhou inesperadamente.",
          technical: err instanceof Error ? err.message : String(err),
        };
      }
    })
  );

  const { score, level } = calcScore(results);
  const summary = {
    pass: results.filter((r) => r.status === "pass").length,
    warn: results.filter((r) => r.status === "warn").length,
    fail: results.filter((r) => r.status === "fail").length,
    error: results.filter((r) => r.status === "error").length,
  };

  return {
    url: targetUrl,
    scannedAt: new Date().toISOString(),
    durationMs: Date.now() - start,
    score,
    scoreLevel: level,
    checks: results,
    topActions: buildTopActions(results),
    summary,
  };
}

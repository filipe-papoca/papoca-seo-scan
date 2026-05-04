// scripts/scan-batch.ts
// Roda o scan em múltiplas URLs e exporta CSV com score + status de cada check.
//
// Uso:
//   echo "https://site1.com\nhttps://site2.com" > urls.txt
//   npx tsx scripts/scan-batch.ts urls.txt
//
// Output: stdout com tabela formatada + arquivo CSV em scan-results-YYYYMMDD.csv

import { readFileSync, writeFileSync } from "node:fs";
import { runScan } from "../lib/orchestrator";
import { validateUrlFormat, checkSsrf } from "../lib/utils/ssrf";

interface BatchResult {
  url: string;
  score: number;
  level: string;
  pass: number;
  warn: number;
  fail: number;
  durationMs: number;
  error?: string;
  // Status de cada check individual
  checks: Record<string, string>;
}

async function scanOne(rawUrl: string): Promise<BatchResult> {
  const fmt = validateUrlFormat(rawUrl);
  if (!fmt.valid || !fmt.url) {
    return {
      url: rawUrl, score: 0, level: "error",
      pass: 0, warn: 0, fail: 0, durationMs: 0,
      error: fmt.reason,
      checks: {},
    };
  }

  const ssrf = await checkSsrf(fmt.url.hostname);
  if (!ssrf.safe) {
    return {
      url: rawUrl, score: 0, level: "error",
      pass: 0, warn: 0, fail: 0, durationMs: 0,
      error: `SSRF: ${ssrf.reason}`,
      checks: {},
    };
  }

  try {
    const result = await runScan(fmt.url.toString());
    const checks: Record<string, string> = {};
    for (const c of result.checks) {
      checks[c.id] = c.status;
    }
    return {
      url: result.url,
      score: result.score,
      level: result.scoreLevel,
      pass: result.summary.pass,
      warn: result.summary.warn,
      fail: result.summary.fail,
      durationMs: result.durationMs,
      checks,
    };
  } catch (err) {
    return {
      url: rawUrl, score: 0, level: "error",
      pass: 0, warn: 0, fail: 0, durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
      checks: {},
    };
  }
}

function distribution(scores: number[]): string {
  if (scores.length === 0) return "(sem dados)";
  const buckets = { "0-24": 0, "25-49": 0, "50-64": 0, "65-79": 0, "80-100": 0 };
  for (const s of scores) {
    if (s < 25) buckets["0-24"]++;
    else if (s < 50) buckets["25-49"]++;
    else if (s < 65) buckets["50-64"]++;
    else if (s < 80) buckets["65-79"]++;
    else buckets["80-100"]++;
  }
  const sorted = [...scores].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const lines = [
    `  Total: ${scores.length} sites`,
    `  Min: ${min}  Mediana: ${median}  Média: ${avg}  Max: ${max}`,
    "",
    "  Distribuição por faixa:",
    `    Crítico  (0–24):  ${buckets["0-24"]}`,
    `    Baixo    (25–49): ${buckets["25-49"]}`,
    `    Médio    (50–64): ${buckets["50-64"]}`,
    `    Bom      (65–79): ${buckets["65-79"]}`,
    `    Excelente(80–):   ${buckets["80-100"]}`,
  ];
  return lines.join("\n");
}

function csvEscape(v: string | number): string {
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function main() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error("Uso: tsx scripts/scan-batch.ts <urls.txt>");
    console.error("Cada linha do arquivo = uma URL.");
    process.exit(1);
  }

  const content = readFileSync(inputFile, "utf-8");
  const urls = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  if (urls.length === 0) {
    console.error("Nenhuma URL no arquivo.");
    process.exit(1);
  }

  console.log(`Escaneando ${urls.length} sites em paralelo (3 por vez)...\n`);
  const results: BatchResult[] = [];

  // Limita concorrência a 3 (evita estourar conexões)
  const CONCURRENCY = 3;
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(scanOne));
    results.push(...batchResults);
    for (const r of batchResults) {
      const status = r.error ? `ERROR (${r.error})` : `${r.score}/100 (${r.level})`;
      console.log(`  ${r.url.padEnd(50)} ${status}`);
    }
  }

  // Sumário
  const valid = results.filter((r) => !r.error);
  console.log("\n═══ DISTRIBUIÇÃO ═══");
  console.log(distribution(valid.map((r) => r.score)));

  // CSV
  const allCheckIds = new Set<string>();
  for (const r of results) {
    Object.keys(r.checks).forEach((k) => allCheckIds.add(k));
  }
  const checkCols = [...allCheckIds].sort();

  const header = ["url", "score", "level", "pass", "warn", "fail", "duration_ms", "error", ...checkCols];
  const rows = results.map((r) => [
    r.url, r.score, r.level, r.pass, r.warn, r.fail, r.durationMs, r.error || "",
    ...checkCols.map((id) => r.checks[id] || ""),
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const outFile = `scan-results-${date}.csv`;
  writeFileSync(outFile, csv);

  console.log(`\nCSV salvo em: ${outFile}`);
  console.log("Abra no Excel/Sheets para análise visual.");
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});

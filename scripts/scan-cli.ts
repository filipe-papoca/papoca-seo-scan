// scripts/scan-cli.ts
// Uso: npx tsx scripts/scan-cli.ts https://exemplo.com.br
// Útil para calibrar o algoritmo de score sem precisar abrir o navegador.

import { runScan } from "../lib/orchestrator";
import { validateUrlFormat, checkSsrf } from "../lib/utils/ssrf";

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error("Uso: tsx scripts/scan-cli.ts <url>");
    process.exit(1);
  }

  const fmt = validateUrlFormat(input);
  if (!fmt.valid || !fmt.url) {
    console.error(`URL inválida: ${fmt.reason}`);
    process.exit(1);
  }

  const ssrf = await checkSsrf(fmt.url.hostname);
  if (!ssrf.safe) {
    console.error(`SSRF bloqueado: ${ssrf.reason}`);
    process.exit(1);
  }

  console.log(`Escaneando ${fmt.url.toString()}...\n`);
  const result = await runScan(fmt.url.toString());

  console.log(`Score: ${result.score}/100 (${result.scoreLevel})`);
  console.log(`Duração: ${(result.durationMs / 1000).toFixed(1)}s\n`);
  console.log("Checks:");
  for (const c of result.checks) {
    const icon = { pass: "✓", warn: "!", fail: "✗", error: "?" }[c.status];
    console.log(`  ${icon} [${c.status.toUpperCase()}] ${c.name}: ${c.message}`);
  }
  console.log("\nTop ações:");
  result.topActions.forEach((a, i) => console.log(`  ${i + 1}. ${a}`));
}

main().catch((err) => {
  console.error("Erro:", err);
  process.exit(1);
});

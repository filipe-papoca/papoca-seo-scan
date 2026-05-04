// app/api/scan/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateUrlFormat, checkSsrf } from "../../../lib/utils/ssrf";
import { checkRateLimit, getClientIp } from "../../../lib/utils/rateLimit";
import { runScan } from "../../../lib/orchestrator";

export const runtime = "nodejs"; // precisamos de dns.resolve, não disponível em edge
export const maxDuration = 30; // Vercel: timeout de 30s pra função

const bodySchema = z.object({
  url: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
  // 1. Parse + validação de schema
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "URL é obrigatória." }, { status: 400 });
  }

  // 2. Validação de formato
  const formatCheck = validateUrlFormat(parsed.data.url);
  if (!formatCheck.valid || !formatCheck.url) {
    return NextResponse.json({ error: formatCheck.reason || "URL inválida." }, { status: 400 });
  }
  const url = formatCheck.url;

  // 3. Rate limit por IP
  const ip = getClientIp(req.headers);
  const rl = await checkRateLimit(ip);
  if (!rl.success) {
    const resetSec = Math.max(0, Math.ceil((rl.reset - Date.now()) / 1000));
    return NextResponse.json(
      { error: `Limite de scans atingido. Tente novamente em ${resetSec}s.` },
      { status: 429, headers: { "Retry-After": String(resetSec) } }
    );
  }

  // 4. SSRF — bloqueia IPs privados antes de fetch
  const ssrf = await checkSsrf(url.hostname);
  if (!ssrf.safe) {
    return NextResponse.json({ error: ssrf.reason || "URL não permitida." }, { status: 400 });
  }

  // 5. Scan
  try {
    const result = await runScan(url.toString());
    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "no-store",
        "X-RateLimit-Remaining": String(rl.remaining),
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erro no scan.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

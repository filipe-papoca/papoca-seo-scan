// lib/utils/rateLimit.ts
// Rate limit por IP. Sem isso, ferramenta pública vira proxy de DDoS.
// Free tier do Upstash dá conta dos primeiros milhares de scans/mês.

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Variáveis de ambiente necessárias no Vercel:
// UPSTASH_REDIS_REST_URL
// UPSTASH_REDIS_REST_TOKEN

let _ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (_ratelimit) return _ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    // Em dev, sem Redis configurado, libera tudo. Loga aviso.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[ratelimit] Upstash não configurado — rate limit desabilitado em dev.");
      return null;
    }
    throw new Error("Upstash Redis não configurado em produção.");
  }
  _ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(10, "1 h"), // 10 scans/hora por IP
    analytics: true,
    prefix: "papoca-scan",
  });
  return _ratelimit;
}

export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  remaining: number;
  reset: number;
}> {
  const rl = getRatelimit();
  if (!rl) return { success: true, remaining: 999, reset: 0 };
  const { success, remaining, reset } = await rl.limit(identifier);
  return { success, remaining, reset };
}

export function getClientIp(headers: Headers): string {
  // Vercel popula x-forwarded-for. Pega o primeiro IP da lista.
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}

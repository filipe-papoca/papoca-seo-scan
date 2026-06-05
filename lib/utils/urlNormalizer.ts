// lib/utils/urlNormalizer.ts
// Normalização determinística de URL para geração de hash consistente.
// Decisões (spec v0.2):
//   - Remove www. (www.exemplo.com = exemplo.com)
//   - Remove parâmetros de tracking (utm_*, fbclid, gclid, etc.)
//   - Lowercase do hostname
//   - Remove trailing slash (exceto root "/")
//   - Força https:

import { createHash } from "crypto";

// Parâmetros de tracking/analytics removidos antes do hash
const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "msclkid",
  "mc_cid",
  "mc_eid",
  "ref",
  "_ga",
];

/**
 * Normaliza uma URL de forma determinística para uso como chave de cache/banco.
 * Retorna a URL normalizada como string.
 */
export function normalizeUrl(rawUrl: string): string {
  const u = new URL(rawUrl);

  // Lowercase do hostname
  u.hostname = u.hostname.toLowerCase();

  // Remove www.
  if (u.hostname.startsWith("www.")) {
    u.hostname = u.hostname.slice(4);
  }

  // Remove parâmetros de tracking
  for (const p of TRACKING_PARAMS) {
    u.searchParams.delete(p);
  }

  // Remove trailing slash do pathname (exceto root)
  if (u.pathname.length > 1 && u.pathname.endsWith("/")) {
    u.pathname = u.pathname.slice(0, -1);
  }

  // Força https
  u.protocol = "https:";

  return u.toString();
}

/**
 * Retorna o SHA-256 hex (64 chars) de uma URL normalizada.
 * Usar como chave de lookup no banco e no Redis.
 */
export function hashUrl(normalizedUrl: string): string {
  return createHash("sha256").update(normalizedUrl).digest("hex");
}

/**
 * Retorna o SHA-256 hex (64 chars) de um IP.
 * Armazenado no lugar do IP raw — não reversível.
 */
export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

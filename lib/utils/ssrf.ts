// lib/utils/ssrf.ts
// Proteção contra Server-Side Request Forgery.
// Sem isso, alguém pode usar a ferramenta pra escanear serviços internos
// ou metadata da AWS/GCP. Crítico em qualquer ferramenta pública de fetch.

import { promises as dns } from "node:dns";
import { isIP } from "node:net";

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "broadcasthost",
  "ip6-localhost",
  "ip6-loopback",
]);

// Ranges privados / reservados em IPv4 (CIDR notation)
const PRIVATE_IPV4_RANGES = [
  { base: "10.0.0.0", mask: 8 },
  { base: "172.16.0.0", mask: 12 },
  { base: "192.168.0.0", mask: 16 },
  { base: "127.0.0.0", mask: 8 }, // loopback
  { base: "169.254.0.0", mask: 16 }, // link-local + AWS metadata
  { base: "0.0.0.0", mask: 8 },
  { base: "100.64.0.0", mask: 10 }, // CGNAT
  { base: "192.0.0.0", mask: 24 },
  { base: "192.0.2.0", mask: 24 }, // TEST-NET
  { base: "198.18.0.0", mask: 15 },
  { base: "198.51.100.0", mask: 24 },
  { base: "203.0.113.0", mask: 24 },
  { base: "224.0.0.0", mask: 4 }, // multicast
  { base: "240.0.0.0", mask: 4 }, // reserved
];

function ipv4ToInt(ip: string): number {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

function isInRange(ip: string, base: string, mask: number): boolean {
  if (mask === 0) return true;
  const ipInt = ipv4ToInt(ip);
  const baseInt = ipv4ToInt(base);
  const maskInt = (~0 << (32 - mask)) >>> 0;
  return (ipInt & maskInt) === (baseInt & maskInt);
}

function isPrivateIPv4(ip: string): boolean {
  return PRIVATE_IPV4_RANGES.some(({ base, mask }) => isInRange(ip, base, mask));
}

function isPrivateIPv6(ip: string): boolean {
  // Bloqueio simples mas eficaz pra IPv6
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // ULA
  if (lower.startsWith("fe80")) return true; // link-local
  if (lower.startsWith("::ffff:")) {
    // IPv4-mapped — extrai e valida
    const v4 = lower.replace("::ffff:", "");
    if (isIP(v4) === 4) return isPrivateIPv4(v4);
  }
  return false;
}

export interface SsrfCheckResult {
  safe: boolean;
  reason?: string;
  resolvedIps?: string[];
}

export async function checkSsrf(hostname: string): Promise<SsrfCheckResult> {
  const lower = hostname.toLowerCase().trim();

  if (BLOCKED_HOSTNAMES.has(lower)) {
    return { safe: false, reason: "Hostname bloqueado." };
  }

  // Se é IP literal, valida direto
  const ipVersion = isIP(lower);
  if (ipVersion === 4) {
    if (isPrivateIPv4(lower)) {
      return { safe: false, reason: "IP privado/reservado." };
    }
    return { safe: true, resolvedIps: [lower] };
  }
  if (ipVersion === 6) {
    if (isPrivateIPv6(lower)) {
      return { safe: false, reason: "IPv6 privado/reservado." };
    }
    return { safe: true, resolvedIps: [lower] };
  }

  // Resolve DNS — precisa validar TODOS os IPs retornados
  // Usamos resolve4/6 primeiro (mais explícito), e dns.lookup como fallback.
  // Razão: resolve4/6 só retornam registros A/AAAA literais. Sites que usam
  // CNAME na raiz (apex) ou DNS proxies (Cloudflare, Vercel) podem falhar
  // com ENODATA. dns.lookup segue CNAME chains via resolver do sistema.
  let addresses: string[] = [];
  try {
    const [v4, v6] = await Promise.all([
      dns.resolve4(lower).catch(() => [] as string[]),
      dns.resolve6(lower).catch(() => [] as string[]),
    ]);
    addresses = [...v4, ...v6];
  } catch {
    // ignora — vamos tentar lookup abaixo
  }

  // Fallback: se resolve4/6 não retornaram nada, tenta dns.lookup (segue CNAME)
  if (addresses.length === 0) {
    try {
      const records = await dns.lookup(lower, { all: true });
      addresses = records.map((r) => r.address);
    } catch {
      return { safe: false, reason: "Não foi possível resolver o domínio." };
    }
  }

  if (addresses.length === 0) {
    return { safe: false, reason: "Domínio sem registros DNS." };
  }

  for (const ip of addresses) {
    const v = isIP(ip);
    if (v === 4 && isPrivateIPv4(ip)) {
      return { safe: false, reason: `Domínio resolve para IP privado (${ip}).` };
    }
    if (v === 6 && isPrivateIPv6(ip)) {
      return { safe: false, reason: `Domínio resolve para IPv6 privado (${ip}).` };
    }
  }

  return { safe: true, resolvedIps: addresses };
}

export function validateUrlFormat(input: string): { valid: boolean; url?: URL; reason?: string } {
  if (!input || typeof input !== "string") {
    return { valid: false, reason: "URL vazia." };
  }

  // Adiciona protocolo se vier sem
  let normalized = input.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return { valid: false, reason: "Formato de URL inválido." };
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return { valid: false, reason: "Apenas HTTP e HTTPS são suportados." };
  }

  if (!url.hostname) {
    return { valid: false, reason: "URL sem domínio." };
  }

  // Bloqueia portas suspeitas
  const port = url.port ? parseInt(url.port, 10) : url.protocol === "https:" ? 443 : 80;
  const blockedPorts = [22, 23, 25, 110, 143, 3306, 5432, 6379, 27017];
  if (blockedPorts.includes(port)) {
    return { valid: false, reason: "Porta não permitida." };
  }

  return { valid: true, url };
}

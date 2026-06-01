// lib/utils/fetcher.ts
// Wrapper de fetch com:
// - Timeout configurável
// - Limite de tamanho de resposta (evita download de arquivo gigante)
// - User-Agent identificável (não somos crawler oculto)
// - Captura de tempo de resposta

const USER_AGENT = "PapocaScanBot/1.0 (+https://app.agenciapapoca.com.br/about)";
const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_BYTES = 5 * 1024 * 1024; // 5MB — sites maiores que isso já têm outro problema

export interface FetchSafeResult {
  ok: boolean;
  status: number;
  headers: Record<string, string>;
  body: string;
  responseTimeMs: number;
  finalUrl: string;
  error?: string;
}

export async function fetchSafe(
  url: string,
  opts: { timeoutMs?: number; method?: string } = {}
): Promise<FetchSafeResult> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, method = "GET" } = opts;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });

    // Lê body com limite de tamanho
    const reader = res.body?.getReader();
    let received = 0;
    const chunks: Uint8Array[] = [];

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.length;
        if (received > MAX_BYTES) {
          reader.cancel();
          break;
        }
        chunks.push(value);
      }
    }

    const buffer = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      buffer.set(chunk, offset);
      offset += chunk.length;
    }

    const body = new TextDecoder("utf-8").decode(buffer);
    const responseTimeMs = Date.now() - start;

    return {
      ok: res.ok,
      status: res.status,
      headers,
      body,
      responseTimeMs,
      finalUrl: res.url,
    };
  } catch (err) {
    const responseTimeMs = Date.now() - start;
    const error = err instanceof Error ? err.message : "Erro desconhecido";
    return {
      ok: false,
      status: 0,
      headers: {},
      body: "",
      responseTimeMs,
      finalUrl: url,
      error,
    };
  } finally {
    clearTimeout(timeout);
  }
}

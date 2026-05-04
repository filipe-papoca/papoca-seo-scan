// lib/checks/index.ts
// Demais checks consolidados. Em produção, separar em arquivos individuais.

import * as cheerio from "cheerio";
import type { CheckFn, CheckResult } from "../../types/scan";

// ========== META TAGS ==========
export const metaTagsCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const $ = cheerio.load(ctx.html);
  const title = $("title").first().text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim() || "";

  const titleOk = title.length >= 10 && title.length <= 70;
  const descOk = description.length >= 50 && description.length <= 200;

  if (!title || !description) {
    return {
      id: "meta-tags",
      category: "structure",
      name: "Meta tags essenciais",
      status: "fail",
      weight: 7,
      message: !title
        ? "Sem title na página. Esse é o identificador que aparece em busca, IA e compartilhamento. Não ter é como não ter nome."
        : "Sem meta description, robôs de IA improvisam um resumo a partir do primeiro trecho de texto que acharem. Você perde controle sobre como sua marca é apresentada.",
      technical: `title="${title}" (${title.length} chars), description="${description.slice(0, 60)}..." (${description.length} chars)`,
    };
  }

  if (!titleOk || !descOk) {
    return {
      id: "meta-tags",
      category: "structure",
      name: "Meta tags essenciais",
      status: "warn",
      weight: 7,
      message: `Title e description existem, mas estão fora do tamanho ideal (atual: title ${title.length} caracteres, description ${description.length}). Ideal: title entre 10 e 70, description entre 50 e 200. Fora dessa faixa, são truncadas em busca e em previews.`,
    };
  }

  return {
    id: "meta-tags",
    category: "structure",
    name: "Meta tags essenciais",
    status: "pass",
    weight: 7,
    message: "Title e description bem dimensionados. Sua marca aparece como você definiu, sem truncamento.",
    technical: `title=${title.length}c, description=${description.length}c`,
  };
};

// ========== OPEN GRAPH ==========
export const openGraphCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const $ = cheerio.load(ctx.html);
  const required = ["og:title", "og:description", "og:type", "og:url", "og:image"];
  const found = required.filter((tag) => $(`meta[property="${tag}"]`).attr("content"));

  if (found.length === 0) {
    return {
      id: "open-graph",
      category: "structure",
      name: "Open Graph",
      status: "fail",
      weight: 5,
      message: "Sem Open Graph. Toda vez que alguém compartilha seu link, o preview sai genérico — sem imagem, sem descrição editada. Deixa dinheiro de marca na mesa.",
    };
  }

  if (found.length < required.length) {
    const missing = required.filter((t) => !found.includes(t));
    return {
      id: "open-graph",
      category: "structure",
      name: "Open Graph",
      status: "warn",
      weight: 5,
      message: `Open Graph parcial. Faltam tags: ${missing.join(", ")}. Sem todas, plataformas decidem entre mostrar preview incompleto ou descartar — e perdem-se cliques que já estavam ganhos.`,
    };
  }

  return {
    id: "open-graph",
    category: "structure",
    name: "Open Graph",
    status: "pass",
    weight: 5,
    message: "Open Graph completo. Quando compartilham seu link, sai como você quer que saia.",
  };
};

// ========== HTTPS + CANONICAL ==========
export const httpsCanonicalCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const $ = cheerio.load(ctx.html);
  const isHttps = ctx.url.startsWith("https://");
  const canonical = $('link[rel="canonical"]').attr("href")?.trim();

  if (!isHttps) {
    return {
      id: "https-canonical",
      category: "ai_signals",
      name: "HTTPS e canonical",
      status: "fail",
      weight: 6,
      message: "Sem HTTPS. Em 2026 isso é problema sério — robôs de IA tratam HTTP como pouco confiável e rebaixam o conteúdo. Implementar HTTPS é gratuito (Let's Encrypt) e urgente.",
    };
  }

  if (!canonical) {
    return {
      id: "https-canonical",
      category: "ai_signals",
      name: "HTTPS e canonical",
      status: "warn",
      weight: 6,
      message: "HTTPS ativo, mas sem canonical declarado. Quando você tem variações de URL (com/sem barra, parâmetros UTM, www vs não-www), o canonical diz 'a versão oficial é essa'. Sem ele, robôs podem indexar versão errada.",
    };
  }

  return {
    id: "https-canonical",
    category: "ai_signals",
    name: "HTTPS e canonical",
    status: "pass",
    weight: 6,
    message: "HTTPS ativo e canonical declarado. URL única, conteúdo seguro.",
    technical: `canonical: ${canonical}`,
  };
};

// ========== RESPONSE TIME ==========
export const responseTimeCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const ms = ctx.responseTimeMs;

  if (ms > 5000) {
    return {
      id: "response-time",
      category: "performance",
      name: "Tempo de resposta",
      status: "fail",
      weight: 6,
      message: `Seu servidor levou ${(ms / 1000).toFixed(1)}s para responder. Acima de 5 segundos, robôs de IA desistem ou priorizam outras fontes — você fica de fora dos resultados pelo tempo de espera, não pelo conteúdo.`,
      technical: `${ms}ms`,
    };
  }

  if (ms > 3000) {
    return {
      id: "response-time",
      category: "performance",
      name: "Tempo de resposta",
      status: "warn",
      weight: 6,
      message: `Tempo de resposta em ${(ms / 1000).toFixed(1)}s. Funciona, mas está acima dos 3 segundos que LLMs e usuários esperam. Otimização de servidor e CDN resolvem na maioria dos casos.`,
      technical: `${ms}ms`,
    };
  }

  return {
    id: "response-time",
    category: "performance",
    name: "Tempo de resposta",
    status: "pass",
    weight: 6,
    message: `Resposta rápida (${(ms / 1000).toFixed(1)}s). Robôs conseguem ler e processar sem timeout.`,
    technical: `${ms}ms`,
  };
};

// ========== HTML SEMÂNTICO ==========
export const htmlSemanticCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const $ = cheerio.load(ctx.html);
  const h1Count = $("h1").length;
  const h2Count = $("h2").length;
  const articleOrMain = $("article, main").length;
  const lang = $("html").attr("lang");

  const issues: string[] = [];
  if (h1Count === 0) issues.push("sem H1");
  if (h1Count > 1) issues.push(`${h1Count} H1 (deve ser único)`);
  if (h2Count === 0) issues.push("sem H2");
  if (articleOrMain === 0) issues.push("sem <main> ou <article>");
  if (!lang) issues.push("sem atributo lang em <html>");

  if (issues.length >= 3) {
    return {
      id: "html-semantic",
      category: "structure",
      name: "HTML semântico",
      status: "fail",
      weight: 5,
      message: `Estrutura HTML com problemas múltiplos: ${issues.join(", ")}. Robôs de IA leem páginas como árvore — quando a árvore está bagunçada, eles extraem texto fora de contexto. Hierarquia clara é o que diferencia ser citado como fonte direta vs. aparecer só em referência tangencial.`,
    };
  }

  if (issues.length > 0) {
    return {
      id: "html-semantic",
      category: "structure",
      name: "HTML semântico",
      status: "warn",
      weight: 5,
      message: `Estrutura HTML quase ok, mas com pendências: ${issues.join(", ")}. São pequenos detalhes que somados afetam como robôs interpretam a hierarquia da página.`,
    };
  }

  return {
    id: "html-semantic",
    category: "structure",
    name: "HTML semântico",
    status: "pass",
    weight: 5,
    message: "Estrutura HTML limpa: H1 único, hierarquia clara, marcação semântica. Robôs leem sem ambiguidade.",
    technical: `H1=${h1Count}, H2=${h2Count}, lang=${lang}`,
  };
};

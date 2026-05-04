// lib/checks/structuredData.ts
// Schema.org / JSON-LD é o sinal mais forte para LLMs interpretarem entidades.
// Verifica presença, validade JSON, e tipos comuns (Organization, Article, FAQPage).

import * as cheerio from "cheerio";
import type { CheckFn, CheckResult } from "../../types/scan";

const VALUABLE_TYPES = ["Organization", "Article", "FAQPage", "Product", "BreadcrumbList", "WebSite", "LocalBusiness"];

export const structuredDataCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  const $ = cheerio.load(ctx.html);
  const scripts = $('script[type="application/ld+json"]');

  if (scripts.length === 0) {
    return {
      id: "structured-data",
      category: "structure",
      name: "Dados estruturados (Schema.org)",
      status: "fail",
      weight: 9,
      message: "Sem dados estruturados, robôs de IA precisam adivinhar do que sua página trata pelo texto bruto. Schema.org diz explicitamente: 'isso é uma empresa, isso é um produto, isso é um artigo'. É o sinal mais forte que você pode dar.",
      technical: "Nenhum <script type=\"application/ld+json\"> encontrado.",
    };
  }

  let validCount = 0;
  let invalidCount = 0;
  const foundTypes = new Set<string>();

  scripts.each((_, el) => {
    const raw = $(el).contents().text();
    try {
      const parsed = JSON.parse(raw);
      validCount++;
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        const type = item["@type"];
        if (typeof type === "string") foundTypes.add(type);
        else if (Array.isArray(type)) type.forEach((t) => foundTypes.add(t));
      }
    } catch {
      invalidCount++;
    }
  });

  const valuableFound = [...foundTypes].filter((t) => VALUABLE_TYPES.includes(t));

  if (validCount === 0) {
    return {
      id: "structured-data",
      category: "structure",
      name: "Dados estruturados (Schema.org)",
      status: "fail",
      weight: 9,
      message: "Você tem JSON-LD, mas com erros de sintaxe. Robôs descartam blocos quebrados — pior que não ter, porque você acha que está marcando e não está. Vale validar em validator.schema.org.",
      technical: `${invalidCount} bloco(s) com erro de parsing.`,
    };
  }

  if (valuableFound.length === 0) {
    return {
      id: "structured-data",
      category: "structure",
      name: "Dados estruturados (Schema.org)",
      status: "warn",
      weight: 9,
      message: `Schema.org presente, mas sem os tipos que importam para visibilidade em IA (encontramos: ${[...foundTypes].join(", ") || "nenhum tipo"}). Adicione Organization (sua empresa), Article (conteúdo editorial) ou FAQPage (dúvidas frequentes) — são os mais usados por LLMs para citar fontes.`,
      technical: `Tipos encontrados: ${[...foundTypes].join(", ")}`,
    };
  }

  return {
    id: "structured-data",
    category: "structure",
    name: "Dados estruturados (Schema.org)",
    status: "pass",
    weight: 9,
    message: `Schema.org configurado com tipos relevantes (${valuableFound.join(", ")}). Robôs entendem com clareza o que sua página é — e isso aumenta a chance de citação.`,
    technical: `${validCount} bloco(s) válido(s), tipos: ${[...foundTypes].join(", ")}`,
  };
};

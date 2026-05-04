// lib/checks/sitemap.ts
// Verifica presença de sitemap.xml e se está declarado no robots.txt.

import type { CheckFn, CheckResult } from "../../types/scan";
import { fetchSafe } from "../utils/fetcher";

export const sitemapCheck: CheckFn = async (ctx): Promise<CheckResult> => {
  // 1. Tenta /sitemap.xml direto
  const sitemapUrl = `${ctx.origin}/sitemap.xml`;
  const directRes = await fetchSafe(sitemapUrl, { timeoutMs: 5000 });

  // 2. Verifica se robots.txt declara sitemap
  const robotsRes = await fetchSafe(`${ctx.origin}/robots.txt`, { timeoutMs: 5000 });
  const declaredInRobots = robotsRes.ok && /^sitemap:\s*/im.test(robotsRes.body);

  const directExists = directRes.ok && directRes.status === 200 && directRes.body.includes("<");

  if (!directExists && !declaredInRobots) {
    return {
      id: "sitemap",
      category: "discoverability",
      name: "Sitemap",
      status: "fail",
      weight: 7,
      message: "Sem sitemap detectável, robôs de IA dependem só de seguir links — e perdem páginas profundas. Sitemap é o mapa que diz 'aqui é tudo o que importa'.",
      technical: `sitemap.xml HTTP ${directRes.status}; robots declara sitemap: ${declaredInRobots}`,
      evidence: { sitemapUrl, declaredInRobots },
    };
  }

  if (directExists && !declaredInRobots) {
    return {
      id: "sitemap",
      category: "discoverability",
      name: "Sitemap",
      status: "warn",
      weight: 7,
      message: "Sitemap existe, mas não é referenciado no robots.txt. Uma linha 'Sitemap: https://seusite.com/sitemap.xml' nesse arquivo aumenta a chance dos robôs encontrarem.",
      technical: "sitemap.xml acessível direto, mas robots.txt não referencia.",
    };
  }

  if (!directExists && declaredInRobots) {
    return {
      id: "sitemap",
      category: "discoverability",
      name: "Sitemap",
      status: "warn",
      weight: 7,
      message: "Seu robots.txt aponta para um sitemap, mas o caminho padrão /sitemap.xml está vazio ou inacessível. Vale conferir se o sitemap real está sendo gerado.",
    };
  }

  return {
    id: "sitemap",
    category: "discoverability",
    name: "Sitemap",
    status: "pass",
    weight: 7,
    message: "Sitemap detectado e declarado no robots.txt. Robôs conseguem mapear seu site sem depender de sorte.",
  };
};

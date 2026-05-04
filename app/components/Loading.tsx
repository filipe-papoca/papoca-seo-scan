// app/components/Loading.tsx
"use client";

import { useState, useEffect } from "react";

const STAGES = [
  "Validando URL e segurança",
  "Buscando robots.txt e sitemap",
  "Analisando HTML e Schema.org",
  "Verificando sinais para IA",
  "Calculando score",
];

interface LoadingProps {
  url: string;
}

export function Loading({ url }: LoadingProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGES.length - 1));
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="loading-section">
      <div className="wrap">
        <span className="eyebrow">Em andamento</span>
        <p className="url-line">{url}</p>
        <ul className="loading-stages">
          {STAGES.map((s, i) => (
            <li
              key={i}
              className={i < stage ? "done" : i === stage ? "active" : ""}
            >
              <span className="marker">
                {i < stage ? "✓" : i === stage ? "›" : "·"}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

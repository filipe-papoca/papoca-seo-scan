// app/components/Result.tsx
"use client";

import { useState, useEffect } from "react";
import type { ScanResult, CheckResult, CheckCategory } from "../../types/scan";

const STATUS_LABEL: Record<CheckResult["status"], string> = {
  pass: "Aprovado",
  warn: "Atenção",
  fail: "Crítico",
  error: "Erro",
};

const LEVEL_LABEL: Record<ScanResult["scoreLevel"], string> = {
  critical: "Score crítico",
  low: "Score baixo",
  medium: "Score médio",
  good: "Score bom",
  excellent: "Score excelente",
};

const CATEGORY_LABEL: Record<CheckCategory, string> = {
  discoverability: "Descoberta",
  structure: "Estrutura",
  ai_signals: "Sinais para IA",
  performance: "Performance",
};

const CATEGORY_ORDER: CheckCategory[] = [
  "discoverability",
  "structure",
  "ai_signals",
  "performance",
];

function scoreLeadCopy(level: ScanResult["scoreLevel"]): string {
  switch (level) {
    case "critical":
      return "Seu site tem problemas estruturais sérios para visibilidade em IA. Crawlers podem não conseguir indexar ou compreender seu conteúdo adequadamente.";
    case "low":
      return "Seu site tem lacunas importantes para ser citado por IAs. Há espaço significativo para melhorar a presença orgânica em ChatGPT, Gemini e similares.";
    case "medium":
      return "Seu site está parcialmente preparado. Alguns sinais essenciais estão presentes, mas otimizações específicas podem amplificar a presença em IAs.";
    case "good":
      return "Seu site está bem preparado para IAs, com a maioria dos sinais corretamente configurados. Há ajustes finos que podem elevar a performance.";
    case "excellent":
      return "Seu site está em excelente forma para visibilidade em IA. Você está à frente da maioria dos sites em estrutura e sinalização.";
  }
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ResultProps {
  result: ScanResult;
}

export function Result({ result }: ResultProps) {
  return (
    <section className="result-section fade-up">
      <ScoreBlock result={result} />
      {result.topActions.length > 0 && (
        <PrioritiesBlock actions={result.topActions} />
      )}
      <ChecksBlock checks={result.checks} />
      <CTABlock />
    </section>
  );
}

function ScoreBlock({ result }: { result: ScanResult }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const duration = 1000;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(result.score * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [result.score]);

  return (
    <div className="wrap result-header">
      <div className="meta-row">
        <span className="eyebrow">Resultado</span>
        <span className="divider" />
        <span className="ts">{formatTimestamp(result.scannedAt)}</span>
      </div>

      <div className="score-grid">
        <div>
          <p className="score-url">{result.url}</p>
          <div className="score-display">
            <span className={`score-num ${result.scoreLevel}`}>
              {displayScore}
            </span>
            <span className="score-divisor">/100</span>
          </div>
          <span className={`score-pill ${result.scoreLevel}`}>
            {LEVEL_LABEL[result.scoreLevel]}
          </span>
          <p className="score-lead">{scoreLeadCopy(result.scoreLevel)}</p>
        </div>

        <div>
          <span
            className="eyebrow eyebrow-muted"
            style={{ display: "block", marginBottom: 14 }}
          >
            Sumário
          </span>
          <div className="summary-grid">
            <div className="summary-card pass">
              <span className="label">Aprovados</span>
              <span className="value">{result.summary.pass}</span>
            </div>
            <div className="summary-card warn">
              <span className="label">Atenção</span>
              <span className="value">{result.summary.warn}</span>
            </div>
            <div className="summary-card fail">
              <span className="label">Críticos</span>
              <span className="value">{result.summary.fail}</span>
            </div>
            <div className="summary-card dark">
              <span className="label">Duração</span>
              <span className="value">
                {(result.durationMs / 1000).toFixed(1)}s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrioritiesBlock({ actions }: { actions: string[] }) {
  return (
    <div className="priorities">
      <div className="wrap">
        <span className="eyebrow">Prioridades</span>
        <h3>Onde focar primeiro.</h3>
        <ol className="priorities-list">
          {actions.map((action, i) => (
            <li key={i} className="priority-item">
              <span className="priority-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="priority-text">{action}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ChecksBlock({ checks }: { checks: CheckResult[] }) {
  // Agrupa por categoria, mantendo ordem definida
  const grouped: Record<CheckCategory, CheckResult[]> = {
    discoverability: [],
    structure: [],
    ai_signals: [],
    performance: [],
  };
  for (const c of checks) {
    grouped[c.category].push(c);
  }

  const total = checks.length;
  let globalIdx = 0;

  return (
    <div className="checks-section">
      <div className="wrap">
        <span className="eyebrow">Diagnóstico completo</span>
        <h3>Cada verificação, em detalhe.</h3>

        {CATEGORY_ORDER.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0) return null;

          return (
            <div key={cat} className="category-block">
              <div className="category-header">
                <h4>{CATEGORY_LABEL[cat]}</h4>
                <span className="count">
                  {items.length}{" "}
                  {items.length === 1 ? "verificação" : "verificações"}
                </span>
              </div>
              <ul>
                {items.map((c) => {
                  globalIdx++;
                  return (
                    <CheckRow
                      key={c.id}
                      check={c}
                      index={globalIdx}
                      total={total}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CheckRow({
  check,
  index,
  total,
}: {
  check: CheckResult;
  index: number;
  total: number;
}) {
  return (
    <li className="check-row">
      <span className="check-num">
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="check-body">
        <h5 className="check-name">{check.name}</h5>
        <p className="check-msg">{check.message}</p>
        {check.technical && <p className="check-tech">{check.technical}</p>}
      </div>
      <div className="check-status">
        <span className={`badge badge-${check.status}`}>
          {STATUS_LABEL[check.status]}
        </span>
      </div>
    </li>
  );
}

function CTABlock() {
  return (
    <div className="cta-section">
      <div className="wrap">
        <div className="cta-grid">
          <div>
            <span className="eyebrow">Próximo passo</span>
            <h3>
              Esse scan é o começo.{" "}
              <span className="dark">O Diagnóstico GEO</span> é onde você vê
              tudo.
            </h3>
            <p>
              Análise estatística de presença real nas principais IAs, queries
              do seu nicho, benchmark contra concorrentes diretos e plano de
              ação concreto. Metodologia proprietária da Papoca, com 11 anos de
              experiência em SEO.
            </p>
          </div>
          <div className="cta-right">
            <a
              href="https://agenciapapoca.com.br/#contato"
              target="_blank"
              rel="noopener"
              className="cta-btn"
            >
              Falar com a Papoca →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// app/components/Hero.tsx
"use client";

interface HeroProps {
  url: string;
  setUrl: (v: string) => void;
  loading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function Hero({ url, setUrl, loading, error, onSubmit }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Diagnóstico de Visibilidade GEO</span>
            <h1>
              Seu site está pronto para as{" "}
              <span className="accent">inteligências</span> artificiais?
            </h1>
            <p className="sub">
              Análise técnica gratuita de quão preparado seu site está para ser
              encontrado, lido e citado por ChatGPT, Claude, Gemini e Perplexity.
              Resultado em segundos, com diagnóstico específico e acionável.
            </p>
          </div>
          <div className="hero-meta">
            <div className="meta-item">
              <span className="meta-num">9</span> verificações
            </div>
            <div className="meta-item">
              <span className="meta-num">4</span> categorias
            </div>
            <div className="meta-item">
              <span className="meta-num">0–100</span> score
            </div>
          </div>
        </div>

        <form className="scan-form" onSubmit={onSubmit}>
          <label htmlFor="scan-url">URL do site</label>
          <div className="scan-row">
            <input
              id="scan-url"
              type="text"
              className="scan-input"
              placeholder="https://seusite.com.br"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              required
              autoFocus
            />
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading || !url}
            >
              {loading ? "Escaneando…" : "Iniciar diagnóstico"}
            </button>
          </div>
          {error && <p className="scan-error">⚠ {error}</p>}
        </form>
      </div>
    </section>
  );
}

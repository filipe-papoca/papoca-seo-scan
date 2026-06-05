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
      <div className="hero-inner wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Diagnóstico técnico gratuito de Visibilidade GEO</span>
            <h1>
              Descubra se seu site está pronto para aparecer no{" "}
              <span className="accent">ChatGPT, Gemini e Perplexity</span>
            </h1>
            <p className="sub">
              Análise técnica gratuita que mostra, em menos de 60 segundos, se sua marca é lida e recomendada pelas IAs e quais ações você deve priorizar.
            </p>

            <div className="hero-meta">
              <div className="meta-item">
                <span className="meta-num">9</span> verificações técnicas que as IAs usam para confiar (ou ignorar) uma marca
              </div>
              <div className="meta-item">
                <span className="meta-num">4</span> categorias de LLM analisadas
              </div>
              <div className="meta-item">
                <span className="meta-num">0–100</span> Score com diagnóstico por categoria e prioridade de ação
              </div>
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
              {loading ? "Escaneando…" : "Iniciar diagnóstico gratuito"}
            </button>
          </div>
          {error && <p className="scan-error">⚠ {error}</p>}
        </form>
      </div>
    </section>
  );
}

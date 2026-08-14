// app/servicos/diagnostico-de-geo/components/Comparativo.tsx
export function Comparativo() {
  return (
    <section className="pp-s--comp">
      <div className="pp-wrap pp-center">
        <h2 className="pp-h2">
          A maioria dos '<span className="pp-rosa">diagnósticos de GEO</span>' cabe em um print
          <span className="pp-rosa">.</span> <br />
          <span className="pp-rosa">O nosso, não</span>.
        </h2>
        <p className="pp-sub">
          O mercado corre pra chamar qualquer busca no ChatGPT de diagnóstico de GEO.
          <br />
          <b>A Papoca construiu uma metodologia.</b>
        </p>

        <div className="pp-cards">
          <div className="pp-card pp-card--generico">
            <h3 className="pp-card__t">Diagnóstico genérico</h3>
            <hr className="pp-card__hr" />
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                </svg>
                <span>1 prompt, 1 resposta, 1 print</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                </svg>
                <span>Só ChatGPT</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                </svg>
                <span>Lista de menções</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                </svg>
                <span>Relatório genérico</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" strokeLinecap="round" />
                </svg>
                <span>&quot;Você aparece ou não&quot;</span>
              </li>
            </ul>
          </div>

          <div className="pp-card pp-card--papoca">
            <h3 className="pp-card__t">Diagnóstico Papoca</h3>
            <hr className="pp-card__hr" />
            <ul>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  Dezenas de milhares de <b>execuções simulando a jornada real do seu cliente</b>
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <b>ChatGPT, Gemini, Claude, Perplexity,</b> e outros, o ecossistema completo
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  Menções, sentimento, fontes citadas, concorrência e <b>oportunidades de citação</b>
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  <b>Metodologia própria</b>, já validada por marcas como a Itaú, Ticket e Benegrip
                </span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>
                  Por que você aparece (ou não), <b>e o que fazer sobre isso</b>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="pp-kicker">
          900 milhões* de pessoas já perguntam pro ChatGPT toda semana.
          <br />
          <span className="pp-reg">A pergunta não é mais se isso importa.</span>{' '}
          <span className="pp-rosa">É se a sua marca aparece.</span>
        </p>
        <p className="pp-micro" style={{ marginTop: '10px' }}>
          * Fonte:{' '}
          <a href="https://openai.com" rel="nofollow noopener" target="_blank">
            OpenAI
          </a>
        </p>

        <a className="pp-btn pp-btn--rosa" href="#form" data-cta="comparativo-presenca">
          Quero entender minha presença nos LLMs
        </a>
      </div>
    </section>
  );
}

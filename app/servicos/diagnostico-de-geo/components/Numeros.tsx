// app/servicos/diagnostico-de-geo/components/Numeros.tsx
const LLM_LOGOS = [
  { file: 'llm-metaai.svg', alt: 'Meta AI' },
  { file: 'llm-googleai.svg', alt: 'Google AI' },
  { file: 'llm-chatgpt.svg', alt: 'ChatGPT' },
  { file: 'llm-claude.svg', alt: 'Claude' },
  { file: 'llm-gemini.svg', alt: 'Gemini' },
  { file: 'llm-perplexity.svg', alt: 'Perplexity' },
  { file: 'llm-deepseek.svg', alt: 'DeepSeek' },
];

const ASSETS = '/servicos/diagnostico-de-geo/assets';

export function Numeros() {
  return (
    <section className="pp-s--num">
      <div className="pp-wrap pp-center">
        <h2 className="pp-h2">
          Avaliamos sua marca do jeito que <br />
          <span className="pp-preto">ela realmente é usada</span>, não com um print de ChatGPT
          <span className="pp-preto">.</span>
        </h2>

        <div className="pp-stats">
          <div className="pp-stat">
            <b>
              70<i>+</i>
            </b>
            <span>prompts diferentes criados</span>
          </div>
          <div className="pp-stat">
            <b>
              100<i>x</i>
            </b>
            <span>cada prompt é testado por cada IA</span>
          </div>
          <div className="pp-stat">
            <b>
              50K<i>+</i>
            </b>
            <span>execuções por diagnóstico</span>
          </div>
        </div>

        <p className="pp-models">
          8 modelos de IA
          <br />
          <mark>analisados</mark>
        </p>

        {/* Faixa branca com borda preta em baixo e à direita, inclinada.
            Os logos correm em marquee contínuo; a lista é duplicada para o loop
            não ter costura. A 2ª e 3ª listas são aria-hidden para não repetir no leitor de tela.
            FALTA O ASSET "AI Overview" — hoje são 7 logos e o título diz 8. */}
        <div className="pp-logobar">
          <div className="pp-marquee">
            <ul className="pp-marquee__row" aria-label="Modelos de IA analisados">
              {LLM_LOGOS.map((logo) => (
                <li key={logo.file}>
                  <img src={`${ASSETS}/${logo.file}`} alt={logo.alt} width={162} height={52} loading="lazy" />
                </li>
              ))}
            </ul>
            <ul className="pp-marquee__row" aria-hidden="true">
              {LLM_LOGOS.map((logo) => (
                <li key={`b-${logo.file}`}>
                  <img src={`${ASSETS}/${logo.file}`} alt="" width={162} height={52} loading="lazy" />
                </li>
              ))}
            </ul>
            <ul className="pp-marquee__row" aria-hidden="true">
              {LLM_LOGOS.map((logo) => (
                <li key={`c-${logo.file}`}>
                  <img src={`${ASSETS}/${logo.file}`} alt="" width={162} height={52} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

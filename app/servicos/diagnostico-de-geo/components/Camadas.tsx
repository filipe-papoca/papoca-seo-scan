// app/servicos/diagnostico-de-geo/components/Camadas.tsx
export function Camadas() {
  return (
<section className="pp-s--cam">

  {/* Lupa: acompanha a rolagem de "Com esse volume de dados" até o fim de
       "Conteúdos influenciadores", conforme o protótipo. Sticky e não fixed,
       para parar sozinha no limite da seção. Sobreposta aos gráficos.
       O script no fim da página a esmaece quando ela cruza um bloco de texto,
       porque texto cinza sobre o rosa ou o preto dela dá contraste de 1,5:1.
       Só desktop. */}
  <div className="pp-lupa" aria-hidden="true">
    <picture>
      {/* movimento reduzido: entrega o SVG vetorial estático */}
      <source media="(prefers-reduced-motion: reduce)" srcSet="/servicos/diagnostico-de-geo/assets/lupa-animada.svg" type="image/svg+xml"/>
      <img src="/servicos/diagnostico-de-geo/assets/lupa-anim.webp" alt="" width="613" height="438" decoding="async"/>
    </picture>
  </div>

  <div className="pp-wrap pp-center">
    <h2 className="pp-h2">Com esse volume de dados, <br/>mapeamos sua marca em <span className="pp-rosa">4 camadas</span>:</h2>
    <p className="pp-sub">O mercado corre pra chamar qualquer busca no ChatGPT de diagnóstico de GEO.<br/><b>A Papoca construiu uma metodologia.</b></p>
    <p className="pp-case">Para apresentar nosso diagnóstico, fizemos um estudo de caso com a <b>Apple</b></p>
  </div>

  {/* ---------- camada 1 ---------- */}
  <div className="pp-wrap">
    <div className="pp-layer pp-layer--1">

      <div className="pp-layer__head">
        <div className="pp-layer__title">
          <span className="pp-layer__n">1</span>
          <h3>Share of Voice</h3>
        </div>
        <p className="pp-layer__desc">O quanto sua marca aparece, e em que posição, nas respostas de cada IA, comparado direto com a concorrência, LLM por LLM.</p>
      </div>

      <div className="pp-layer__body">
      <div className="pp-donuts">
        <div className="pp-donut"><p className="pp-donut__lb">ChatGPT</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="82 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="154.6 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">82%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">ChatGPT Search</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="80 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="150.8 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">80%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Claude</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="79 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="148.9 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">79%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Gemini</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="80 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="150.8 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">80%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Gemini Search</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="71 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="133.8 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">71%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Google AI Overview</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="74 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="139.5 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">74%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Google AI Mode</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="69 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="130.1 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">69%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Deepseek</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="77 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="145.1 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">77%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Meta AI</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="76 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="143.3 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">76%</text></svg></div>
        <div className="pp-donut"><p className="pp-donut__lb">Perplexity</p><svg width="66" height="66" viewBox="0 0 66 66" role="img" aria-label="68 por cento"><circle cx="33" cy="33" r="30" fill="none" stroke="#F1F1F1" strokeWidth="6"/><circle cx="33" cy="33" r="30" fill="none" stroke="var(--pp-rosa)" strokeWidth="6" strokeDasharray="128.2 188.5" transform="rotate(-90 33 33)"/><text x="33" y="33" textAnchor="middle" dominantBaseline="central" fontSize="15">68%</text></svg></div>
      </div>

      <div className="pp-summary">
        <div className="pp-summary__grupo">
          <div className="pp-summary__pie">
          <svg width="74" height="74" viewBox="0 0 74 74" role="img" aria-label="77 por cento">
            <circle cx="37" cy="37" r="36" fill="#F6D6E8"/>
            {/* setor de 77%: começa no topo e gira no sentido horário */}
            <path d="M37 37 L37 1 A36 36 0 1 1 15.4 66.4 Z" fill="var(--pp-rosa)"/>
          </svg>
        </div>
          <div className="pp-summary__val">
          <p className="pp-summary__big pp-rosa">77%</p>
          <p className="pp-summary__lb">média em Share of Voice<br/>considerando todas LLMs.</p>
          </div>
        </div>
        <p className="pp-summary__txt">A Apple possui uma forte presença em todas as LLMs analisadas, com destaque para 82% no ChatGPT e 80% no ChatGPT Search e Gemini.</p>
      </div>{/* /.pp-summary */}
      </div>
    </div>

    {/* ---------- camada 2 ---------- */}
    <div className="pp-layer pp-layer--2">
      <div className="pp-layer__head">
        <div className="pp-layer__title">
          <span className="pp-layer__n">2</span>
          <h3>Buscas <br/>específicas</h3>
        </div>
        <p className="pp-layer__desc">Como você performa nos atributos que seus clientes realmente perguntam: preço, design, suporte e outros, atributo por atributo, em cada IA.</p>
      </div>

      <div className="pp-layer__body">

      {/* RADAR — valores aproximados a partir do render. Substituir pelos dados reais. */}
      <div className="pp-radar">
        <svg className="pp-radar__svg" viewBox="55 55 390 390" role="img" aria-label="Radar de atributos comparando Apple, Samsung e Motorola">
          <g className="grid" fill="#EDEDF1" fillOpacity=".55">
            <polygon points="250.0,202.5 277.9,211.6 295.2,235.3 295.2,264.7 277.9,288.4 250.0,297.5 222.1,288.4 204.8,264.7 204.8,235.3 222.1,211.6"/>
            <polygon points="250.0,174.0 294.7,188.5 322.3,226.5 322.3,273.5 294.7,311.5 250.0,326.0 205.3,311.5 177.7,273.5 177.7,226.5 205.3,188.5"/>
            <polygon points="250.0,145.5 311.4,165.5 349.4,217.7 349.4,282.3 311.4,334.5 250.0,354.5 188.6,334.5 150.6,282.3 150.6,217.7 188.6,165.5"/>
            <polygon points="250.0,117.0 328.2,142.4 376.5,208.9 376.5,291.1 328.2,357.6 250.0,383.0 171.8,357.6 123.5,291.1 123.5,208.9 171.8,142.4"/>
            <polygon points="250.0,88.5 344.9,119.3 403.6,200.1 403.6,299.9 344.9,380.7 250.0,411.5 155.1,380.7 96.4,299.9 96.4,200.1 155.1,119.3"/>
            <polygon points="250.0,60.0 361.7,96.3 430.7,191.3 430.7,308.7 361.7,403.7 250.0,440.0 138.3,403.7 69.3,308.7 69.3,191.3 138.3,96.3" fill="none"/>
          </g>
          <g className="grid">
            <line x1="250" y1="250" x2="250.0" y2="60.0"/><line x1="250" y1="250" x2="361.7" y2="96.3"/>
            <line x1="250" y1="250" x2="430.7" y2="191.3"/><line x1="250" y1="250" x2="430.7" y2="308.7"/>
            <line x1="250" y1="250" x2="361.7" y2="403.7"/><line x1="250" y1="250" x2="250.0" y2="440.0"/>
            <line x1="250" y1="250" x2="138.3" y2="403.7"/><line x1="250" y1="250" x2="69.3" y2="308.7"/>
            <line x1="250" y1="250" x2="69.3" y2="191.3"/><line x1="250" y1="250" x2="138.3" y2="96.3"/>
          </g>
          <g fill="none" strokeWidth="2.6" strokeLinejoin="round">
            <polygon stroke="var(--pp-amarelo)" points="250.0,65.7 311.4,165.5 380.1,207.7 394.6,297.0 319.2,345.3 250.0,360.2 183.0,342.2 141.6,285.2 150.6,217.7 180.8,154.7"/>
            <polygon stroke="var(--pp-rosa)"    points="250.0,75.2 356.1,104.0 403.6,200.1 425.3,307.0 348.3,385.3 250.0,440.0 149.5,388.3 78.3,305.8 78.3,194.2 146.1,107.0"/>
            <polygon stroke="var(--pp-azul)"    points="250.0,231.0 344.9,119.3 403.6,200.1 362.0,286.4 314.8,339.2 250.0,386.8 158.4,376.0 83.8,304.0 83.8,196.0 149.5,111.7"/>
          </g>
        </svg>

        {/* Rótulos em HTML, não em SVG: texto SVG não quebra linha, e é a
             quebra que deixa "Reputação da marca" e "Armazenamento" legíveis
             no mobile sem criar rolagem horizontal. Posição por trigonometria,
             em % do wrapper, então acompanha qualquer largura. */}
        <span className="pp-radar__lb is-c" style={{ ['--x' as any]: '50.0%', ['--y' as any]: '16.0%' }}>Preço</span>
        <span className="pp-radar__lb is-l" style={{ ['--x' as any]: '70.0%', ['--y' as any]: '22.5%' }}>Reputação da marca</span>
        <span className="pp-radar__lb is-l" style={{ ['--x' as any]: '82.3%', ['--y' as any]: '39.5%' }}>Design</span>
        <span className="pp-radar__lb is-l" style={{ ['--x' as any]: '82.3%', ['--y' as any]: '60.5%' }}>Armazenamento</span>
        <span className="pp-radar__lb is-l" style={{ ['--x' as any]: '70.0%', ['--y' as any]: '77.5%' }}>Bateria</span>
        <span className="pp-radar__lb is-c" style={{ ['--x' as any]: '50.0%', ['--y' as any]: '84.0%' }}>Tela</span>
        <span className="pp-radar__lb is-r" style={{ ['--x' as any]: '30.0%', ['--y' as any]: '77.5%' }}>Durabilidade</span>
        <span className="pp-radar__lb is-r" style={{ ['--x' as any]: '17.7%', ['--y' as any]: '60.5%' }}>Sistema Operacional</span>
        <span className="pp-radar__lb is-r" style={{ ['--x' as any]: '17.7%', ['--y' as any]: '39.5%' }}>Câmera</span>
        <span className="pp-radar__lb is-r" style={{ ['--x' as any]: '30.0%', ['--y' as any]: '22.5%' }}>Desempenho</span>
      </div>

      <div className="pp-legend">
        <span><i style={{ background: 'var(--pp-azul)' }}></i>Apple</span>
        <span><i style={{ background: 'var(--pp-rosa)' }}></i>Samsung</span>
        <span><i style={{ background: 'var(--pp-amarelo)' }}></i>Motorola</span>
      </div>

      <div className="pp-attr">
        <div className="pp-attr__t">
          <span className="pp-attr__ic">
            <svg width="56" height="56" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Atributos positivos e negativos">
              {/* Fundo azul */}
              <circle cx="50" cy="50" r="47" fill="var(--pp-azul)" />
              {/* Metade inferior direita branca */}
              <path d="M85.355 14.645 A50 50 0 0 1 14.645 85.355 Z" fill="#FFFFFF" />
              {/* Cruz branca na metade superior esquerda */}
              <path d="M25 25 L41 41 M41 25 L25 41" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              {/* Check azul na metade inferior direita */}
              <path d="M49 61.5 L61 73.5 L78 45" stroke="var(--pp-azul)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
              {/* Contorno circular azul externo completo */}
              <circle cx="50" cy="50" r="47" fill="none" stroke="var(--pp-azul)" strokeWidth="6" />
            </svg>
          </span>
          <h4>Atributos do <br/>diagnóstico</h4>
        </div>
        <p>Os pontos fracos da Apple estão nos quesitos de bateria e preço, e de pontos fortes, onde a marca lidera é em relação a Design e OS. Os demais atributos, Samsung e Apple disputam a liderança de forma quase igualitária. A Motorola só vence no quesito preço.</p>
      </div>
      </div>

    </div>

    {/* ---------- camada 3 ---------- */}
    <div className="pp-layer pp-layer--3">
      <div className="pp-layer__head">
        <div className="pp-layer__title">
          <span className="pp-layer__n">3</span>
          <h3>Palavras e <br/>Sentimento</h3>
        </div>
        <p className="pp-layer__desc">O que a IA pensa da sua marca: os termos mais associados a você, e se esse sentimento é positivo, negativo ou neutro.</p>
      </div>

      <div className="pp-layer__body">

      <div className="pp-sent">
        <div className="pp-sent__it"><p className="pp-sent__lb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M8.5 14.2c.9 1.1 2.1 1.7 3.5 1.7s2.6-.6 3.5-1.7" strokeLinecap="round"/><path d="M9 9.6h.01M15 9.6h.01" strokeLinecap="round"/></svg>Positivo</p><svg width="67" height="67" viewBox="0 0 67 67" role="img" aria-label="40 por cento"><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#DFDFDF" strokeWidth="7"/><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="var(--pp-roxo)" strokeWidth="7" strokeDasharray="75.4 188.5" transform="rotate(-90 33.5 33.5)"/><text x="33.5" y="33.5" textAnchor="middle" dominantBaseline="central" fontSize="15">40%</text></svg></div>
        <div className="pp-sent__it"><p className="pp-sent__lb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M8.6 14.6h6.8" strokeLinecap="round"/><path d="M9 9.6h.01M15 9.6h.01" strokeLinecap="round"/></svg>Neutro</p><svg width="67" height="67" viewBox="0 0 67 67" role="img" aria-label="30 por cento"><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#DFDFDF" strokeWidth="7"/><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#9A9A9A" strokeWidth="7" strokeDasharray="56.5 188.5" transform="rotate(-90 33.5 33.5)"/><text x="33.5" y="33.5" textAnchor="middle" dominantBaseline="central" fontSize="15">30%</text></svg></div>
        <div className="pp-sent__it"><p className="pp-sent__lb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M9.8 9.3a2.3 2.3 0 013.9 1.6c0 1.6-2.2 1.8-2.2 3.2" strokeLinecap="round"/><path d="M11.5 17.2h.01" strokeLinecap="round"/></svg>Não encontrado</p><svg width="67" height="67" viewBox="0 0 67 67" role="img" aria-label="27 por cento"><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#DFDFDF" strokeWidth="7"/><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#6E6E6E" strokeWidth="7" strokeDasharray="50.9 188.5" transform="rotate(-90 33.5 33.5)"/><text x="33.5" y="33.5" textAnchor="middle" dominantBaseline="central" fontSize="15">27%</text></svg></div>
        <div className="pp-sent__it"><p className="pp-sent__lb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M8.5 15.9c.9-1.1 2.1-1.7 3.5-1.7s2.6.6 3.5 1.7" strokeLinecap="round"/><path d="M9 9.6h.01M15 9.6h.01" strokeLinecap="round"/></svg>Negativo</p><svg width="67" height="67" viewBox="0 0 67 67" role="img" aria-label="3,6 por cento"><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#DFDFDF" strokeWidth="7"/><circle cx="33.5" cy="33.5" r="30" fill="none" stroke="#B8B8B8" strokeWidth="7" strokeDasharray="6.8 188.5" transform="rotate(-90 33.5 33.5)"/><text x="33.5" y="33.5" textAnchor="middle" dominantBaseline="central" fontSize="15">3,6%</text></svg></div>
      </div>

      <div className="pp-summary">
        <div className="pp-summary__grupo">
          <div className="pp-summary__pie">
          <svg width="74" height="74" viewBox="0 0 74 74" role="img" aria-label="70 por cento">
            <circle cx="37" cy="37" r="36" fill="#DED3E6"/>
            <path d="M37 37 L37 1 A36 36 0 1 1 15.4 66.4 Z" fill="var(--pp-roxo)" transform="rotate(-14 37 37)"/>
          </svg>
        </div>
          <div className="pp-summary__val">
          <p className="pp-summary__big" style={{ color: 'var(--pp-roxo)' }}>70%</p>
          <p className="pp-summary__lb">de sentimento positivo<br/>ou neutro para a marca.</p>
          </div>
        </div>
        <p className="pp-summary__txt">O sentimento reflete como a marca aparece em termos dedicados, nos permitindo aprofundar a análise e trabalhar em termos onde a marca possui sentimento negativo ou não foi encontrada.</p>
      </div>
      </div>

    </div>

    {/* ---------- camada 4 ---------- */}
    <div className="pp-layer pp-layer--4">
      <div className="pp-layer__head">
        <div className="pp-layer__title">
          <span className="pp-layer__n">4</span>
          <h3>Conteúdos <br/>influenciadores</h3>
        </div>
        <p className="pp-layer__desc">Quais sites e conteúdos a IA usa como fonte pra falar de você, e o quanto cada um pesa nessa resposta, comparado à concorrência</p>
      </div>

      <div className="pp-layer__body">

      {/* BARRAS + LINHA — valores lidos do render. Substituir pelos dados reais. */}
      <div className="pp-chart pp-chart--wide pp-chart--barras">
        <svg viewBox="0 20 940 500" width="100%" role="img" aria-label="Menções e quantidade de URLs por tipo de fonte">
          <g className="grid">
            <line x1="88" y1="340" x2="848" y2="340" stroke="#8A8A8A"/>
          </g>
          <g className="ax" textAnchor="end">
            <text x="78" y="344">0</text><text x="78" y="244">50.000</text>
            <text x="78" y="144">100.000</text><text x="78" y="44">150.000</text>
          </g>
          <g className="ax" textAnchor="start">
            <text x="862" y="344">0</text><text x="862" y="244">500</text>
            <text x="862" y="144">1.000</text><text x="862" y="44">1.500</text>
          </g>
          <g fill="var(--pp-crimson)">
            <rect x="114.5" y="80.0" width="16" height="260.0"/><rect x="183.6" y="128.0" width="16" height="212.0"/>
            <rect x="252.7" y="138.0" width="16" height="202.0"/><rect x="321.8" y="144.0" width="16" height="196.0"/>
            <rect x="390.9" y="210.0" width="16" height="130.0"/><rect x="460.0" y="236.0" width="16" height="104.0"/>
            <rect x="529.1" y="234.0" width="16" height="106.0"/><rect x="598.2" y="280.0" width="16" height="60.0"/>
            <rect x="667.3" y="288.0" width="16" height="52.0"/><rect x="736.4" y="298.0" width="16" height="42.0"/>
            <rect x="805.5" y="306.0" width="16" height="34.0"/>
          </g>
          <polyline fill="none" stroke="#6E6E6E" strokeWidth="2.4" strokeLinejoin="round"
            points="122.5,274.0 191.6,300.0 260.7,294.0 329.8,254.0 398.9,232.0 468.0,246.0 537.1,54.0 606.2,268.0 675.3,254.0 744.4,294.0 813.5,304.0"/>
          <g className="xl" textAnchor="end">
            <text transform="translate(122.5 354) rotate(-40)">Sites comparativos</text>
            <text transform="translate(191.6 354) rotate(-40)">Redes sociais</text>
            <text transform="translate(260.7 354) rotate(-40)">Concorrentes</text>
            <text transform="translate(329.8 354) rotate(-40)">Blog | Smartphones</text>
            <text transform="translate(398.9 354) rotate(-40)">Blog | Genéricos</text>
            <text transform="translate(468.0 354) rotate(-40)">Portal de notícias</text>
            <text transform="translate(537.1 354) rotate(-40)">Outros sites</text>
            <text transform="translate(606.2 354) rotate(-40)">E-commerce</text>
            <text transform="translate(675.3 354) rotate(-40)">Outras empresas</text>
            <text transform="translate(744.4 354) rotate(-40)">Site de avaliação</text>
            <text transform="translate(813.5 354) rotate(-40)">Fórum</text>
          </g>
        </svg>
      </div>

      <div className="pp-legend">
        <span><i className="bar" style={{ background: 'var(--pp-crimson)' }}></i>Menções</span>
        <span><i className="line" style={{ background: '#6E6E6E' }}></i>Quantidade de URLs</span>
      </div>

      <div className="pp-summary">
        <div className="pp-summary__grupo">
          <div className="pp-summary__pie">
          <svg width="74" height="74" viewBox="0 0 74 74" role="img" aria-label="32 por cento">
            <circle cx="37" cy="37" r="36" fill="#F2DCE2"/>
            <path d="M37 37 L37 1 A36 36 0 0 1 68.5 54.4 Z" fill="var(--pp-crimson)"/>
          </svg>
        </div>
          <div className="pp-summary__val">
          <p className="pp-summary__big" style={{ color: 'var(--pp-crimson)' }}>32%</p>
          <p className="pp-summary__lb">das menções vem de sites<br/>comparativas e redes sociais.</p>
          </div>
        </div>
        <p className="pp-summary__txt">Analisamos e categorizamos todos os sites que são fontes para as IAs responderem sobre o seu negócio. Assim, teremos um plano de ação sólido com sites que realmente são utilizados pelas LLMs.</p>
      </div>
      </div>

    </div>
  </div>
</section>
  );
}

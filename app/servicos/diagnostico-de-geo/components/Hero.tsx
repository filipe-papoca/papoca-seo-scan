// app/servicos/diagnostico-de-geo/components/Hero.tsx
export function Hero() {
  return (
    <section className="pp-s--hero">
      <div className="pp-wrap pp-center">
        <p className="pp-eyebrow">Diagnóstico de GEO</p>
        <h1 className="pp-h1">
          Descubra como a <span className="pp-rosa pp-nowrap">sua marca</span> aparece nas respostas do ChatGPT,
          Gemini, Claude e outras IAs
        </h1>
        <p className="pp-lead">
          Com metodologia própria de GEO, construída por quem vive de buscas há mais de 10 anos, e já validada por
          marcas como Itaú, Ticket e Benegrip.
        </p>
        <a className="pp-btn pp-btn--rosa" href="#form" data-cta="hero-agendar">
          Agendar diagnóstico
        </a>
      </div>
    </section>
  );
}

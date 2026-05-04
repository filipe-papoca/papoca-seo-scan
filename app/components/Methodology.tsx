// app/components/Methodology.tsx
const ITEMS = [
  {
    num: "01 / 04",
    title: "Descoberta",
    desc: "robots.txt, sitemap.xml e regras explícitas para bots de IA como GPTBot, ClaudeBot e PerplexityBot.",
  },
  {
    num: "02 / 04",
    title: "Sinais para IA",
    desc: "Presença de llms.txt, HTTPS, canonical tags e demais sinais que crawlers de IA priorizam.",
  },
  {
    num: "03 / 04",
    title: "Estrutura",
    desc: "Schema.org / JSON-LD, meta tags, Open Graph e hierarquia HTML semântica.",
  },
  {
    num: "04 / 04",
    title: "Performance",
    desc: "Tempo de resposta — crawlers desistem ou rebaixam sites lentos.",
  },
];

export function Methodology() {
  return (
    <section className="methodology">
      <div className="wrap">
        <span className="eyebrow">Metodologia</span>
        <h2>O que verificamos em quatro dimensões.</h2>
        <div className="method-grid">
          {ITEMS.map((it) => (
            <div key={it.num} className="method-card">
              <span className="num">{it.num}</span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

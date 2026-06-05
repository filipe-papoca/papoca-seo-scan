// app/components/Methodology.tsx
const ITEMS = [
  {
    num: "01 / 04",
    title: "Acesso",
    desc: "Se os bots das IAs conseguem entrar, ler e indexar seu site ou estão sendo bloqueados sem você saber.",
  },
  {
    num: "02 / 04",
    title: "Sinais de confiança",
    desc: "Presença de llms.txt, HTTPS, canonical tags e demais sinais que crawlers de IA priorizam.",
  },
  {
    num: "03 / 04",
    title: "Clareza de contexto",
    desc: "Se a IA consegue entender do que seu site trata, quem você é e por que deveria recomendar sua marca.",
  },
  {
    num: "04 / 04",
    title: "Performance",
    desc: "Sites lentos são ignorados pelos crawlers de IA antes mesmo de serem lidos. Isso conta no seu score.",
  },
];

export function Methodology() {
  return (
    <section className="methodology">
      <div className="wrap">
        <span className="eyebrow">Faça o diagnóstico e descubra</span>
        <h2>Por que as IAs ignoram seu site em 4 pontos importantes</h2>
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

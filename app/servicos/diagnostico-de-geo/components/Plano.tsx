// app/servicos/diagnostico-de-geo/components/Plano.tsx
export function Plano() {
  return (
<section className="pp-s--plano">
  {/* No mobile o design usa o tatu deitado. Asset já rotacionado 90°, para não
       depender de transform (que mantém a caixa original no layout).
       A ordem das <source> importa: a primeira que casar é a usada.
       ATENÇÃO: o 960px daqui TEM de ser igual ao @media (max-width:960px) do
       papoca-geo.css que deita o tatu e o joga para o fluxo. São dois lugares
       para o mesmo breakpoint; mudar um sem o outro estica a arte. */}
  <picture className="pp-tatu" aria-hidden="true">
    <source media="(prefers-reduced-motion: reduce) and (max-width: 960px)" srcSet="/servicos/diagnostico-de-geo/assets/tatu-mob-still.webp" type="image/webp" width="824" height="498"/>
    <source media="(prefers-reduced-motion: reduce)" srcSet="/servicos/diagnostico-de-geo/assets/tatu.svg" type="image/svg+xml" width="498" height="824"/>
    <source media="(max-width: 960px)" srcSet="/servicos/diagnostico-de-geo/assets/tatu-mob-anim.webp" type="image/webp" width="824" height="498"/>
    <img src="/servicos/diagnostico-de-geo/assets/tatu-anim.webp" alt="" width="498" height="824" loading="lazy" decoding="async"/>
  </picture>
  <div className="pp-wrap">
    <p className="pp-eyebrow pp-center">O entregável final</p>
    <h2 className="pp-h2 pp-center"><span className="pp-rosa">Plano de ação</span> priorizado<span className="pp-rosa">:</span></h2>
    <p className="pp-sub pp-center">Um relatório completo, com mais de 70 slides, além de uma versão executiva, pronta pra apresentar pra sua liderança.</p>
    <p className="pp-sub2 pp-center">E o mais importante: um <b>plano de ação priorizado</b>, não apenas dados.</p>

    <div className="pp-acc">
      <div className="pp-acc__it">
        <button className="pp-acc__bt" type="button" aria-expanded="false">
          <span>Onde fechar as lacunas</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path className="pp-ic-v" d="M12 5v14"/><path d="M5 12h14"/></svg>
        </button>
        <div className="pp-acc__pn"><p>Mostramos, atributo por atributo, em quais temas a IA já entrega você e em quais entrega o concorrente. Não é uma lista de palavras-chave: é o mapa de onde falta conteúdo seu para a IA citar. Cada lacuna vem com o formato recomendado e o motivo pelo qual ela existe hoje.</p></div>
      </div>
      <div className="pp-acc__it">
        <button className="pp-acc__bt" type="button" aria-expanded="false">
          <span>Os sites que decidem por você</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path className="pp-ic-v" d="M12 5v14"/><path d="M5 12h14"/></svg>
        </button>
        <div className="pp-acc__pn"><p>A IA não inventa a resposta, ela reescreve o que leu. Categorizamos todas as fontes que as LLMs usam para falar do seu mercado e ranqueamos por peso real na resposta. Você sai sabendo em quais sites precisa estar presente, e em quais não vale investir um real.</p></div>
      </div>
      <div className="pp-acc__it">
        <button className="pp-acc__bt" type="button" aria-expanded="false">
          <span>Impacto antes de esforço</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path className="pp-ic-v" d="M12 5v14"/><path d="M5 12h14"/></svg>
        </button>
        <div className="pp-acc__pn"><p>Toda recomendação entra numa matriz de impacto contra esforço. O que muda seu Share of Voice em semanas fica no topo. O que exige seis meses de reestruturação fica marcado como tal, e não disfarçado de quick win. Você decide o que entra no próximo trimestre com o custo na mão.</p></div>
      </div>
    </div>

    <p className="pp-final">No final, tudo isso se transforma num plano de ação:<br/><b>o que produzir, onde publicar, e por onde começar.</b></p>
    {/* caixa de 904px só para o CTA: o `margin:auto` do botão precisa de um pai
         com a largura da coluna, senão ele centraliza no container inteiro. */}
    <div className="pp-plano-cta"><a className="pp-btn pp-btn--rosa" href="#form" data-cta="plano-quero">Quero meu diagnóstico</a></div>
  </div>
</section>
  );
}

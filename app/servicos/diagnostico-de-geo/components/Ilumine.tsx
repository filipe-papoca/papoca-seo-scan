// app/servicos/diagnostico-de-geo/components/Ilumine.tsx
export function Ilumine() {
  return (
<section className="pp-s--ilum">
  <div className="pp-wrap pp-center">
    <h2 className="pp-h2"><span className="pp-rosa">Ilumine sua estratégia</span>. Traga a visão que a sua diretoria está pedindo<span className="pp-rosa">.</span></h2>
    <p className="pp-sub">Não é só um relatório de dados. É o material pronto pra abrir a conversa com quem decide o orçamento</p>

    <div className="pp-cols" style={{ textAlign: 'left' }}>
      {/* Duas artes empilhadas com cross-fade: apagada (contorno, para fundo
           escuro) e acesa (animada). A troca é disparada pelo scroll, junto com
           a inversão do fundo da seção. Empilhadas em vez de trocar o src para
           não haver piscada enquanto a animada carrega. */}
      <div className="pp-lampada" aria-hidden="true">
        <img className="pp-lampada__off" src="/servicos/diagnostico-de-geo/assets/lampada-apagada.svg" alt="" width="440" height="682" loading="lazy" decoding="async"/>
        <img className="pp-lampada__on"  src="/servicos/diagnostico-de-geo/assets/lampada-anim.webp"   alt="" width="440" height="682" loading="lazy" decoding="async"/>
      </div>
      <div>
        <div className="pp-item">
          <h3>Versão executiva, pronta pra apresentar</h3>
          <p>Sem precisar filtrar 70 slides pra achar o que importa. A versão executiva já vem pronta pra reunião de diretoria, com os pontos que decidem orçamento.</p>
        </div>
        <div className="pp-item">
          <h3>O custo de continuar invisível</h3>
          <p>Cada real gasto em mídia paga pra tapar um buraco de visibilidade orgânica é um real que o seu concorrente não precisa gastar, porque ele já aparece de graça na resposta da IA.</p>
        </div>
        <div className="pp-item">
          <h3>Vantagem que não se recupera depois</h3>
          <p>Autoridade semântica se constrói com tempo. O gap entre quem começa agora e quem começa em 2027 só aumenta.</p>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}

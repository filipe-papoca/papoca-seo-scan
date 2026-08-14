// app/servicos/diagnostico-de-geo/components/Nav.tsx
export function Nav() {
  return (
    <header className="pp-s--nav">
      <div className="pp-wrap">
        <nav className="pp-nav">
          <a
            className="pp-logo"
            href="https://agenciapapoca.com/pt/inicio/"
            aria-label="Agência Papoca, ir para a página inicial"
          >
            <i></i>
            <span>
              pa
              <br />
              po
              <br />
              ca.
            </span>
          </a>

          <button
            className="pp-burger"
            type="button"
            aria-expanded="false"
            aria-controls="pp-menu"
            aria-label="Abrir menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          {/* ATENÇÃO: o blog vive em agenciapapoca.com.BR e o resto em
              agenciapapoca.com. Dois domínios distintos. Ver nota no fim do CSS. */}
          <ul className="pp-menu" id="pp-menu">
            <li>
              <a href="https://agenciapapoca.com/pt/inicio/">Home</a>
            </li>
            <li>
              <a href="https://agenciapapoca.com/pt/inicio/#casos">Casos de sucesso</a>
            </li>
            <li>
              <a href="https://agenciapapoca.com/pt/inicio/#servicos" className="is-ativo">
                Serviços
              </a>
            </li>
            <li>
              <a href="https://agenciapapoca.com.br/blog/">Blog</a>
            </li>
            <li>
              <a href="https://agenciapapoca.com/pt/inicio/#contato">Contato</a>
            </li>
          </ul>

          <a className="pp-btn pp-btn--rosa" href="#form" data-cta="nav-comecar">
            Começar
          </a>
        </nav>
      </div>
    </header>
  );
}

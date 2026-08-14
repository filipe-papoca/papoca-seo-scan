// app/servicos/diagnostico-de-geo/components/Footer.tsx
export function Footer() {
  return (
    <footer className="pp-s--foot">
      <div className="pp-wrap">
        <a className="pp-logo" href="https://agenciapapoca.com/pt/inicio/" aria-label="Agência Papoca, ir para a página inicial">
          <i></i>
          <span>
            pa
            <br />
            po
            <br />
            ca.
          </span>
        </a>
        <p>
          Somos uma agência boutique. Unimos consultoria em SEO e excelência em criação de conteúdo. Possuímos equipes
          especializadas em SEO, Marketing de Conteúdo e Inbound Marketing para fazer sua empresa crescer.
        </p>
        <div className="pp-bottom">
          <span>© {new Date().getFullYear()} Agência Papoca</span>
          <a href="mailto:contato@agenciapapoca.com.br">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="2.5" y="5" width="19" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            contato@agenciapapoca.com.br
          </a>
        </div>
      </div>
    </footer>
  );
}

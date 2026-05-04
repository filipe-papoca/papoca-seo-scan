// app/components/Header.tsx
export function Header() {
  return (
    <nav className="nav">
      <a href="/" className="logo">
        <img src="/logo-branco.png" alt="Papoca" />
      </a>
      <div className="links">
        <a href="https://agenciapapoca.com.br">Agência</a>
        <a href="https://agenciapapoca.com.br/blog/">Blog</a>
        <a href="https://agenciapapoca.com.br/#contato" className="nav-cta">
          Falar com a Papoca
        </a>
      </div>
    </nav>
  );
}

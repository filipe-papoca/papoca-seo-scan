// app/components/Footer.tsx
export function Footer() {
  return (
    <footer className="site">
      <div className="wrap row">
        <p>
          © {new Date().getFullYear()}{" "}
          <a href="https://agenciapapoca.com.br">Agência Papoca</a> ·
          Diagnóstico técnico não substitui análise estatística completa.
        </p>
        <p className="mono">
          app.agenciapapoca.com.br
        </p>
      </div>
    </footer>
  );
}

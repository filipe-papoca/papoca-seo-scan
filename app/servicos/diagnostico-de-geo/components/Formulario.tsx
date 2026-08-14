// app/servicos/diagnostico-de-geo/components/Formulario.tsx
export function Formulario() {
  return (
    <section className="pp-s--form" id="form">
      <div className="pp-wrap">
        <div className="pp-cols">
          <div>
            <h2 className="pp-h2">
              Saiba onde <span className="pp-rosa">você</span> <br />
              está nos LLMs<span className="pp-rosa">.</span>
            </h2>
            <p className="pp-sub">
              Agende uma conversa com a Papoca. Entendemos o seu momento, explicamos o processo e, se fizer sentido,
              iniciamos o diagnóstico.
            </p>
          </div>

          <form className="pp-form" method="post" action="#" noValidate>
            <div className="pp-field">
              <label htmlFor="f-nome">
                Nome completo <i>*</i>
              </label>
              <input id="f-nome" name="nome" type="text" placeholder="Seu nome completo" autoComplete="name" required />
            </div>
            <div className="pp-field">
              <label htmlFor="f-email">
                E-mail corporativo <i>*</i>
              </label>
              <input id="f-email" name="email" type="email" placeholder="seu@empresa.com" autoComplete="email" required />
            </div>
            <div className="pp-field">
              <label htmlFor="f-empresa">
                Empresa <i>*</i>
              </label>
              <input
                id="f-empresa"
                name="empresa"
                type="text"
                placeholder="Nome da empresa"
                autoComplete="organization"
                required
              />
            </div>
            <div className="pp-field">
              <label htmlFor="f-cargo">
                Cargo / área <i>*</i>
              </label>
              <input
                id="f-cargo"
                name="cargo"
                type="text"
                placeholder="Seu cargo ou área"
                autoComplete="organization-title"
                required
              />
            </div>
            <button className="pp-btn pp-btn--rosa pp-btn--full" type="submit" data-cta="form-submit">
              Entre em contato
            </button>
            <p className="pp-form__note">*Aceitamos um número limitado de diagnósticos por mês.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

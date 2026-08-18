// app/servicos/diagnostico-de-geo/components/Formulario.tsx
'use client';

import { useState } from 'react';

export function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nome || !email || !empresa || !cargo) {
      setStatus('error');
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/diagnostico-contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, empresa, cargo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar o formulário.');
      }

      setStatus('success');
      setNome('');
      setEmail('');
      setEmpresa('');
      setCargo('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Ocorreu um erro ao enviar. Tente novamente mais tarde.'
      );
    }
  }

  function handleReset() {
    setStatus('idle');
    setErrorMessage('');
  }

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

          <div className="pp-form-card">
            {status === 'success' ? (
              <div className="pp-form pp-form--success" role="alert" aria-live="polite">
                <div className="pp-form__success-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11.5 14.5 15.5 9.5" />
                  </svg>
                </div>
                <h3 className="pp-form__success-title">Mensagem enviada com sucesso!</h3>
                <p className="pp-form__success-desc">
                  Recebemos suas informações. Em até <strong>1 dia útil</strong> nosso time entrará em contato com você para apresentar a metodologia e alinhar os próximos passos.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="pp-btn pp-btn--preto pp-btn--full"
                  style={{ marginTop: '24px' }}
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="pp-form" onSubmit={handleSubmit} noValidate>
                {status === 'error' && errorMessage && (
                  <div className="pp-form__error" role="alert">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pp-field">
                  <label htmlFor="f-nome">
                    Nome completo <i>*</i>
                  </label>
                  <input
                    id="f-nome"
                    name="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                </div>

                <div className="pp-field">
                  <label htmlFor="f-email">
                    E-mail corporativo <i>*</i>
                  </label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    placeholder="seu@empresa.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
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
                    value={empresa}
                    onChange={(e) => setEmpresa(e.target.value)}
                    disabled={status === 'loading'}
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
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    disabled={status === 'loading'}
                    required
                  />
                </div>

                <button
                  className="pp-btn pp-btn--rosa pp-btn--full"
                  type="submit"
                  disabled={status === 'loading'}
                  data-cta="form-submit"
                >
                  {status === 'loading' ? 'Enviando...' : 'Entre em contato'}
                </button>

                <p className="pp-form__note">*Aceitamos um número limitado de diagnósticos por mês.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

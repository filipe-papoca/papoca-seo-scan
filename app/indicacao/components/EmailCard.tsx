'use client';

import React, { useState, useRef } from 'react';

const EMAIL_SUBJECT = 'Apresentação: [Nome] e Albert da Papoca';

const EMAIL_BODY_TEXT = `Oi, Albert! Tudo bem?

Queria te apresentar o/a [Nome], [cargo] na [Empresa]. [Uma frase sobre a empresa ou sobre por que faz sentido.]

[Nome], a Papoca é a agência de GEO, SEO e conteúdo que comentei com você. Deixo vocês dois em contato.

Abraço,`;

export function EmailCard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    const fullText = `Assunto: ${EMAIL_SUBJECT}\n\n${EMAIL_BODY_TEXT}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(fullText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = fullText;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch (err) {
      console.error('Falha ao copiar texto: ', err);
    }
  };

  return (
    <div className="ind-email-box">
      <div className="ind-email-header">
        <div className="ind-email-subject-group">
          <span className="ind-email-subject-label">Assunto</span>
          <span className="ind-email-subject-text">{EMAIL_SUBJECT}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`ind-email-copy-btn ${copied ? 'copied' : ''}`}
          aria-label="Copiar modelo de e-mail de indicação"
        >
          {copied ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Copiado
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              Copiar modelo
            </>
          )}
        </button>
      </div>

      <div className="ind-email-body">
        <p style={{ margin: 0 }}>Oi, Albert! Tudo bem?</p>
        <p style={{ margin: 0 }}>
          Queria te apresentar o/a <mark>[Nome]</mark>, <mark>[cargo]</mark> na <mark>[Empresa]</mark>. <mark>[Uma frase sobre a empresa ou sobre por que faz sentido.]</mark>
        </p>
        <p style={{ margin: 0 }}>
          <mark>[Nome]</mark>, a Papoca é a agência de GEO, SEO e conteúdo que comentei com você. Deixo vocês dois em contato.
        </p>
        <p style={{ margin: 0 }}>Abraço,</p>
      </div>
    </div>
  );
}

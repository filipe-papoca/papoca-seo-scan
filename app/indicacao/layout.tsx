import { Metadata } from 'next';

const URL = 'https://app.agenciapapoca.com.br/indicacao';
const TITLE = 'Programa de Indicação | Papoca';
const DESCRIPTION =
  'Você recebe 5% de tudo que sua indicação investir com a Papoca, pelos primeiros 24 meses de contrato.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Agência Papoca',
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const WEBPAGE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${URL}#webpage`,
  url: URL,
  inLanguage: 'pt-BR',
  name: TITLE,
  description: DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: 'Agência Papoca',
    url: 'https://agenciapapoca.com.br',
  },
};

export default function IndicacaoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }}
      />
      {children}
    </>
  );
}

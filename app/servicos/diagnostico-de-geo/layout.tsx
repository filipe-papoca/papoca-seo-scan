import { Metadata } from 'next';

const URL = 'https://app.agenciapapoca.com.br/servicos/diagnostico-de-geo';
const TITLE = 'Diagnóstico de GEO: sua marca no ChatGPT e Gemini | Papoca';
const DESCRIPTION =
  'Medimos como a sua marca aparece nas respostas do ChatGPT, Gemini, Claude e outras IAs. 50 mil execuções por diagnóstico e um plano de ação priorizado.';

// NOTA: o mockup original referenciava assets/og-diagnostico-geo.jpg como
// imagem de compartilhamento, mas esse arquivo nunca foi gerado (ver
// LEIA-ME.md do projeto fonte). Sem a imagem, og:image/twitter:image ficam
// de fora até ela existir — pendência a resolver antes de publicar de vez.
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
  name: 'Diagnóstico de GEO: sua marca no ChatGPT e Gemini',
  description: DESCRIPTION,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.pp-s--hero .pp-h1', '.pp-s--hero .pp-lead', '.pp-faq__q', '.pp-faq__pn'],
  },
};

// FAQPage espelha exatamente o texto visível no HTML estático do FAQ
// (components/ProvaEFaq.tsx). Se editar as perguntas lá, atualize aqui junto.
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${URL}#faq`,
  url: URL,
  inLanguage: 'pt-BR',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'O que é, na prática, um Diagnóstico de GEO da Papoca?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avaliamos como ChatGPT, Gemini, Claude, Perplexity e outras IAs respondem sobre a sua marca e a do seu mercado, antes do seu cliente perguntar. Não é um print isolado: é uma metodologia própria, com centenas de prompts, mapeamento de sites de influência, sentimento e concorrência. O resultado final é um plano de ação priorizado, não só um relatório de dados.',
      },
    },
    {
      '@type': 'Question',
      name: 'Por que vocês rodam dezenas de milhares de execuções em vez de um prompt único?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porque respostas de IA não são determinísticas. A mesma pergunta pode gerar respostas diferentes a cada execução. Um print captura só uma versão isolada da realidade. Por isso testamos 70+ prompts, cada um rodado 100 vezes em 8 modelos de IA diferentes: mais de 50 mil execuções por diagnóstico. É a diferença entre achismo e dado estatisticamente confiável.',
      },
    },
    {
      '@type': 'Question',
      name: 'Em quanto tempo aparecem resultados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Como em SEO, os resultados são progressivos e aparecem conforme os conteúdos são criados, publicados e indexados pelas IAs. O prazo varia por tipo de modelo: IAs com busca em tempo real (como o AI Overview do Google) respondem em semanas; modelos com base de conhecimento estática (ChatGPT, Gemini e Claude em suas versões conversacionais) atualizam a cada 6 a 12 meses, então o horizonte ali é de meses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vocês cobrem meu país e idioma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Nossa metodologia cobre mais de 120 países e 36 idiomas, configurados pelo par país + idioma do seu mercado-alvo. Isso garante que o diagnóstico reflita como a IA responde pro seu público real, não uma média global genérica.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que eu preciso fazer da minha parte?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pouco. Você valida o produto ou serviço que será o foco do diagnóstico e participa da apresentação final dos resultados. Toda a coleta, análise e construção do plano de ação é com a Papoca. O Diagnóstico ainda pode oferecer insights valiosos para outros times como Produto, Assessoria de Imprensa, Customer Success, entre outros.',
      },
    },
    {
      '@type': 'Question',
      name: 'O diagnóstico pode virar uma parceria contínua?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Pode ser contratado de forma isolada ou como ponto de partida de uma estratégia contínua de SEO e GEO, onde o relatório vira o mapa que guia toda a execução dos meses seguintes.',
      },
    },
  ],
};

export default function DiagnosticoDeGeoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700;14..32,800;14..32,900&display=swap"
        rel="stylesheet"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBPAGE_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      {children}
    </>
  );
}

export const SUPERPODERES = [
  {
    key: '🎯 Mira Certeira',
    label: '🎯 Mira Certeira — entrega sempre no prazo',
    description: 'Quem tem Mira Certeira nunca deixa prazo escapar. É aquela pessoa que você sabe que pode contar — quando ela diz que entrega, entrega. A bala sempre acerta o alvo.',
  },
  {
    key: '🌟 Estrela do Forró',
    label: '🌟 Estrela do Forró — anima qualquer reunião',
    description: 'Tem gente que entra numa sala e muda o clima inteiro. A Estrela do Forró é assim: traz energia, anima a galera e transforma até a reunião mais pesada num baile.',
  },
  {
    key: '🧠 Sábio do Sertão',
    label: '🧠 Sábio do Sertão — resolve qualquer pepino',
    description: 'O Sábio do Sertão tem resposta pra tudo — e quando não tem, vai atrás até achar. É a enciclopédia viva do time, a referência que todo mundo consulta nas horas difíceis.',
  },
  {
    key: '🤝 Compadre de Ouro',
    label: '🤝 Compadre de Ouro — parceiro que todo mundo queria',
    description: 'Parceiro de verdade. O Compadre de Ouro está junto nas trincheiras, divide o peso sem reclamar e nunca abandona o time quando a coisa aperta. Ouro puro.',
  },
  {
    key: '🌵 Raiz da Equipe',
    label: '🌵 Raiz da Equipe — sustenta o time nas pedras',
    description: 'A Raiz da Equipe sustenta tudo debaixo da terra, sem precisar de aplausos. Mesmo quando o vento vem forte, o time fica de pé por causa dela. É a base que ninguém vê mas todo mundo sente.',
  },
  {
    key: '🎆 Fogueira Criativa',
    label: '🎆 Fogueira Criativa — ideias que iluminam',
    description: 'Onde a Fogueira Criativa chega, surgem ideias que ninguém tinha pensado. É aquela faísca que acende a imaginação do grupo inteiro e ilumina caminhos novos no escuro.',
  },
  {
    key: '🐓 Galo do Amanhecer',
    label: '🐓 Galo do Amanhecer — primeiro a chegar, último a desistir',
    description: 'O Galo do Amanhecer chega antes dos outros e sai depois. É dedicação sem placa, comprometimento sem precisar de palco. Quando o dia amanhece, ele já está no batente.',
  },
  {
    key: '☁️ Chuva Boa',
    label: '☁️ Chuva Boa — chega e já resolve tudo',
    description: 'A Chuva Boa chega na hora certa e resolve o que precisava ser resolvido. Sem alarde, sem tempestade — só aquela garoa certeira que faz tudo voltar a crescer.',
  },
];

export const PODERES: Record<string, string> = SUPERPODERES.reduce((acc, p) => {
  acc[p.key] = p.description;
  return acc;
}, {} as Record<string, string>);

export const CONFETTI_CORES = ['#D92B8A', '#F5F5F5', '#FFD700', '#FF6B35', '#9B59B6', '#4CAF50'];

export const BANNER_CORES = ['#D92B8A', '#F5F5F5', '#FFD700', '#FF6B35', '#4CAF50', '#9B59B6', '#051A30'];


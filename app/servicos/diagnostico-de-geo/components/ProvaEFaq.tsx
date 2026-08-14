// app/servicos/diagnostico-de-geo/components/ProvaEFaq.tsx
const ASSETS = '/servicos/diagnostico-de-geo/assets';

// 26 logos individuais com alpha. A lista é duplicada para o marquee não ter
// costura; a 2ª cópia é aria-hidden para o leitor de tela não repetir as 26
// marcas. WebP com PNG de fallback.
const CLIENTES = [
  { file: 'benegrip', alt: 'Benegrip', w: 160, h: 23 },
  { file: 'braze', alt: 'Braze', w: 103, h: 48 },
  { file: 'clevertap', alt: 'CleverTap', w: 131, h: 48 },
  { file: 'convenia', alt: 'Convenia', w: 138, h: 48 },
  { file: 'direcional', alt: 'Direcional', w: 160, h: 20 },
  { file: 'engov', alt: 'Engov', w: 125, h: 48 },
  { file: 'falconi', alt: 'Falconi', w: 160, h: 40 },
  { file: 'neosaldina', alt: 'Neosaldina', w: 160, h: 23 },
  { file: 'inter', alt: 'Inter', w: 160, h: 41 },
  { file: 'itau', alt: 'Itaú', w: 48, h: 48 },
  { file: 'lg-lugar-de-gente', alt: 'LG lugar de gente', w: 142, h: 42 },
  { file: 'linkana', alt: 'Linkana', w: 160, h: 26 },
  { file: 'simples-vet', alt: 'SimplesVet', w: 160, h: 34 },
  { file: 'buscopan', alt: 'Buscopan', w: 157, h: 48 },
  { file: 'safetec', alt: 'Safetec', w: 160, h: 38 },
  { file: 'c6-bank', alt: 'C6 Bank', w: 160, h: 32 },
  { file: 'mantecorp-skincare', alt: 'Mantecorp Skincare', w: 138, h: 48 },
  { file: 'mapa-hds', alt: 'Mapa HDS', w: 160, h: 35 },
  { file: 'riva', alt: 'Riva', w: 160, h: 48 },
  { file: 'supersonic', alt: 'Supersonic', w: 160, h: 32 },
  { file: 'tamarine', alt: 'Tamarine', w: 160, h: 27 },
  { file: 'ticket', alt: 'Ticket', w: 95, h: 48 },
  { file: 'twilio', alt: 'Twilio', w: 160, h: 48 },
  { file: 'fasthotel', alt: 'FastHotel', w: 160, h: 40 },
  { file: 'workvivo', alt: 'Workvivo by Zoom', w: 160, h: 48 },
  { file: 'neo-quimica', alt: 'Neo Química', w: 105, h: 48 },
];

function ClientesRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="pp-marquee__row" aria-label={hidden ? undefined : 'Clientes da Papoca'} aria-hidden={hidden ? 'true' : undefined}>
      {CLIENTES.map((c) => (
        <li key={c.file}>
          <picture>
            <source srcSet={`${ASSETS}/clientes/${c.file}.webp`} type="image/webp" />
            <img
              src={`${ASSETS}/clientes/${c.file}.png`}
              alt={hidden ? '' : c.alt}
              width={c.w}
              height={c.h}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </li>
      ))}
    </ul>
  );
}

const FAQS = [
  {
    id: 'faq-p0',
    q: 'O que é, na prática, um Diagnóstico de GEO da Papoca?',
    a: 'Avaliamos como ChatGPT, Gemini, Claude, Perplexity e outras IAs respondem sobre a sua marca e a do seu mercado, antes do seu cliente perguntar. Não é um print isolado: é uma metodologia própria, com centenas de prompts, mapeamento de sites de influência, sentimento e concorrência. O resultado final é um plano de ação priorizado, não só um relatório de dados.',
  },
  {
    id: 'faq-p1',
    q: 'Por que vocês rodam dezenas de milhares de execuções em vez de um prompt único?',
    a: 'Porque respostas de IA não são determinísticas. A mesma pergunta pode gerar respostas diferentes a cada execução. Um print captura só uma versão isolada da realidade. Por isso testamos 70+ prompts, cada um rodado 100 vezes em 8 modelos de IA diferentes: mais de 50 mil execuções por diagnóstico. É a diferença entre achismo e dado estatisticamente confiável.',
  },
  {
    id: 'faq-p2',
    q: 'Em quanto tempo aparecem resultados?',
    a: 'Como em SEO, os resultados são progressivos e aparecem conforme os conteúdos são criados, publicados e indexados pelas IAs. O prazo varia por tipo de modelo: IAs com busca em tempo real (como o AI Overview do Google) respondem em semanas; modelos com base de conhecimento estática (ChatGPT, Gemini e Claude em suas versões conversacionais) atualizam a cada 6 a 12 meses, então o horizonte ali é de meses.',
  },
  {
    id: 'faq-p3',
    q: 'Vocês cobrem meu país e idioma?',
    a: 'Sim. Nossa metodologia cobre mais de 120 países e 36 idiomas, configurados pelo par país + idioma do seu mercado-alvo. Isso garante que o diagnóstico reflita como a IA responde pro seu público real, não uma média global genérica.',
  },
  {
    id: 'faq-p4',
    q: 'O que eu preciso fazer da minha parte?',
    a: 'Pouco. Você valida o produto ou serviço que será o foco do diagnóstico e participa da apresentação final dos resultados. Toda a coleta, análise e construção do plano de ação é com a Papoca. O Diagnóstico ainda pode oferecer insights valiosos para outros times como Produto, Assessoria de Imprensa, Customer Success, entre outros.',
  },
  {
    id: 'faq-p5',
    q: 'O diagnóstico pode virar uma parceria contínua?',
    a: 'Sim. Pode ser contratado de forma isolada ou como ponto de partida de uma estratégia contínua de SEO e GEO, onde o relatório vira o mapa que guia toda a execução dos meses seguintes.',
  },
];

export function ProvaEFaq() {
  return (
    <section className="pp-s--prova">
      {/* Só a prova social recebe o gradiente. O "11 anos" e o FAQ ficam no fundo
          liso, fora deste bloco. */}
      <div className="pp-prova">
        <div className="pp-wrap">
          <h2 className="pp-h2">
            Quem já é Papoca<span className="pp-rosa">.</span>
          </h2>
          <p className="pp-sub">O que dizem os clientes que confiam na Papoca.</p>

          <div className="pp-clients">
            <div className="pp-marquee pp-marquee--clientes">
              <ClientesRow />
              <ClientesRow hidden />
            </div>
          </div>

          <div className="pp-carousel">
            <div className="pp-carousel__track" id="pp-track">
              <figure className="pp-quote">
                <p>
                  O Doug construiu uma trajetória marcante que vai do Brasil ao Reino Unido, e confiou na Papoca ao
                  longo de sua passagem por empresas como <b>Agendor, Zendesk, Intercom e Stenn.</b>
                </p>
                <figcaption className="pp-quote__who">
                  <img src={`${ASSETS}/avatar-1.jpg`} alt="" width={48} height={48} loading="lazy" />
                  <span>
                    <strong>Douglas da Silva</strong>
                    <span>Gerente de marketing sênior</span>
                  </span>
                </figcaption>
              </figure>
              <figure className="pp-quote">
                <p>
                  A Dani liderou equipes de marketing em três empresas diferentes, <b>Siteware, Blaq e Convenia</b>, e
                  chamou a Papoca pra apoiá-la em todas elas.
                </p>
                <figcaption className="pp-quote__who">
                  <img src={`${ASSETS}/avatar-2.jpg`} alt="" width={48} height={48} loading="lazy" />
                  <span>
                    <strong>Daniella Doyle</strong>
                    <span>Gerente de marketing sênior</span>
                  </span>
                </figcaption>
              </figure>
              <figure className="pp-quote">
                {/* TODO: texto cortado no export do Figma. Completar. */}
                <p>
                  O Hugo iniciou <b>[texto cortado no export]</b> colaborar com <b>[…]</b> nos convidou <b>[…]</b>{' '}
                  <b>internacionais</b>.
                </p>
                <figcaption className="pp-quote__who">
                  <img src={`${ASSETS}/avatar-3.jpg`} alt="" width={48} height={48} loading="lazy" />
                  <span>
                    <strong>Hugo Genaro</strong>
                    <span>Head de marketing</span>
                  </span>
                </figcaption>
              </figure>
            </div>
            <div className="pp-dots" id="pp-dots"></div>
          </div>
        </div>
      </div>

      {/* Faixa de largura total que carrega o gradiente atrás do card "11 anos". */}
      <div className="pp-anos-faixa">
        <div className="pp-wrap">
          <div className="pp-anos">
            <h2 className="pp-h2">
              11 anos de mercado como <span className="pp-rosa">agência boutique</span>.
            </h2>
            <p className="pp-anos__sub">
              <b>
                Foco em <span className="pp-rosa">SEO</span> e <span className="pp-rosa">GEO</span>
              </b>
              , não em fazer um pouco de tudo.
            </p>
            <div className="pp-anos__grid">
              <div className="pp-anos__it">
                <span className="pp-anos__ic">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path
                      d="M36 38.3333L30.875 33.25C30.375 33.5556 29.8403 33.7847 29.2708 33.9375C28.7014 34.0903 28.1111 34.1667 27.5 34.1667C25.6667 34.1667 24.0972 33.5139 22.7917 32.2083C21.4861 30.9028 20.8333 29.3333 20.8333 27.5C20.8333 25.6667 21.4861 24.0972 22.7917 22.7917C24.0972 21.4861 25.6667 20.8333 27.5 20.8333C29.3333 20.8333 30.9028 21.4861 32.2083 22.7917C33.5139 24.0972 34.1667 25.6667 34.1667 27.5C34.1667 28.1389 34.0833 28.7431 33.9167 29.3125C33.75 29.8819 33.5139 30.4167 33.2083 30.9167L38.3333 36L36 38.3333ZM9.16667 34.1667C7.33333 34.1667 5.76389 33.5139 4.45833 32.2083C3.15278 30.9028 2.5 29.3333 2.5 27.5C2.5 25.6667 3.15278 24.0972 4.45833 22.7917C5.76389 21.4861 7.33333 20.8333 9.16667 20.8333C11 20.8333 12.5694 21.4861 13.875 22.7917C15.1806 24.0972 15.8333 25.6667 15.8333 27.5C15.8333 29.3333 15.1806 30.9028 13.875 32.2083C12.5694 33.5139 11 34.1667 9.16667 34.1667ZM9.16667 30.8333C10.0833 30.8333 10.8681 30.5069 11.5208 29.8542C12.1736 29.2014 12.5 28.4167 12.5 27.5C12.5 26.5833 12.1736 25.7986 11.5208 25.1458C10.8681 24.4931 10.0833 24.1667 9.16667 24.1667C8.25 24.1667 7.46528 24.4931 6.8125 25.1458C6.15972 25.7986 5.83333 26.5833 5.83333 27.5C5.83333 28.4167 6.15972 29.2014 6.8125 29.8542C7.46528 30.5069 8.25 30.8333 9.16667 30.8333ZM27.5 30.8333C28.4167 30.8333 29.2014 30.5069 29.8542 29.8542C30.5069 29.2014 30.8333 28.4167 30.8333 27.5C30.8333 26.5833 30.5069 25.7986 29.8542 25.1458C29.2014 24.4931 28.4167 24.1667 27.5 24.1667C26.5833 24.1667 25.7986 24.4931 25.1458 25.1458C24.4931 25.7986 24.1667 26.5833 24.1667 27.5C24.1667 28.4167 24.4931 29.2014 25.1458 29.8542C25.7986 30.5069 26.5833 30.8333 27.5 30.8333ZM9.16667 15.8333C7.33333 15.8333 5.76389 15.1806 4.45833 13.875C3.15278 12.5694 2.5 11 2.5 9.16667C2.5 7.33333 3.15278 5.76389 4.45833 4.45833C5.76389 3.15278 7.33333 2.5 9.16667 2.5C11 2.5 12.5694 3.15278 13.875 4.45833C15.1806 5.76389 15.8333 7.33333 15.8333 9.16667C15.8333 11 15.1806 12.5694 13.875 13.875C12.5694 15.1806 11 15.8333 9.16667 15.8333ZM27.5 15.8333C25.6667 15.8333 24.0972 15.1806 22.7917 13.875C21.4861 12.5694 20.8333 11 20.8333 9.16667C20.8333 7.33333 21.4861 5.76389 22.7917 4.45833C24.0972 3.15278 25.6667 2.5 27.5 2.5C29.3333 2.5 30.9028 3.15278 32.2083 4.45833C33.5139 5.76389 34.1667 7.33333 34.1667 9.16667C34.1667 11 33.5139 12.5694 32.2083 13.875C30.9028 15.1806 29.3333 15.8333 27.5 15.8333ZM9.16667 12.5C10.0833 12.5 10.8681 12.1736 11.5208 11.5208C12.1736 10.8681 12.5 10.0833 12.5 9.16667C12.5 8.25 12.1736 7.46528 11.5208 6.8125C10.8681 6.15972 10.0833 5.83333 9.16667 5.83333C8.25 5.83333 7.46528 6.15972 6.8125 6.8125C6.15972 7.46528 5.83333 8.25 5.83333 9.16667C5.83333 10.0833 6.15972 10.8681 6.8125 11.5208C7.46528 12.1736 8.25 12.5 9.16667 12.5ZM27.5 12.5C28.4167 12.5 29.2014 12.1736 29.8542 11.5208C30.5069 10.8681 30.8333 10.0833 30.8333 9.16667C30.8333 8.25 30.5069 7.46528 29.8542 6.8125C29.2014 6.15972 28.4167 5.83333 27.5 5.83333C26.5833 5.83333 25.7986 6.15972 25.1458 6.8125C24.4931 7.46528 24.1667 8.25 24.1667 9.16667C24.1667 10.0833 24.4931 10.8681 25.1458 11.5208C25.7986 12.1736 26.5833 12.5 27.5 12.5Z"
                      fill="#F9F9F9"
                    />
                  </svg>
                </span>
                <h3>Metodologia própria</h3>
                <p>
                  Desenvolvida internamente, testada e validada. Não é terceirizada, não é plugin de ferramenta
                  genérica. É dado analisado com profundidade pra trazer clareza e direcionamento.
                </p>
              </div>

              <div className="pp-anos__it">
                <span className="pp-anos__ic">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path
                      d="M1.66406 33.3327V28.666C1.66406 27.7216 1.90712 26.8535 2.39323 26.0618C2.87934 25.2702 3.52517 24.666 4.33073 24.2493C6.05295 23.3882 7.80295 22.7424 9.58073 22.3118C11.3585 21.8813 13.1641 21.666 14.9974 21.666C16.8307 21.666 18.6363 21.8813 20.4141 22.3118C22.1918 22.7424 23.9418 23.3882 25.6641 24.2493C26.4696 24.666 27.1155 25.2702 27.6016 26.0618C28.0877 26.8535 28.3307 27.7216 28.3307 28.666V33.3327H1.66406ZM31.6641 33.3327V28.3327C31.6641 27.1105 31.3238 25.9368 30.6432 24.8118C29.9627 23.6868 28.9974 22.7216 27.7474 21.916C29.1641 22.0827 30.4974 22.3674 31.7474 22.7702C32.9974 23.173 34.1641 23.666 35.2474 24.2493C36.2474 24.8049 37.0113 25.423 37.5391 26.1035C38.0668 26.7841 38.3307 27.5271 38.3307 28.3327V33.3327H31.6641ZM10.2891 18.041C8.98351 16.7355 8.33073 15.166 8.33073 13.3327C8.33073 11.4993 8.98351 9.9299 10.2891 8.62435C11.5946 7.31879 13.1641 6.66602 14.9974 6.66602C16.8307 6.66602 18.4002 7.31879 19.7057 8.62435C21.0113 9.9299 21.6641 11.4993 21.6641 13.3327C21.6641 15.166 21.0113 16.7355 19.7057 18.041C18.4002 19.3466 16.8307 19.9993 14.9974 19.9993C13.1641 19.9993 11.5946 19.3466 10.2891 18.041ZM29.7057 18.041C28.4002 19.3466 26.8307 19.9993 24.9974 19.9993C24.6918 19.9993 24.303 19.9646 23.8307 19.8952C23.3585 19.8257 22.9696 19.7493 22.6641 19.666C23.4141 18.7771 23.9905 17.791 24.3932 16.7077C24.796 15.6243 24.9974 14.4993 24.9974 13.3327C24.9974 12.166 24.796 11.041 24.3932 9.95768C23.9905 8.87435 23.4141 7.88824 22.6641 6.99935C23.053 6.86046 23.4418 6.77018 23.8307 6.72852C24.2196 6.68685 24.6085 6.66602 24.9974 6.66602C26.8307 6.66602 28.4002 7.31879 29.7057 8.62435C31.0113 9.9299 31.6641 11.4993 31.6641 13.3327C31.6641 15.166 31.0113 16.7355 29.7057 18.041ZM4.9974 29.9993H24.9974V28.666C24.9974 28.3605 24.921 28.0827 24.7682 27.8327C24.6155 27.5827 24.4141 27.3882 24.1641 27.2493C22.6641 26.4993 21.1502 25.9368 19.6224 25.5618C18.0946 25.1868 16.553 24.9993 14.9974 24.9993C13.4418 24.9993 11.9002 25.1868 10.3724 25.5618C8.84462 25.9368 7.33073 26.4993 5.83073 27.2493C5.58073 27.3882 5.37934 27.5827 5.22656 27.8327C5.07378 28.0827 4.9974 28.3605 4.9974 28.666V29.9993ZM17.3516 15.6868C18.0043 15.0341 18.3307 14.2493 18.3307 13.3327C18.3307 12.416 18.0043 11.6313 17.3516 10.9785C16.6988 10.3257 15.9141 9.99935 14.9974 9.99935C14.0807 9.99935 13.296 10.3257 12.6432 10.9785C11.9905 11.6313 11.6641 12.416 11.6641 13.3327C11.6641 14.2493 11.9905 15.0341 12.6432 15.6868C13.296 16.3396 14.0807 16.666 14.9974 16.666C15.9141 16.666 16.6988 16.3396 17.3516 15.6868Z"
                      fill="#F9F9F9"
                    />
                  </svg>
                </span>
                <h3>Time sênior direto no projeto</h3>
                <p>
                  Sem camadas de agência grande entre você e quem entende do assunto. Cada cliente tem um time de
                  gerente, coordenador e especialistas alocados diretamente no projeto.
                </p>
              </div>

              <div className="pp-anos__it">
                <span className="pp-anos__ic">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                    <path
                      d="M9.9974 38.3327H4.9974C4.08073 38.3327 3.29601 38.0063 2.64323 37.3535C1.99045 36.7007 1.66406 35.916 1.66406 34.9994V29.9993H4.9974V34.9994H9.9974V38.3327ZM29.9974 38.3327V34.9994H34.9974V29.9993H38.3307V34.9994C38.3307 35.916 38.0043 36.7007 37.3516 37.3535C36.6988 38.0063 35.9141 38.3327 34.9974 38.3327H29.9974ZM19.9974 30.8327C16.6641 30.8327 13.6432 29.8466 10.9349 27.8743C8.22656 25.9021 6.2474 23.2771 4.9974 19.9993C6.2474 16.7216 8.22656 14.0966 10.9349 12.1243C13.6432 10.1521 16.6641 9.16602 19.9974 9.16602C23.3307 9.16602 26.3516 10.1521 29.0599 12.1243C31.7682 14.0966 33.7474 16.7216 34.9974 19.9993C33.7474 23.2771 31.7682 25.9021 29.0599 27.8743C26.3516 29.8466 23.3307 30.8327 19.9974 30.8327ZM19.9974 27.4993C22.4418 27.4993 24.678 26.8327 26.7057 25.4993C28.7335 24.166 30.2891 22.3327 31.3724 19.9993C30.2891 17.666 28.7335 15.8327 26.7057 14.4993C24.678 13.166 22.4418 12.4993 19.9974 12.4993C17.553 12.4993 15.3168 13.166 13.2891 14.4993C11.2613 15.8327 9.70573 17.666 8.6224 19.9993C9.70573 22.3327 11.2613 24.166 13.2891 25.4993C15.3168 26.8327 17.553 27.4993 19.9974 27.4993ZM19.9974 25.8327C21.6085 25.8327 22.9835 25.2632 24.1224 24.1243C25.2613 22.9855 25.8307 21.6105 25.8307 19.9993C25.8307 18.3882 25.2613 17.0132 24.1224 15.8743C22.9835 14.7355 21.6085 14.166 19.9974 14.166C18.3863 14.166 17.0113 14.7355 15.8724 15.8743C14.7335 17.0132 14.1641 18.3882 14.1641 19.9993C14.1641 21.6105 14.7335 22.9855 15.8724 24.1243C17.0113 25.2632 18.3863 25.8327 19.9974 25.8327ZM19.9974 22.4993C19.303 22.4993 18.7127 22.2563 18.2266 21.7702C17.7405 21.2841 17.4974 20.6938 17.4974 19.9993C17.4974 19.3049 17.7405 18.7146 18.2266 18.2285C18.7127 17.7424 19.303 17.4993 19.9974 17.4993C20.6918 17.4993 21.2821 17.7424 21.7682 18.2285C22.2543 18.7146 22.4974 19.3049 22.4974 19.9993C22.4974 20.6938 22.2543 21.2841 21.7682 21.7702C21.2821 22.2563 20.6918 22.4993 19.9974 22.4993ZM1.66406 9.99935V4.99935C1.66406 4.08268 1.99045 3.29796 2.64323 2.64518C3.29601 1.9924 4.08073 1.66602 4.9974 1.66602H9.9974V4.99935H4.9974V9.99935H1.66406ZM34.9974 9.99935V4.99935H29.9974V1.66602H34.9974C35.9141 1.66602 36.6988 1.9924 37.3516 2.64518C38.0043 3.29796 38.3307 4.08268 38.3307 4.99935V9.99935H34.9974Z"
                      fill="#F9F9F9"
                    />
                  </svg>
                </span>
                <h3>Foco real no que fazemos</h3>
                <p>
                  SEO e GEO, especificamente. Não somos, nem pretendemos ser uma agência &quot;faz tudo&quot;. Somos
                  experts no que fazemos por ter profundidade, e queremos continuar assim.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pp-wrap">
        <div className="pp-faq">
          <h2 className="pp-h2">
            Perguntas frequentes<span style={{ color: 'var(--pp-preto)' }}>:</span>
          </h2>
          <p className="pp-faq__sub">Tire suas dúvidas sobre o diagnóstico de GEO da Papoca.</p>
          <div className="pp-faq__list">
            {FAQS.map((f) => (
              <div className="pp-faq__it" data-open="false" key={f.id}>
                <h3 className="pp-faq__q">
                  <button className="pp-faq__bt" type="button" aria-expanded="false" aria-controls={f.id}>
                    <span>{f.q}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path className="pp-ic-v" d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </h3>
                <div className="pp-faq__pn" id={f.id}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

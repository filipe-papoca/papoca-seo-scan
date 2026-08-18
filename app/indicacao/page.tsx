import Image from 'next/image';
import Link from 'next/link';
import './styles.css';
import { EmailCard } from './components/EmailCard';

const MAILTO_LINK =
  'mailto:albert@agenciapapoca.com.br?subject=Apresenta%C3%A7%C3%A3o%3A%20%5BNome%5D%20e%20Albert%20da%20Papoca&body=Oi%2C%20Albert%21%20Tudo%20bem%3F%0A%0AQueria%20te%20apresentar%20o%2Fa%20%5BNome%5D%2C%20%5Bcargo%5D%20na%20%5BEmpresa%5D.%20%5BUma%20frase%20sobre%20a%20empresa%20ou%20sobre%20por%20que%20faz%20sentido.%5D%0A%0A%5BNome%5D%2C%20a%20Papoca%20%C3%A9%20a%20ag%C3%AAncia%20de%20GEO%2C%20SEO%20e%20conte%C3%BAdo%20que%20comentei%20com%20voc%C3%AA.%20Deixo%20voc%C3%AAs%20dois%20em%20contato.%0A%0AAbra%C3%A7o%2C';

export default function IndicacaoPapocaPage() {
  return (
    <div className="ind-root">
      {/* ───── 1. HERO ───── */}
      <section className="ind-hero" aria-label="Apresentação do Programa de Indicação">
        <div className="ind-wrap">
          <Image
            src="/indicacao/assets/logo-papoca-white.svg"
            alt="Papoca"
            width={50}
            height={45}
            priority
            className="ind-hero-logo"
          />
          <div className="ind-hero-kicker">Programa de Indicação</div>
          <h1 className="ind-hero-title">Que tal indicar a Papoca?</h1>
          <p className="ind-hero-lead">
            Você recebe{' '}
            <span className="ind-hero-lead-highlight">
              5% de tudo que sua indicação investir com a Papoca
            </span>
            , pelos primeiros 24 meses de contrato.
          </p>

          <div className="ind-hero-grid">
            <div className="ind-hero-card">
              <div className="ind-hero-card-kicker">Sua indicação ganha</div>
              <p className="ind-hero-card-p">
                Conhece a única agência boutique de GEO, SEO e Conteúdo do Brasil.
              </p>
            </div>
            <div className="ind-hero-card">
              <div className="ind-hero-card-kicker">Você ganha</div>
              <p className="ind-hero-card-p">
                5% de cada pagamento que o cliente indicado fizer, por até 24 meses.
              </p>
            </div>
            <div className="ind-hero-card">
              <div className="ind-hero-card-kicker">A Papoca ganha</div>
              <p className="ind-hero-card-p">
                Continua crescendo pelo boca a boca, por quem é fã do nosso trabalho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 2. COMO INDICAR ───── */}
      <section className="ind-section-how" aria-label="Como indicar um cliente">
        <div className="ind-wrap">
          <h2 className="ind-section-title">Quer indicar? É fácil, basta mandar um e-mail.</h2>
          <p className="ind-section-desc">
            Você faz a apresentação por e-mail e a Papoca cuida do resto. Conversamos com o indicado e
            seguimos nosso processo de venda consultivo para confirmar que realmente podemos ajudar. Se
            a indicação se tornar cliente, você passa a receber comissão por até 24 meses.
          </p>

          <ol className="ind-steps-list">
            <li className="ind-step-item">
              <div className="ind-step-num">1</div>
              <div>
                <h3 className="ind-step-title">Fale com a pessoa indicada</h3>
                <p className="ind-step-p">
                  A indicação começa com o consentimento. Busque entender se os desafios dela são
                  relacionados a GEO, SEO e Conteúdo e que podemos apoiá-la.
                </p>
              </div>
            </li>

            <li className="ind-step-item">
              <div className="ind-step-num">2</div>
              <div>
                <h3 className="ind-step-title">Faça a ponte por e-mail, com ela em cópia</h3>
                <p className="ind-step-p">
                  Envie um e-mail para{' '}
                  <a href="mailto:albert@agenciapapoca.com.br">albert@agenciapapoca.com.br</a> (sócio na
                  Papoca, responsável pelo comercial) apresentando as duas partes, com a pessoa
                  indicada em cópia.
                </p>
                <p className="ind-step-p ind-step-p-highlight">
                  É esse e-mail que registra a indicação no seu nome.
                </p>
                <p className="ind-step-p">
                  Não sabe direito o que escrever no e-mail? Use o modelo abaixo:
                </p>

                <EmailCard />
              </div>
            </li>

            <li className="ind-step-item">
              <div className="ind-step-num">3</div>
              <div>
                <h3 className="ind-step-title">Confirmamos se a indicação é elegível</h3>
                <p className="ind-step-p">
                  Em até 1 dia útil respondemos, apenas para você, dizendo se essa empresa é uma
                  indicação válida. Pode acontecer de já estarmos em conversa com a empresa através de
                  outro contato. Nesse caso o reforço da indicação é bem-vindo, mas sem comissão.
                </p>
              </div>
            </li>

            <li className="ind-step-item">
              <div className="ind-step-num">4</div>
              <div>
                <h3 className="ind-step-title">A Papoca conduz daqui</h3>
                <p className="ind-step-p">
                  Você não precisa vender nada nem entrar em reunião. Seguimos um processo de venda
                  consultivo, avaliando o contexto e os objetivos de cada indicação para confirmar se
                  podemos ou não ajudar. Ou seja, sempre avaliamos se há <i>fit</i> entre a indicação e a
                  Papoca.
                </p>
              </div>
            </li>

            <li className="ind-step-item">
              <div className="ind-step-num">5</div>
              <div>
                <h3 className="ind-step-title">Se fechar, você recebe todo mês</h3>
                <p className="ind-step-p">
                  5% de cada pagamento recebido, pelos primeiros 24 meses de contrato.
                </p>
              </div>
            </li>
          </ol>

          {/* Como a comissão funciona */}
          <div className="ind-comissao-block">
            <div className="ind-comissao-kicker">Como a comissão funciona</div>
            <div className="ind-comissao-grid">
              <div className="ind-comissao-card">
                <div className="ind-comissao-big">Você ganha 5%</div>
                <p className="ind-comissao-sub">
                  do investimento que sua indicação fizer com a Papoca
                </p>
              </div>
              <div className="ind-comissao-card">
                <div className="ind-comissao-big">Até 24 meses</div>
                <p className="ind-comissao-sub">
                  de comissão, contados do primeiro pagamento feito para a Papoca
                </p>
              </div>
            </div>
          </div>

          {/* Por que a indicação é por e-mail? */}
          <div className="ind-why-box">
            <div className="ind-why-kicker">Por que a indicação é por e-mail?</div>
            <div className="ind-why-items">
              <div className="ind-why-item">
                <span className="ind-why-arrow">→</span>
                <p className="ind-why-text">
                  A apresentação é o que faz a indicação funcionar. Quem chega apresentado por alguém
                  de confiança começa a conversa em outro contexto.
                </p>
              </div>
              <div className="ind-why-item">
                <span className="ind-why-arrow">→</span>
                <p className="ind-why-text">A data do e-mail é o seu registro.</p>
              </div>
              <div className="ind-why-item">
                <span className="ind-why-arrow">→</span>
                <p className="ind-why-text">
                  A Papoca não procura quem não sabe que vai ser procurado. Você fala com a pessoa antes;
                  o e-mail com ela em cópia confirma que ela quer conversar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 3. PRA QUEM INDICAR ───── */}
      <section className="ind-section-who" aria-label="Para quem indicar">
        <div className="ind-wrap">
          <h2 className="ind-section-title">Pra quem indicar?</h2>
          <p className="ind-section-desc" style={{ marginBottom: 0 }}>
            A Papoca é uma agência boutique, você já conhece, e por isso esse link chegou até você. Não
            atendemos todos os tipos de clientes, mas sua indicação provavelmente vai fazer sentido se
            a empresa indicada tem desafios em pelo menos uma dessas áreas:
          </p>

          <div className="ind-who-grid">
            <div className="ind-who-card">
              <h3 className="ind-who-card-title">GEO</h3>
              <p className="ind-who-card-desc">
                Quer descobrir se, e como, sua marca aparece nas respostas das IAs e ter um plano de
                melhoria embasado em dados.
              </p>
            </div>
            <div className="ind-who-card">
              <h3 className="ind-who-card-title">SEO</h3>
              <p className="ind-who-card-desc">
                Quer crescer no orgânico, superar concorrentes, ter estratégia e expertise para lidar
                com as mudanças do Google.
              </p>
            </div>
            <div className="ind-who-card">
              <h3 className="ind-who-card-title">Conteúdo</h3>
              <p className="ind-who-card-desc">
                Precisa produzir com qualidade e escala, de temas simples até complexos, se destacando
                da concorrência.
              </p>
            </div>
          </div>

          <p className="ind-section-desc" style={{ marginBottom: 0 }}>
            Se a empresa que você tem em mente tem pelo menos um desses desafios, provavelmente vale a
            apresentação.
          </p>
        </div>
      </section>

      {/* ───── 4. RESUMINDO ───── */}
      <section className="ind-section-summary" aria-label="Resumo das regras do programa">
        <div className="ind-wrap">
          <h2 className="ind-section-title">Resumindo</h2>
          <ol className="ind-summary-list">
            <li className="ind-summary-item">
              <span className="ind-summary-num">01</span>
              <p className="ind-summary-p">
                <strong>A indicação é a ponte por e-mail.</strong> Apresentação por e-mail com a pessoa
                em cópia é o único caminho do nosso programa de indicação.
              </p>
            </li>
            <li className="ind-summary-item">
              <span className="ind-summary-num">02</span>
              <p className="ind-summary-p">
                <strong>Toda ponte recebe um retorno (seja positivo ou negativo).</strong> Se a empresa
                já estiver em conversa com a Papoca, a indicação não gera comissão e você fica sabendo
                rapidamente.
              </p>
            </li>
            <li className="ind-summary-item">
              <span className="ind-summary-num">03</span>
              <p className="ind-summary-p">
                <strong>Se duas pessoas apresentarem a mesma empresa, vale a primeira ponte.</strong> A
                data do e-mail define a ordem. Não deixe para indicar amanhã quem você pode indicar hoje.
              </p>
            </li>
            <li className="ind-summary-item">
              <span className="ind-summary-num">04</span>
              <p className="ind-summary-p">
                <strong>A comissão acompanha o pagamento.</strong> Pagamos comissão sobre os valores
                efetivamente pagos pelo indicado à Papoca.
              </p>
            </li>
            <li className="ind-summary-item">
              <span className="ind-summary-num">05</span>
              <p className="ind-summary-p">
                <strong>A comissão acompanha o contrato.</strong> Se o cliente encerrar antes dos 24
                meses, a comissão encerra junto.
              </p>
            </li>
            <li className="ind-summary-item">
              <span className="ind-summary-num">06</span>
              <p className="ind-summary-p">
                <strong>Base de cálculo é o valor pago à Papoca</strong>, sem dedução de impostos, custos
                ou repasses.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ───── 5. CTA FINAL ───── */}
      <section className="ind-section-cta" aria-label="Faça uma indicação agora">
        <div className="ind-wrap">
          <h2 className="ind-section-title">Tem alguém em mente?</h2>
          <p className="ind-section-desc" style={{ marginBottom: '36px' }}>
            Fale com a pessoa e faça a apresentação por e-mail, com ela em cópia.
          </p>
          <a href={MAILTO_LINK} className="ind-cta-btn">
            Fazer uma apresentação <span style={{ fontSize: '20px' }}>→</span>
          </a>
          <p className="ind-cta-subtext">
            Quem responde é sempre o Albert, sócio executivo responsável pelo comercial.
          </p>
        </div>
      </section>

      {/* ───── 6. FOOTER ───── */}
      <footer className="ind-footer">
        <div className="ind-wrap ind-footer-inner">
          <Image
            src="/indicacao/assets/logo-papoca-white.svg"
            alt="Papoca"
            width={50}
            height={45}
            className="ind-footer-logo"
          />
          <p className="ind-footer-copy">
            Programa vigente a partir de agosto de 2026. Condições válidas para indicações feitas a
            partir dessa data.
          </p>
        </div>
      </footer>
    </div>
  );
}

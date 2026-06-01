import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend com a chave configurada
const resendApiKey = process.env.RESEND_CORREIO_ELEGANTE || process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Mapa de descrições dos superpoderes para uso no e-mail
const PODERES_DESC: Record<string, string> = {
  '🎯 Mira Certeira': 'Quem tem Mira Certeira nunca deixa prazo escapar. É aquela pessoa que você sabe que pode contar — quando ela diz que entrega, entrega.',
  '🌟 Estrela do Forró': 'Tem gente que entra numa sala e muda o clima inteiro. A Estrela do Forró é assim: traz energia, anima a galera e transforma até a reunião mais pesada num baile.',
  '🧠 Sábio do Sertão': 'O Sábio do Sertão tem resposta pra tudo — e quando não tem, vai atrás até achar. É a enciclopédia viva do time, a referência que todo mundo consulta nas horas difíceis.',
  '🤝 Compadre de Ouro': 'Parceiro de verdade. O Compadre de Ouro está junto nas trincheiras, divide o peso sem reclamar e nunca abandona o time quando a coisa aperta.',
  '🌵 Raiz da Equipe': 'A Raiz da Equipe sustenta tudo debaixo da terra, sem precisar de aplausos. Mesmo quando o vento vem forte, o time fica de pé por causa dela.',
  '🎆 Fogueira Criativa': 'Onde a Fogueira Criativa chega, surgem ideias que ninguém tinha pensado. É aquela faísca que acende a imaginação do grupo inteiro e ilumina caminhos novos no escuro.',
  '🐓 Galo do Amanhecer': 'O Galo do Amanhecer chega antes dos outros e sai depois. É dedicação sem placa, comprometimento sem precisar de palco. Quando o dia amanhece, ele já está no batente.',
  '☁️ Chuva Boa': 'A Chuva Boa chega na hora certa e resolve o que precisava ser resolvido. Sem alarde, sem tempestade — só aquela garoa certeira que faz tudo voltar a crescer.',
};

export async function POST(request: Request) {
  try {
    if (!resend) {
      console.error('Resend API key is not configured.');
      return NextResponse.json(
        { error: 'Serviço de e-mail não configurado no servidor (falta API Key).' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { to, de, para, qual, msg } = body;

    // Validação básica
    if (!to || !para || !qual || !msg) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes: para, email destinatário, superpoder e elogio.' },
        { status: 400 }
      );
    }

    const remetente = de?.trim() || 'Alguém especial';
    const poderDescricao = PODERES_DESC[qual] || '';

    // HTML do e-mail com design premium e estilo Festa Junina / Nordestino
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Você recebeu um Correio Elegante!</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #051A30;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              color: #f5f5f5;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              width: 100%;
              table-layout: fixed;
              background-color: #051A30;
              padding: 40px 20px;
            }
            .container {
              max-width: 550px;
              margin: 0 auto;
              background-color: #061e36;
              border: 2px solid #FFD700;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            .header-banner {
              background-color: #9B1060;
              text-align: center;
              padding: 25px 20px;
              border-bottom: 2px solid #FF6B35;
              position: relative;
            }
            .header-banner h1 {
              margin: 0;
              color: #FFD700;
              font-size: 28px;
              letter-spacing: 1.5px;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
            }
            .header-banner p {
              margin: 5px 0 0 0;
              color: #f5f5f5;
              font-size: 14px;
              opacity: 0.85;
            }
            .band-preview {
              background-color: #FFD700;
              height: 6px;
              font-size: 0;
              line-height: 0;
            }
            .content {
              padding: 35px 30px;
              text-align: center;
            }
            .emoji-intro {
              font-size: 48px;
              margin-bottom: 20px;
            }
            .card-info {
              margin-bottom: 25px;
              font-size: 18px;
              line-height: 1.5;
              color: #ffffff;
            }
            .card-info .highlight {
              color: #FF5EA8;
              font-weight: bold;
            }
            .message-box {
              background-color: #051A30;
              border-left: 4px solid #FF5EA8;
              border-radius: 4px;
              padding: 20px;
              margin: 25px 0;
              text-align: left;
              font-style: italic;
              font-size: 16px;
              line-height: 1.6;
              color: #e2e8f0;
            }
            .power-box {
              background: linear-gradient(135deg, rgba(217,43,138,0.1) 0%, rgba(5,26,48,0.3) 100%);
              border: 1px solid rgba(255, 215, 0, 0.3);
              border-radius: 8px;
              padding: 15px;
              margin: 25px 0;
              text-align: left;
            }
            .power-title {
              font-size: 16px;
              font-weight: bold;
              color: #FFD700;
              margin-bottom: 5px;
            }
            .power-desc {
              font-size: 13px;
              line-height: 1.5;
              color: #cbd5e1;
            }
            .footer {
              background-color: #041324;
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: rgba(245, 245, 245, 0.6);
              border-top: 1px solid rgba(255, 255, 255, 0.05);
            }
            .footer a {
              color: #FF5EA8;
              text-decoration: none;
            }
            .btn-cta {
              display: inline-block;
              background-color: #E02D8C;
              color: #ffffff !important;
              text-decoration: none;
              font-weight: bold;
              padding: 12px 30px;
              border-radius: 25px;
              margin-top: 15px;
              box-shadow: 0 4px 10px rgba(224, 45, 140, 0.3);
              transition: all 0.2s ease;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header-banner">
                <h1>💌 Correio Elegante</h1>
                <p>Festa Junina da Papoca Circus 🎪</p>
              </div>
              <div class="band-preview"></div>
              
              <div class="content">
                <div class="emoji-intro">🌵 🌟 🍿</div>
                
                <div class="card-info">
                  Olá, <span class="highlight">${para}</span>!<br>
                  Você acabou de receber um <strong>Correio Elegante</strong> enviado com muito carinho por <span class="highlight">${remetente}</span>.
                </div>
                
                <div class="message-box">
                  "${msg}"
                </div>
                
                <div class="power-box">
                  <div class="power-title">${qual}</div>
                  ${poderDescricao ? `<div class="power-desc">${poderDescricao}</div>` : ''}
                </div>

                <a href="https://papoca.agency" target="_blank" class="btn-cta">Visitar a Papoca</a>
              </div>
              
              <div class="footer">
                Enviado automaticamente pelo sistema de Correio Elegante da Festa Junina da Papoca.<br>
                Quer enviar uma cartinha também? <a href="https://papoca.agency" target="_blank">Clique aqui</a>.
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Dispara o e-mail usando o Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Correio Elegante Papoca <onboarding@resend.dev>';
    
    const data = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: `💌 Correio Elegante de ${remetente}!`,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno do servidor ao enviar e-mail.' },
      { status: 500 }
    );
  }
}

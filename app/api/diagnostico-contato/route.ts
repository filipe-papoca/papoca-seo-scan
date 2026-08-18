import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializa o Resend com a chave configurada
const resendApiKey = process.env.RESEND_API_KEY || process.env.RESEND_CORREIO_ELEGANTE;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Destinatário do lead (Albert / Comercial Papoca)
const DESTINATARIOS = (process.env.DIAGNOSTICO_LEAD_EMAIL || 'albert@agenciapapoca.com.br')
  .split(',')
  .map((e) => e.trim());

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, empresa, cargo } = body;

    // Validação de campos obrigatórios
    if (!nome || !email || !empresa || !cargo) {
      return NextResponse.json(
        { error: 'Por favor, preencha todos os campos obrigatórios.' },
        { status: 400 }
      );
    }

    // Validação básica de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Por favor, informe um e-mail corporativo válido.' },
        { status: 400 }
      );
    }

    // Data e hora de envio formatadas para o fuso de Brasília
    const dataHora = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Novo Lead: Diagnóstico de GEO</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #F9F9F9;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              color: #191919;
              -webkit-font-smoothing: antialiased;
            }
            .wrapper {
              width: 100%;
              table-layout: fixed;
              background-color: #F9F9F9;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #FFFFFF;
              border: 1px solid #E4E4E4;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            }
            .header {
              background-color: #051A30;
              padding: 30px 32px;
              color: #FFFFFF;
            }
            .header h1 {
              margin: 0 0 8px;
              font-size: 22px;
              font-weight: 700;
              color: #FFFFFF;
            }
            .badge {
              display: inline-block;
              background-color: #D92B8A;
              color: #FFFFFF;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              padding: 4px 10px;
              border-radius: 4px;
            }
            .content {
              padding: 32px;
            }
            .lead-grid {
              margin: 20px 0;
              border: 1px solid #EDEDED;
              border-radius: 6px;
              overflow: hidden;
            }
            .lead-row {
              display: flex;
              border-bottom: 1px solid #EDEDED;
              padding: 14px 18px;
            }
            .lead-row:last-child {
              border-bottom: none;
            }
            .lead-row:nth-child(even) {
              background-color: #FAFAFA;
            }
            .lead-label {
              width: 140px;
              font-weight: 600;
              font-size: 14px;
              color: #5D5D5D;
            }
            .lead-value {
              flex: 1;
              font-size: 15px;
              font-weight: 500;
              color: #191919;
            }
            .lead-value a {
              color: #D92B8A;
              text-decoration: none;
            }
            .footer {
              background-color: #FAFAFA;
              padding: 20px 32px;
              font-size: 12px;
              color: #888888;
              border-top: 1px solid #E4E4E4;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <span class="badge">Novo Contato</span>
                <h1>🎯 Solicitação de Diagnóstico de GEO</h1>
                <p style="margin: 0; font-size: 14px; color: #C9C9C9;">Lead capturado através da landing page oficial.</p>
              </div>
              
              <div class="content">
                <p style="font-size: 16px; margin: 0 0 20px; line-height: 1.5;">
                  Um novo lead solicitou uma conversa para iniciar o <strong>Diagnóstico de GEO</strong>:
                </p>
                
                <div class="lead-grid">
                  <div class="lead-row">
                    <div class="lead-label">👤 Nome:</div>
                    <div class="lead-value"><strong>${nome}</strong></div>
                  </div>
                  <div class="lead-row">
                    <div class="lead-label">✉️ E-mail:</div>
                    <div class="lead-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="lead-row">
                    <div class="lead-label">🏢 Empresa:</div>
                    <div class="lead-value"><strong>${empresa}</strong></div>
                  </div>
                  <div class="lead-row">
                    <div class="lead-label">💼 Cargo / Área:</div>
                    <div class="lead-value">${cargo}</div>
                  </div>
                  <div class="lead-row">
                    <div class="lead-label">🕒 Data e Hora:</div>
                    <div class="lead-value">${dataHora}</div>
                  </div>
                </div>

                <div style="margin-top: 24px; padding: 16px; background-color: #FFF0F7; border-left: 4px solid #D92B8A; border-radius: 4px;">
                  <p style="margin: 0; font-size: 13.5px; color: #301744; line-height: 1.4;">
                    💡 <em>Dica: Você pode responder diretamente a este e-mail para falar com ${nome} (${email}).</em>
                  </p>
                </div>
              </div>
              
              <div class="footer">
                Enviado automaticamente pela Landing Page de Diagnóstico de GEO da Papoca.<br>
                Origem: <code>/servicos/diagnostico-de-geo</code>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    if (!resend) {
      console.warn(
        '⚠️ Resend API Key não configurada. Lead recebido no servidor (modo dev/fallback):',
        { nome, email, empresa, cargo }
      );
      return NextResponse.json({
        success: true,
        message: 'Lead recebido com sucesso (modo de desenvolvimento sem Resend).',
      });
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || 'Papoca GEO <onboarding@resend.dev>';

    const response = await resend.emails.send({
      from: fromEmail,
      to: DESTINATARIOS,
      replyTo: email,
      subject: `🎯 Novo Lead: Diagnóstico de GEO - ${nome} (${empresa})`,
      html: htmlContent,
    });

    if (response.error) {
      console.error('Erro ao enviar e-mail pelo Resend:', response.error);
      return NextResponse.json(
        { error: 'Não foi possível enviar sua mensagem no momento. Tente novamente em instantes.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: response.data?.id });
  } catch (error) {
    console.error('Erro interno ao processar lead de diagnóstico:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro inesperado. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
}

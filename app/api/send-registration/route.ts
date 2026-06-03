import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const nome = formData.get("nome") as string
    const email = formData.get("email") as string
    const telefone = formData.get("telefone") as string  // ← ADICIONADO
    const printApp = formData.get("printApp") as File | null

    // Validação básica
    if (!nome || !email || !telefone) {  // ← ADICIONADO telefone
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      )
    }

    // Preparar anexo se houver arquivo
    let attachments: { filename: string; content: Buffer }[] = []
    
    if (printApp && printApp.size > 0) {
      const bytes = await printApp.arrayBuffer()
      const buffer = Buffer.from(bytes)
      attachments = [
        {
          filename: printApp.name || "comprovante-app.png",
          content: buffer,
        },
      ]
    }

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: "BL Charge Station <noreply@imperiodigitalmkt.com.br>",
      to: ["blchargercharger@gmail.com"],
      subject: "novo formulário preenchido (QR Code)",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1a3a2f 0%, #0f2a20 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #22c55e; margin: 0; font-size: 24px;">BL Charge Station</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px;">Novo cadastro de motorista parceiro</p>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #1a3a2f; margin-top: 0; font-size: 18px; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
              Dados do Motorista
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b; width: 140px;">Nome Completo</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b;">E-mail</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #22c55e; text-decoration: none;">${email}</a>
                </td>
              </tr>
              // ← ADICIONADO
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #64748b;">Telefone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                  <a href="tel:${telefone}" style="color: #22c55e; text-decoration: none;">${telefone}</a>
                </td>
              </tr>
            </table>

            ${printApp && printApp.size > 0 ? `
            <div style="margin-top: 30px; padding: 15px; background: #ecfdf5; border-radius: 8px; border: 1px solid #22c55e;">
              <p style="margin: 0; color: #166534; font-size: 14px;">
                <strong>Comprovante anexado:</strong> ${printApp.name || "comprovante-app.png"}
              </p>
            </div>
            ` : `
            <div style="margin-top: 30px; padding: 15px; background: #fef3c7; border-radius: 8px; border: 1px solid #f59e0b;">
              <p style="margin: 0; color: #92400e; font-size: 14px;">
                <strong>Atenção:</strong> Nenhum comprovante foi anexado.
              </p>
            </div>
            `}
          </div>
          
          <div style="background: #1a3a2f; padding: 20px 30px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #94a3b8; margin: 0; font-size: 12px;">
              Este e-mail foi enviado automaticamente pelo formulário de cadastro do site BL Charge Station.
            </p>
            <p style="color: #64748b; margin: 10px 0 0 0; font-size: 11px;">
              ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
            </p>
          </div>
        </body>
        </html>
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json(
        { error: "Erro ao enviar e-mail. Tente novamente." },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Cadastro enviado com sucesso!",
      id: data?.id 
    })

  } catch (error) {
    console.error("[v0] Server error:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente." },
      { status: 500 }
    )
  }
}
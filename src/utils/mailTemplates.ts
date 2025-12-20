export const welcomeEmailTemplate = (name: string, token: string) => {
    return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px 0; color: #333;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        <tr>
          <td style="padding: 40px 30px; background-color: #007bff; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Bem-vindo ao MeuApp!</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <p style="font-size: 16px; line-height: 24px; margin-bottom: 20px;">Olá, <strong>${name}</strong>!</p>
            <p style="font-size: 16px; line-height: 24px; margin-bottom: 30px;">
              Obrigado por se cadastrar. Para ativar sua conta e começar a gerenciar suas finanças, utilize o código de verificação abaixo:
            </p>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="display: inline-block; background-color: #f1f4f9; color: #007bff; font-size: 36px; font-weight: bold; padding: 15px 30px; border-radius: 5px; letter-spacing: 8px; border: 1px solid #e0e0e0;">
                ${token}
              </span>
            </div>

            <p style="font-size: 14px; color: #666; line-height: 20px;">
              Este código é válido por 1 hora. Se você não solicitou este cadastro, pode ignorar este e-mail com segurança.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #eeeeee;">
            <p style="font-size: 12px; color: #999; margin: 0;">&copy; 2025 MeuApp Financeiro. Todos os direitos reservados.</p>
          </td>
        </tr>
      </table>
    </div>
  `;
};
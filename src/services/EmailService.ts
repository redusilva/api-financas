import nodemailer, { Transporter } from 'nodemailer';
import { IEmailService } from '../interfaces/IEmailService';
import { EmailOptions } from '../types/EmailDTO';

export class EmailService implements IEmailService {
    private transporter: Transporter;

    constructor() {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Configurações de e-mail ausentes no .env");
        }

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendEmail({ to, subject, text, html }: EmailOptions): Promise<void> {
        const mailOptions = {
            from: `Seu App <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`[EmailService] Sucesso: ${info.messageId}`);
        } catch (error) {
            console.error('[EmailService] Erro ao enviar e-mail:', error);
            throw new Error('Falha no disparo de e-mail.');
        }
    }
}
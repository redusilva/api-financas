export interface IEmailService {
    sendEmail(options: {
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }): Promise<any>;
}
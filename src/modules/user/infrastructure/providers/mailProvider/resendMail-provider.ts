import { Injectable } from '@nestjs/common';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';
import { SendMailDTO } from '@shared/application/providers/mailProvider/mail-Provider';
import { Resend } from 'resend';
@Injectable()
export class ResendProvider implements MailProvider {
  private resend: Resend;
  constructor() {
    this.resend = new Resend('re_123');
  }
  async sendMailMessage({
    to,
    from,
    subject,
    customLink,
    customMessage,
  }: SendMailDTO): Promise<void> {
    try {
      await this.resend.emails.send({
        to: to,
        from: from,
        subject,
        html: `<p>Click <a href="${customLink}">here</a>${customMessage}.</p>`,
      });
      console.log('E-mail enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      throw new Error('Erro ao enviar o e-mail');
    }
  }
}

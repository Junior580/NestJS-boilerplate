import { Injectable } from '@nestjs/common';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';
import { SendMailDTO } from '@shared/application/providers/mailProvider/mail-Provider';
import { Resend } from 'resend';
@Injectable()
export class ResendProvider implements MailProvider {
  private resend: Resend;
  constructor() {
    this.resend = new Resend('re_Xi2UCKhC_6QCWBCoDGWkZgMK1SC2dZgC5');
  }
  sendMailMessage({ to, from, subject, customLink }: SendMailDTO): void {
    try {
      this.resend.emails.send({
        to: to,
        from: from,
        subject,
        html: `<p>Click <a href="${customLink}">here</a> to confirm email.</p>`,
      });
      console.log(`E-mail enviado com sucesso para: ${to}`);
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      throw new Error('Erro ao enviar o e-mail');
    }
  }
}

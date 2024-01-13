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
  async sendMailMessage({
    to,
    from,
    subject,
    html,
  }: SendMailDTO): Promise<void> {
    try {
      this.resend.emails.send({
        to: to,
        from: from,
        subject,
        html: html,
      });
      console.log(`E-mail enviado com sucesso para: ${to}`);
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      throw new Error('Erro ao enviar o e-mail');
    }
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    try {
      const domain = '';
      const confirmLink = `${domain}/auth/new-verification?token=${token}`;

      await this.resend.emails.send({
        from: 'mail@auth-masterclass-tutorial.com',
        to: email,
        subject: 'Confirm your email',
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
      });
      console.log(`E-mail enviado com sucesso para: ${email}`);
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      throw new Error('Erro ao enviar o e-mail');
    }
  }
}

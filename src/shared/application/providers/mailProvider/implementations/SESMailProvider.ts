import aws from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '@config/mail';

import { MailTemplateProvider } from '../../mailTemplateProvider/models/MailTemplateProvider';
import MailProvider from '../models/MailProvider';
import SendMailDTO from '../dtos/SendMailDTO';

export class SESMailProvider implements MailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: MailTemplateProvider) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: { name: to.name, address: to.email },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    // CONSOLE LOG PARA TESTAR POIS SES NAO ESTA CONFIGURADO
    console.log('Enviou email via SES');
  }
}

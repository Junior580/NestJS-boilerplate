import nodemailer, { Transporter } from 'nodemailer';
import SendMailDTO from '../dtos/SendMailDTO';
import { MailTemplateProvider } from '../../mailTemplateProvider/models/MailTemplateProvider';
import MailProvider from '../models/MailProvider';

export class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: MailTemplateProvider) {
    // nodemailer.createTestAccount().then(account => {
    //   const transporter = nodemailer.createTransport({
    //     host: account.smtp.host,
    //     port: account.smtp.port,
    //     secure: account.smtp.secure,
    //     auth: {
    //       user: account.user,
    //       pass: account.pass,
    //     },
    //   })
    //   this.client = transporter
    // })
  }

  public async sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    nodemailer.createTestAccount(async (err, account) => {
      if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
      }

      console.log('Credentials obtained, sending message...');

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      const message = {
        from: {
          name: from?.name || 'Equipe GoBarber',
          address: from?.email || 'equipe@gobarber.com.br',
        },
        to: { name: to.name, address: to.email },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
  }
}

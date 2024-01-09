import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';
import { SendMailDTO } from '@shared/application/providers/mailProvider/mail-Provider';

export class ResendProvider implements MailProvider {
  sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

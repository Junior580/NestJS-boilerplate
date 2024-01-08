import SendMailDTO from '../dtos/SendMailDTO';
import MailProvider from '../models/MailProvider';

export class InMemoryMailProvider implements MailProvider {
  private messages: SendMailDTO[] = [];
  public async sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    this.messages.push({
      to,
      from,
      subject,
      templateData,
    });
  }
}

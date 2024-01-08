import SendMailDTO from '../dtos/SendMailDTO';

export default interface MailProvider {
  sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void>;
}

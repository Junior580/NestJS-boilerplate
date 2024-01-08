import SendMailDTO from '../mail-provider';

export default interface MailProvider {
  sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void>;
}

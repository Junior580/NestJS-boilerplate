export interface SendMailDTO {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
}

export default interface MailProvider {
  sendMailMessage({ to, from, subject }: SendMailDTO): void;
}

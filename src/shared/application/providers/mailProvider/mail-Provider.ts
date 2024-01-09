export interface SendMailDTO {
  to: string[];
  from: string;
  subject: string;
  customLink: string;
  customMessage: string;
}

export default interface MailProvider {
  sendMailMessage({ to, from, subject }: SendMailDTO): Promise<void>;
}

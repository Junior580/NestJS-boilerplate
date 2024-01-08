import SendMailDTO from '../mail-provider';

export class EtherealMailProvider implements SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: any;
}

import ParseMailTemplateDTO from '../../mailTemplateProvider/dtos/ParseMailTemplateDTO';

interface MailContact {
  name: string;
  email: string;
}

export default interface SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplateDTO;
}

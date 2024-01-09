interface TemplateVariables {
  [key: string]: string | number;
}
interface ParseMailTemplateDTO {
  file: string;
  variables: TemplateVariables;
}

interface MailContact {
  name: string;
  email: string;
}

export interface SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplateDTO;
}

export default interface MailProvider {
  sendMailMessage({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void>;
}

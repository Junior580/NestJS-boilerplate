import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export interface MailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}

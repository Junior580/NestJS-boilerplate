import { HandlebarsMailTemplateProvider } from '../mailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const handleMailTemplate = new HandlebarsMailTemplateProvider();

export const emailProviders = {
  // quando na config do env for ethereal retorna o provider do ethereal e etc..
  ethereal: new EtherealMailProvider(handleMailTemplate),
  ses: new SESMailProvider(handleMailTemplate),
};

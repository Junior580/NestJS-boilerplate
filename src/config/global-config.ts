import { INestApplication } from '@nestjs/common';
import { GeneralErrorFilter } from '@shared/infrastructure/http/exception-filters/general-exception.filter';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new GeneralErrorFilter());
}

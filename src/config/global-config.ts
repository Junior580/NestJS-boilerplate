import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
}

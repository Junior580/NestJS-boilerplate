import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GeneralErrorFilter } from '@shared/infrastructure/http/exception-filters/general-exception.filter';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';
import { NotFoundErrorFilter } from '@shared/infrastructure/http/exception-filters/not-found-error.filter';

export function applyGlobalConfig(app: INestApplication) {
  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter(), new NotFoundErrorFilter());
}

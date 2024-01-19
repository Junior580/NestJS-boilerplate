import { INestApplication, ValidationPipe } from '@nestjs/common';

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
}

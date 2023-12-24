import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  });

  app.register(fastifyCookie, {
    secret: process.env.JWT_PASS,
  });

  await app.listen(3000);
}

bootstrap();

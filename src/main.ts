import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

import { AppModule } from './app.module';
import { applyGlobalConfig } from '@config/global-config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.register(fastifyCookie, {
    secret: process.env.JWT_PASS,
  });

  applyGlobalConfig(app);

  await app.listen(3333);
}

bootstrap();

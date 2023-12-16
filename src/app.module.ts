import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { EnvConfigModule } from './shared/infra/http/env-config/env-config.module';
import { ExceptionsModule } from './shared/infra/http/filters/exceptions.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    EnvConfigModule,
    ExceptionsModule,
    EnvConfigModule,
  ],
})
export class AppModule {}

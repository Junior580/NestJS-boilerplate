import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { EnvConfigModule } from './shared/infrastructure/http/env-config/env-config.module';
import { ExceptionsModule } from './shared/infrastructure/http/exception-filters/exceptions.module';

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

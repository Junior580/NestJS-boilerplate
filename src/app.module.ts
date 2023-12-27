import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';
import { EnvConfigModule } from './shared/infrastructure/http/env-config/env-config.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@config/auth';

@Module({
  imports: [
    JwtModule.register(jwtConfig),
    UserModule,
    PrismaModule,
    EnvConfigModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/application/services/create-user.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { PrismaModule } from '@shared/infrastructure/prisma/prisma.module';
import { HashProvider } from './infrastructure/providers/hash-provider';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from '@modules/user/application/services/auth.service';
import { jwtConfig } from '../../config/auth';
import { UserPrismaRepository } from './infrastructure/database/prisma/repositories/user-prisma.repository';
@Module({
  imports: [PrismaModule, JwtModule.register(jwtConfig)],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    AuthService,
    HashProvider,
    UserPrismaRepository,
    {
      provide: UserService,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}

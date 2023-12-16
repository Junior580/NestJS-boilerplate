import { Module } from '@nestjs/common';
import { UserService } from './services/create-user.service';
import { UserController } from './controllers/user.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { HashProviderService } from './services/hash-provider.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { jwtConfig } from '../../config/auth';

@Module({
  imports: [PrismaModule, JwtModule.register(jwtConfig)],
  controllers: [UserController, AuthController],
  providers: [UserService, HashProviderService, AuthService],
  exports: [HashProviderService],
})
export class UserModule {}

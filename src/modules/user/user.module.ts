import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/application/services/create-user.service';
import { CreateUserController } from './infrastructure/controllers/create-user.controller';
import { HashProvider } from '../../shared/application/providers/hashProvider/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from '@modules/user/application/services/auth.service';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { UserPrismaRepository } from './infrastructure/database/prisma/repositories/user-prisma.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { BcryptjsHashProvider } from './infrastructure/providers/hash-provider';
import { ListUserService } from './application/services/list-user.service';
import { ListUserController } from './infrastructure/controllers/list-user.controller';
import { LogoutController } from './infrastructure/controllers/logout.controller';
import { RefreshTokenService } from './application/services/refresh-token.service';
import { RefreshTokenController } from './infrastructure/controllers/refresh-token.controller';
import { VerificationTokenService } from './application/services/verification-token.service';

@Module({
  controllers: [
    CreateUserController,
    AuthController,
    ListUserController,
    LogoutController,
    RefreshTokenController,
  ],
  providers: [
    RefreshTokenService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'HashProvider',
      useClass: BcryptjsHashProvider,
    },

    {
      provide: UserService,
      useFactory: (
        userRepository: UserRepository,
        hashProvider: HashProvider,
      ) => {
        return new UserService(userRepository, hashProvider);
      },
      inject: ['UserRepository', 'HashProvider'],
    },
    {
      provide: VerificationTokenService,
      useFactory: (userRepository: UserRepository) => {
        return new VerificationTokenService(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: AuthService,
      useFactory: (
        userRepository: UserRepository,
        jwtService: JwtService,
        hashProvider: HashProvider,
        verificationTokenService: VerificationTokenService,
      ) => {
        return new AuthService(
          userRepository,
          jwtService,
          hashProvider,
          verificationTokenService,
        );
      },
      inject: [
        'UserRepository',
        JwtService,
        'HashProvider',
        VerificationTokenService,
      ],
    },
    {
      provide: ListUserService,
      useFactory: (userRepository: UserRepository) => {
        return new ListUserService(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}

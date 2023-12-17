import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/application/services/create-user.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { HashProvider } from '../../shared/application/providers/hash-provider';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthService } from '@modules/user/application/services/auth.service';
import { jwtConfig } from '../../config/auth';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { UserPrismaRepository } from './infrastructure/database/prisma/repositories/user-prisma.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { BcryptjsHashProvider } from './infrastructure/providers/hash-provider';

@Module({
  imports: [JwtModule.register(jwtConfig)],
  controllers: [UserController],
  providers: [
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
    // {
    //   provide: AuthService,
    //   useFactory: (
    //     userRepository: UserRepository,
    //     hashProvider: HashProvider,
    //   ) => {
    //     return new AuthService(userRepository, hashProvider);
    //   },
    //   inject: ['UserRepository', 'HashProvider'],
    // },
  ],
})
export class UserModule {}

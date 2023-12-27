import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../application/services/auth.service';
import { FastifyReply } from 'fastify';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { HashProvider } from '@shared/application/providers/hash-provider';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let hashProviderMock: jest.Mocked<HashProvider>;

  beforeEach(async () => {
    userRepositoryMock = {} as jest.Mocked<UserRepository>;
    jwtServiceMock = {} as jest.Mocked<JwtService>;
    hashProviderMock = {} as jest.Mocked<HashProvider>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UserRepository, useValue: userRepositoryMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: HashProvider, useValue: hashProviderMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.login when calling login endpoint', async () => {
    const authServiceSpy = jest.spyOn(authService, 'execute');

    const mockFastifyReply: Partial<FastifyReply> = {
      status: jest.fn().mockReturnThis(), // Chainable method
      send: jest.fn(),
    };

    await controller.authLogin(
      {
        email: 'user1@email.com',
        password: 'teste123',
      },
      mockFastifyReply as FastifyReply,
    );

    expect(authServiceSpy).toHaveBeenCalled();
  });
});

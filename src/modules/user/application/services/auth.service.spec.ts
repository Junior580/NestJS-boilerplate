import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { BcryptjsHashProvider } from '@modules/user/infrastructure/providers/hashProvider/hash-provider';
import { VerificationTokenService } from './verification-token.service';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';

describe('AuthService', () => {
  let service: AuthService;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let jwtServiceMock: jest.Mocked<JwtService>;
  let hashProviderMock: jest.Mocked<BcryptjsHashProvider>;
  let verificationTokenServiceMock: jest.Mocked<VerificationTokenService>;
  let mailProviderMock: jest.Mocked<MailProvider>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,

        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            // ... mock other methods as needed
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: HashProvider,
          useValue: {
            compareHash: jest.fn(),
          },
        },
        {
          provide: VerificationTokenService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: MailProvider,
          useValue: {
            sendVerificationEmail: jest.fn(),
            sendMailMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Injectable } from '@nestjs/common';
import { HashProvider } from '@shared/application/providers/hashProvider/hash-provider';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserOutput, UserOutputMapper } from '../dto/user-output.dto';
import { Service } from '@shared/application/services';
import { VerificationTokenService } from './verification-token.service';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';

export type UserInput = {
  name: string;
  email: string;
  password: string;
  emailVerified: Date;
  image: string;
  role: 'ADMIN' | 'USER';
  isTwoFactorEnabled: boolean;
};

type Output = UserOutput;

@Injectable()
export class UserService implements Service<UserInput, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailProvider: MailProvider,
  ) {}

  async execute(input: UserInput) {
    const { email, name, password } = input;

    if (!email || !name || !password) {
      throw new Error('Invalid fields!');
    }

    await this.userRepository.emailExists(email);

    const hashPassword = await this.hashProvider.generateHash(password);

    const entity = new UserEntity(
      Object.assign(input, {
        password: hashPassword,
      }),
    );

    await this.userRepository.insert(entity);

    // generate confirmation token
    // send Verification Email
    const verficationToken = await this.verificationTokenService.execute(
      entity.email,
    );

    const confirmLink = `${'domain'}/auth/new-verification?token=${verficationToken.token}`;

    this.mailProvider.sendMailMessage({
      customLink: confirmLink,
      from: 'onboarding@resend.dev',
      to: 'junior.msm25@gmail.com', // alterar para verificationToken.email
      subject: 'Confirm your email',
    });

    return UserOutputMapper.toOutput(entity);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
};

type Output = UserOutput;

@Injectable()
export class CreateUserService implements Service<UserInput, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailProvider: MailProvider,
  ) {}

  async execute(input: UserInput) {
    const { email, name, password } = input;

    if (!email || !name || !password) {
      throw new HttpException('Invalid fields!', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.userEmailExists(email);

    const hashPassword = await this.hashProvider.generateHash(password);

    const entity = new UserEntity(
      Object.assign(input, {
        password: hashPassword,
      }),
    );

    await this.userRepository.insert(entity);

    const verficationToken = await this.verificationTokenService.execute(
      entity.email,
    );

    console.log(`Verification token: ${JSON.stringify(verficationToken)}`);

    this.mailProvider.sendVerificationEmail(
      verficationToken.email,
      verficationToken.token,
    );

    return UserOutputMapper.toOutput(entity);
  }
}

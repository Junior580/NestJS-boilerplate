import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserOutput, UserOutputMapper } from '../dto/user-output.dto';
import { VerificationTokenService } from './verification-token.service';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';

export type UpdateUserInput = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'USER';
  isTwoFactorEnabled?: boolean;
};

type Output = UserOutput;

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailProvider: MailProvider,
  ) {}

  async execute({
    id,
    name,
    email,
    password,
    isTwoFactorEnabled,
    role,
  }: UpdateUserInput): Promise<Output> {
    if (!email) {
      throw new HttpException('E-mail not provided', HttpStatus.NOT_FOUND);
    }
    const entity = await this.userRepository.findById(id);

    if (name) {
      entity.updateName(name);
    }

    if (email) {
      entity.updateEmail(name);
      const verficationToken = await this.verificationTokenService.execute(
        entity.email,
      );

      console.log(`Verification token: ${JSON.stringify(verficationToken)}`);

      this.mailProvider.sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
      );
    }

    if (password) {
      entity.updatePassword(password);
    }

    if (isTwoFactorEnabled) {
      entity.updateIsTwoFactorEnabled(isTwoFactorEnabled);
    }

    if (role) {
      entity.updateRole(role);
    }

    await this.userRepository.update(entity);
    return UserOutputMapper.toOutput(entity);
  }
}

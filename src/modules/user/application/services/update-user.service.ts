import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
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

type Output = {
  user: UserOutput;
  message?: string;
};

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
    const entity = await this.userRepository.findById(id);

    if (name) {
      entity.updateName(name);
    }

    if (email) {
      //buscar caso o email já exista para evitar duplicidade
      entity.updateEmail(email);
      const verficationToken =
        await this.verificationTokenService.execute(email);

      console.log(`Verification token: ${JSON.stringify(verficationToken)}`);

      this.mailProvider.sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
      );
    }

    if (password) {
      //adicionar a o hash provider para criptografar senha
      entity.updatePassword(password);
    }

    if (isTwoFactorEnabled) {
      entity.updateIsTwoFactorEnabled(isTwoFactorEnabled);
    }

    if (role) {
      entity.updateRole(role);
    }

    await this.userRepository.update(entity);
    return {
      user: UserOutputMapper.toOutput(entity),
      message: email && 'Verification email sent',
    };
  }
}

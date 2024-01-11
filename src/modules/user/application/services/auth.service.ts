import { Injectable, UnauthorizedException } from '@nestjs/common';

import { HashProvider } from '@shared/application/providers/hashProvider/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { VerificationTokenService } from './verification-token.service';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';
import { TwoFactorConfirmationEntity } from '@modules/user/domain/entities/twoFactorConfirmation.entity';
import { TwoFactorTokenEntity } from '@modules/user/domain/entities/twoFactorToken.entity';
import { v4 as uuidv4 } from 'uuid';

export type AuthInput = {
  email: string;
  password: string;
  code?: string;
};

type Output =
  | { access_token: string; refresh_token: string }
  | { message: string };

@Injectable()
export class AuthService implements Service<AuthInput, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailProvider: MailProvider,
  ) {}

  async execute(props: AuthInput) {
    const { email, password, code } = props;

    const existingUser = await this.userRepository.findByEmail(email);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      existingUser.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException(
        'Incorrect username and password combination',
      );
    }

    //
    if (!existingUser.emailVerified) {
      const verficationToken = await this.verificationTokenService.execute(
        existingUser.email,
      );
      const domain = 'http://localhost:3333';
      const confirmLink = `${domain}/auth/new-verification?token=${verficationToken.token}`;

      this.mailProvider.sendMailMessage({
        html: confirmLink,
        from: 'onboarding@resend.dev',
        to: verficationToken.email, // alterar para verificationToken.email
        subject: 'Confirm your email',
      });

      return { message: 'Confirmation email sent!' };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken =
          await this.userRepository.getTwoFactorTokenByEmail(
            existingUser.email,
          );

        if (!twoFactorToken) {
          return { message: 'Invalid code!' };
        }

        if (twoFactorToken.token !== code) {
          return { message: 'Invalid code!' };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { message: 'Code expired!' };
        }

        const existingConfirmation =
          await this.userRepository.getTwoFactorConfirmationByUserId(
            existingUser.id,
          );

        if (existingConfirmation) {
          await this.userRepository.deleteTwoFactorConfirmation(
            existingConfirmation.id,
          );
        }
        const twoFactorConfirmationEntity = new TwoFactorConfirmationEntity({
          userId: existingUser.id,
        });
        await this.userRepository.createTwoFactorConfirmation(
          twoFactorConfirmationEntity,
        );
      } else {
        const token = uuidv4();
        const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
        const twoFactorTokenEntity = new TwoFactorTokenEntity({
          token,
          expires,
          email: existingUser.email,
        });
        const twoFactorToken =
          await this.userRepository.createTwoFactorToken(twoFactorTokenEntity);

        this.mailProvider.sendMailMessage({
          from: 'onboarding@resend.dev',
          to: twoFactorToken.email, // alterar para verificationToken.email
          subject: '2FA Code',
          html: `<p>Your 2FA code: ${token}</p>`,
        });
      }
    }

    //

    const payload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    return { access_token, refresh_token };
  }
}

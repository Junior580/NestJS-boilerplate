import { Injectable, UnauthorizedException } from '@nestjs/common';
import crypto from 'crypto';

import { HashProvider } from '@shared/application/providers/hashProvider/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { VerificationTokenService } from './verification-token.service';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';
import { TwoFactorConfirmationEntity } from '@modules/user/domain/entities/twoFactorConfirmation.entity';
import { TwoFactorTokenEntity } from '@modules/user/domain/entities/twoFactorToken.entity';

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

  async execute({ email, password, code }: AuthInput) {
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

    if (!existingUser.emailVerified) {
      console.log(`🔥~ AuthService !existingUser.emailVerified `);

      const verificationToken = await this.verificationTokenService.execute(
        existingUser.email,
      );

      await this.mailProvider.sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      return { message: 'Confirmation email sent!' };
    }

    // if (existingUser.isTwoFactorEnabled && existingUser.email) {
    //   if (code) {
    //     const twoFactorToken =
    //       await this.userRepository.getTwoFactorTokenByEmail(
    //         existingUser.email,
    //       );

    //     if (!twoFactorToken) {
    //       return { message: 'Invalid code!' };
    //     }

    //     if (twoFactorToken.token !== code) {
    //       return { message: 'Invalid code!' };
    //     }

    //     const hasExpired = new Date(twoFactorToken.expires) < new Date();

    //     if (hasExpired) {
    //       return { message: 'Code expired!' };
    //     }

    //     await this.userRepository.deleteTwoFactorToken(twoFactorToken.id);

    //     const existingConfirmation =
    //       await this.userRepository.getTwoFactorConfirmationByUserId(
    //         existingUser.id,
    //       );

    //     if (existingConfirmation) {
    //       await this.userRepository.deleteTwoFactorConfirmation(
    //         existingConfirmation.id,
    //       );
    //     }

    //     const twoFactorConfirmationEntity = new TwoFactorConfirmationEntity({
    //       userId: existingUser.id,
    //     });

    //     await this.userRepository.createTwoFactorConfirmation(
    //       twoFactorConfirmationEntity,
    //     );
    //   } else {
    //     const twoFactorToken = await this.generateTwoFactorToken(email);
    //     await this.sendTwoFactorTokenEmail(
    //       twoFactorToken.email,
    //       twoFactorToken.token,
    //     );
    //     return { message: 'twoFactor: true' };
    //   }
    // }

    // if (existingUser.isTwoFactorEnabled) {
    //   const twoFactorConfirmation =
    //     await this.userRepository.getTwoFactorConfirmationByUserId(
    //       existingUser.id,
    //     );

    //   if (!twoFactorConfirmation) return { message: 'false' };

    //   await this.userRepository.deleteTwoFactorConfirmation(
    //     twoFactorConfirmation.id,
    //   );
    // }

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

  private async generateTwoFactorToken(email: string) {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken =
      await this.userRepository.getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await this.userRepository.deleteTwoFactorToken(existingToken.id);
    }

    const twoFactorTokenEntity = new TwoFactorTokenEntity({
      token,
      expires,
      email,
    });

    const twoFactorToken =
      await this.userRepository.createTwoFactorToken(twoFactorTokenEntity);

    return twoFactorToken;
  }

  private async sendTwoFactorTokenEmail(email: string, token: string) {
    this.mailProvider.sendMailMessage({
      from: 'mail@auth-masterclass-tutorial.com',
      to: email,
      subject: '2FA Code',
      html: `<p>Your 2FA code: ${token}</p>`,
    });
  }
}

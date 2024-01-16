import { Injectable, UnauthorizedException } from '@nestjs/common';

import { HashProvider } from '@shared/application/providers/hashProvider/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { VerificationTokenService } from './verification-token.service';
import MailProvider from '@shared/application/providers/mailProvider/mail-Provider';
import { TwoFactorTokenEntity } from '@modules/user/domain/entities/two-factor-token.entity';
import { TwoFactorTokenRepository } from '@modules/user/domain/repositories/two-factor-token.repository';

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
    private readonly twoFactorTokenRepository: TwoFactorTokenRepository,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailProvider: MailProvider,
  ) {}

  async execute({ email, password }: AuthInput) {
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
      console.log(`🔥 ~ !confirmation ~ line: 47 `);

      const verificationToken = await this.verificationTokenService.execute(
        existingUser.email,
      );

      await this.mailProvider.sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      return { message: 'Confirm your email first!' };
    }

    if (existingUser.isTwoFactorEnabled) {
      console.log(`🔥 ~ isTwoFactorEnabled ~ line: 62 `);

      const twoFactorToken = await this.generateTwoFactorToken(
        existingUser.email,
      );

      console.log(
        `🔥 ~ isTwoFactorEnabled ~ line: 68 ${JSON.stringify(twoFactorToken)} `,
      );

      this.sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { message: '2fa token sended' };
    }

    console.log(`🔥 ~ normal ~ line: 72 `);

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
    function generateRandomNumber() {
      const maxDigits = 6;
      const randomNumber = Math.random() * Math.pow(10, maxDigits);
      const roundedNumber = Math.floor(randomNumber);

      return roundedNumber.toString().padStart(maxDigits, '0');
    }
    const token = generateRandomNumber();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    const existingToken =
      await this.twoFactorTokenRepository.getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await this.twoFactorTokenRepository.deleteTwoFactorToken(
        existingToken.id,
      );
    }

    const twoFactorTokenEntity = new TwoFactorTokenEntity({
      token,
      expires,
      email,
    });

    const twoFactorToken =
      await this.twoFactorTokenRepository.createTwoFactorToken(
        twoFactorTokenEntity,
      );

    return twoFactorToken;
  }

  private async sendTwoFactorTokenEmail(email: string, token: string) {
    return this.mailProvider.sendMailMessage({
      from: 'mail@auth-masterclass-tutorial.com',
      to: email,
      subject: '2FA Code',
      html: `<p>Your 2FA code: ${token}</p>`,
    });
  }
}

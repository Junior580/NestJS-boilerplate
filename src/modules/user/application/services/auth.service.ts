import { Injectable, UnauthorizedException } from '@nestjs/common';

import { HashProvider } from '@shared/application/providers/hashProvider/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { VerificationTokenService } from './verification-token.service';

export type AuthInput = {
  email: string;
  password: string;
};

type Output = { access_token: string; refresh_token: string };

@Injectable()
export class AuthService implements Service<AuthInput, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
    private readonly verificationTokenService: VerificationTokenService,
  ) {}

  async execute(props: AuthInput) {
    const { email, password } = props;

    const user = await this.userRepository.findByEmail(email);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException(
        'Incorrect username and password combination',
      );
    }

    if (!user.emailVerified) {
      const verificationToken = await this.verificationTokenService.execute(
        user.email,
      );

      // await sendVerificationEmail(
      //   verificationToken.email,
      //   verificationToken.token,
      // );

      // return { success: "Confirmation email sent!" };
    }

    const payload = { id: user._id, name: user.name, email: user.email };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    return { access_token, refresh_token };
  }
}

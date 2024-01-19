import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { TwoFactorTokenRepository } from '@modules/user/domain/repositories/two-factor-token.repository';

export type TwoFactorAuthInput = {
  email: string;
  code: string;
};

type Output =
  | { access_token: string; refresh_token: string }
  | { message: string };

@Injectable()
export class TwoFactorAuthService
  implements Service<TwoFactorAuthInput, Output>
{
  constructor(
    private readonly twoFactorTokenRepository: TwoFactorTokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ code, email }: TwoFactorAuthInput) {
    const existingToken =
      await this.twoFactorTokenRepository.getTwoFactorTokenByEmail(email);

    if (!existingToken) {
      throw new HttpException(
        `No code for the email provided ${email}`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (existingToken.token !== code)
      return { message: 'Login failed, invalid code' };

    const payload = {
      id: existingToken.id,
      email: existingToken.email,
      token: existingToken.token,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    await this.twoFactorTokenRepository.deleteTwoFactorToken(existingToken.id);

    return { access_token, refresh_token };
  }
}

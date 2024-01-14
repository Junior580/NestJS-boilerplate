import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';

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
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ code, email }: TwoFactorAuthInput) {
    const existingToken =
      await this.userRepository.getTwoFactorTokenByEmail(email);

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

    return { access_token, refresh_token };
  }
}

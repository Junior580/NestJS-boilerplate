import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { TwoFactorTokenRepository } from '@modules/user/domain/repositories/two-factor-token.repository';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';

export type TwoFactorAuthInput = {
  email: string;
  code: string;
};

type UserInfo = {
  name: string;
  email: string;
  role: string;
  image?: string;
};

type Output = {
  access_token: string;
  refresh_token: string;
  userInfo: UserInfo;
};

@Injectable()
export class TwoFactorAuthService
  implements Service<TwoFactorAuthInput, Output>
{
  constructor(
    private readonly userRepository: UserRepository,
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

    if (existingToken.token !== code) {
      throw new HttpException(
        'Login failed, invalid code',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const existingUser = await this.userRepository.findByEmail(email);

    const accessPayload = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    const refreshPayload = {
      id: existingUser.id,
    };

    const access_token = await this.jwtService.signAsync(accessPayload, {
      expiresIn: '24h',
    });

    const refresh_token = await this.jwtService.signAsync(refreshPayload, {
      expiresIn: '24h',
    });

    await this.twoFactorTokenRepository.deleteTwoFactorToken(existingToken.id);

    const userInfo: UserInfo = {
      name: existingUser.name,
      email: existingUser.email,
      image: existingUser.image,
      role: existingUser.role,
    };

    return { access_token, refresh_token, userInfo };
  }
}

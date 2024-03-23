import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type RefreshTokenInput = {
  refresh_token: string;
};

type Output = {
  access_token: string;
};

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(refreshTokenInput: RefreshTokenInput): Promise<Output> {
    const { refresh_token } = refreshTokenInput;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    try {
      const token = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.JWT_PASS,
      });

      const user = await this.userRepository.findById(token.id);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const access_token = await this.jwtService.signAsync(accessPayload, {
        expiresIn: '15m',
      });

      return { access_token };
    } catch {
      throw new UnauthorizedException('JWT token is invalid');
    }
  }
}

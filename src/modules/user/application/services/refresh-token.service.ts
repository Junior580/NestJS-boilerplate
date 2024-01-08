import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';

export type RefreshTokenInput = {
  refresh_token: string;
};

type Output = { access_token: string; refresh_token: string };

@Injectable()
export class RefreshTokenService implements Service<RefreshTokenInput, Output> {
  constructor(private readonly jwtService: JwtService) {}
  async execute(input: RefreshTokenInput): Promise<Output> {
    try {
      await this.jwtService.verify(input.refresh_token, {
        secret: process.env.JWT_PASS,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.jwtService.decode(input.refresh_token);

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const updatedToken = await this.jwtService.signAsync(payload, {
      expiresIn: '5m',
    });

    const updatedRefreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return {
      access_token: updatedToken,
      refresh_token: updatedRefreshToken,
    };
  }
}

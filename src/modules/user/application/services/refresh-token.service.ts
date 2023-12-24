import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';

type Input = string;

type Output = { refresh_token: string };

@Injectable()
export class RefreshTokenService implements Service<Input, Output> {
  constructor(private readonly jwtService: JwtService) {}
  async execute(input: Input) {
    const refresh_token = await this.jwtService.signAsync(
      { input },
      {
        expiresIn: '15m',
      },
    );

    const decodedToken = this.jwtService.verify(refresh_token);
    const accessToken = await this.jwtService.signAsync(decodedToken);
    const newRefreshToken = await this.jwtService.signAsync(accessToken);

    return { refresh_token: newRefreshToken };
  }
}

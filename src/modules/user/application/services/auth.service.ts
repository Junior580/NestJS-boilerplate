import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthDto } from '../dto/auth.dto';
import { HashProvider } from '@shared/application/providers/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';

type Input = AuthDto;

type Output = { access_token: string; refresh_token: string };

@Injectable()
export class AuthService implements Service<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(props: Input) {
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

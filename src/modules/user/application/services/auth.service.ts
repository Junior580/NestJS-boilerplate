import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthDto } from '../dto/auth.dto';
import { HashProvider } from '@shared/application/providers/hash-provider';
import { JwtService } from '@nestjs/jwt';
import { Service } from '@shared/application/services';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';

type Input = AuthDto;

type Output = { access_token: string };

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
      throw new UnauthorizedException();
    }

    const payloadToken = { name: user.name, id: user._id };

    const access_token = await this.jwtService.signAsync(payloadToken, {
      expiresIn: '15m',
    });

    return { access_token };
  }
}

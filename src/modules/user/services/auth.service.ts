import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from '../dto/create-auth.dto';
import { HashProviderService } from './hash-provider.service';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashProvider: HashProviderService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(props: AuthDto) {
    return await this.prismaService.user
      .findFirstOrThrow({
        where: {
          email: props.email,
        },
      })
      .then(
        async (user) => {
          const passwordMatched = await this.hashProvider.compareHash(
            props.password,
            user.password,
          );

          if (!passwordMatched) {
            throw new UnauthorizedException();
          }

          const payload = { name: user.name, email: user.email };

          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        },
        () => {
          throw new NotFoundException('user does not exists');
        },
      );
  }
}

import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { TwoFactorAuthService } from '@modules/user/application/services/two-factor-auth.service';
import { TwoFactorAuthDto } from '../dto/two-factor-auth.dto';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  @Post()
  async authLogin(
    @Body() createAuthDto: AuthDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const { access_token, refresh_token, userInfo } =
      await this.authService.execute(createAuthDto);

    reply.setCookie('@auth', access_token, {
      httpOnly: true,
      path: '/',
    });

    return { userInfo, refresh_token };
  }

  @Post('2fa')
  async twoFactorAuth(
    @Body() twoFactorAuthDto: TwoFactorAuthDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const { access_token, refresh_token, userInfo } =
      await this.twoFactorAuthService.execute(twoFactorAuthDto);

    reply.setCookie('@auth', access_token, {
      httpOnly: true,
      path: '/',
    });

    return { userInfo, refresh_token };
  }
}

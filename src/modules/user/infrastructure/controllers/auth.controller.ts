import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { FastifyReply } from 'fastify';
import { TwoFactorAuthService } from '@modules/user/application/services/two-factor-auth.service';
import { TwoFactorAuthDto } from '../dto/two-factor-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  @Post()
  async authLogin(
    @Body() createAuthDto: AuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { access_token, refresh_token, userInfo } =
      await this.authService.execute(createAuthDto);

    response.setCookie('@auth', access_token, {
      httpOnly: true,
      path: '/',
    });
    response.setCookie('@refresh', refresh_token, {
      httpOnly: true,
      path: '/',
    });

    return { userInfo };
  }

  @Post('2fa')
  async twoFactorAuth(
    @Body() twoFactorAuthDto: TwoFactorAuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { access_token, refresh_token, userInfo } =
      await this.twoFactorAuthService.execute(twoFactorAuthDto);

    response.setCookie('@auth', access_token, {
      httpOnly: true,
      path: '/',
    });
    response.setCookie('@refresh', refresh_token, {
      httpOnly: true,
      path: '/',
    });

    return { userInfo };
  }
}

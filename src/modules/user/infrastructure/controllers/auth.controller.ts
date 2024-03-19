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
    const {
      access_token,
      refresh_token,
      isTwoFactorAuthEnabled,
      isEmailVerified,
    } = await this.authService.execute(createAuthDto);

    if (isTwoFactorAuthEnabled) return { isTwoFactorAuthEnabled };

    if (isEmailVerified === false) return { isEmailVerified };

    if (access_token && refresh_token) {
      response.setCookie('@auth', access_token, {
        httpOnly: true,
        path: '/',
      });
      response.setCookie('@refresh', refresh_token, {
        httpOnly: true,
        path: '/',
      });
      return { access_token, refresh_token };
    }
  }

  @Post('2fa')
  async twoFactorAuth(
    @Body() twoFactorAuthDto: TwoFactorAuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { access_token, refresh_token, message } =
      await this.twoFactorAuthService.execute(twoFactorAuthDto);

    if (!access_token && !refresh_token) return { message };

    if (access_token && refresh_token) {
      response.setCookie('@auth', access_token, {
        httpOnly: true,
        path: '/',
      });
      response.setCookie('@refresh', refresh_token, {
        httpOnly: true,
        path: '/',
      });
      return { access_token, refresh_token };
    }
  }
}

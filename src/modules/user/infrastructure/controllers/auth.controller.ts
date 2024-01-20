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
    const { access_token, refresh_token, message } =
      await this.authService.execute(createAuthDto);

    if (!access_token && !refresh_token) return message;

    response.setCookie('@auth', access_token, { httpOnly: true });
    response.setCookie('@refresh', refresh_token, { httpOnly: true });

    return { success: 'ok', access_token, refresh_token };
  }

  @Post('2fa')
  async twoFactorAuth(@Body() twoFactorAuthDto: TwoFactorAuthDto) {
    return this.twoFactorAuthService.execute(twoFactorAuthDto);
  }
}

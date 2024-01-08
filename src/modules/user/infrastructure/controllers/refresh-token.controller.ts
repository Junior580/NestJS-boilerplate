import { RefreshTokenService } from '@modules/user/application/services/refresh-token.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Controller('auth/refresh')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  async authRefresh(
    @Body() refreshAuthDto: RefreshTokenDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { access_token, refresh_token } =
      await this.refreshTokenService.execute(refreshAuthDto);

    response.clearCookie('@auth');
    response.clearCookie('@refresh');

    response.setCookie('@auth', access_token, { httpOnly: true });
    response.setCookie('@refresh', refresh_token, { httpOnly: true });

    return { refres_success: 'ok' };
  }
}

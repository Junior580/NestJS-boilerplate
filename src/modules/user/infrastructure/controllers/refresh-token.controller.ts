import { RefreshTokenService } from '@modules/user/application/services/refresh-token.service';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  async authRefresh(
    @Res({ passthrough: true }) response: FastifyReply,
    @Req() request: FastifyRequest,
  ) {
    const cookies = request.cookies;
    const token = cookies['@token'];
    const oldRefreshToken = await this.refreshTokenService.execute(token);
    response.setCookie('@token', oldRefreshToken.refresh_token, {
      httpOnly: true,
    });

    return { success: 'ok' };
  }
}

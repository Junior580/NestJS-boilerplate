import { Controller, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller('auth/logout')
export class LogoutController {
  @Post()
  async logout(@Res({ passthrough: true }) response: FastifyReply) {
    response.clearCookie('@auth');
    response.clearCookie('@refresh');

    return { success: 'ok' };
  }
}

import { Controller, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller('auth/logout')
export class LogoutController {
  @Post()
  async logout(@Res({ passthrough: true }) reply: FastifyReply) {
    reply.clearCookie('@auth');

    return { success: 'ok' };
  }
}

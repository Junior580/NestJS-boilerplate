import { Controller, Post, UseFilters, Res } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';
import { FastifyReply } from 'fastify';

@Controller('auth/logout')
@UseFilters(new HttpExceptionFilter())
export class LogoutController {
  @Post()
  async create(@Res({ passthrough: true }) response: FastifyReply) {
    response.clearCookie('@auth');
    response.clearCookie('@refresh');

    return { success: 'ok' };
  }
}

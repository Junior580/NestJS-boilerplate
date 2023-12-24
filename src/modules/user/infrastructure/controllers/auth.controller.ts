import { Controller, Post, Body, UseFilters, Res } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../../application/dto/auth.dto';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';
import { FastifyReply } from 'fastify';
@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(
    @Body() createAuthDto: AuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const token = await this.authService.execute(createAuthDto);

    response.setCookie('@token', token, { httpOnly: true });

    return { success: 'ok' };
  }
}

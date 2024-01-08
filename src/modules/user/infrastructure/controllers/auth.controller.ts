import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../../application/dto/auth-output.dto';
import { FastifyReply } from 'fastify';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async authLogin(
    @Body() createAuthDto: AuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { access_token, refresh_token } =
      await this.authService.execute(createAuthDto);
    response.setCookie('@auth', access_token, { httpOnly: true });
    response.setCookie('@refresh', refresh_token, { httpOnly: true });
    return { success: 'ok', access_token, refresh_token };
  }
}

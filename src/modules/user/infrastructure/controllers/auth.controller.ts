import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../../application/dto/auth.dto';
import { HttpExceptionFilter } from '@shared/infrastructure/http/exception-filters/http-exception.filter';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async asynccreate(@Body() createAuthDto: AuthDto) {
    return this.authService.execute(createAuthDto);
  }
}

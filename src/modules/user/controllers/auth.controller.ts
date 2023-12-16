import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/create-auth.dto';
import { HttpExceptionFilter } from 'src/shared/infra/http/filters/http-exception.filter';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async asynccreate(@Body() createAuthDto: AuthDto) {
    return this.authService.execute(createAuthDto);
  }
}

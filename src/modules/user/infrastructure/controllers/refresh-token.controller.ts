import { RefreshTokenService } from '@modules/user/application/services/refresh-token.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

@Controller('auth/refresh')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post()
  async authRefresh(@Body() refreshAuthDto: RefreshTokenDto) {
    return this.refreshTokenService.execute(refreshAuthDto);
  }
}

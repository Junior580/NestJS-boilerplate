import { Body, Controller, Post } from '@nestjs/common';
import { TwoFactorAuthService } from '@modules/user/application/services/two-factor-auth.service';
import { TwoFactorAuthDto } from '../dto/two-factor-auth.dto';

@Controller('auth/2fa')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}

  @Post()
  async twoFactorAuth(@Body() twoFactorAuthDto: TwoFactorAuthDto) {
    return this.twoFactorAuthService.execute(twoFactorAuthDto);
  }
}

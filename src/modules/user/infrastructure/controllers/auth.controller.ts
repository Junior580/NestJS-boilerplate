import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { TwoFactorAuthService } from '@modules/user/application/services/two-factor-auth.service';
import { TwoFactorAuthDto } from '../dto/two-factor-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  @Post()
  async authLogin(@Body() createAuthDto: AuthDto) {
    return this.authService.execute(createAuthDto);
  }

  @Post('2fa')
  async twoFactorAuth(@Body() twoFactorAuthDto: TwoFactorAuthDto) {
    return this.twoFactorAuthService.execute(twoFactorAuthDto);
  }
}

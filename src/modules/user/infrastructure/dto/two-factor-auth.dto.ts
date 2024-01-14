import { TwoFactorAuthInput } from '@modules/user/application/services/two-factor-auth.service';
import { IsNotEmpty, IsString } from 'class-validator';

export class TwoFactorAuthDto implements TwoFactorAuthInput {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

import { RefreshTokenInput } from '@modules/user/application/services/refresh-token.service';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto implements RefreshTokenInput {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

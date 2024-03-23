import { RefreshTokenInput } from '@modules/user/application/services/refresh-token.service';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto implements RefreshTokenInput {
  @IsString({ message: 'The password field must be a string' })
  @IsNotEmpty({ message: 'The email field cannot be empty' })
  refresh_token: string;
}

import { AuthInput } from '@modules/user/application/services/auth.service';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto implements AuthInput {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

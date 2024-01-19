import { AuthInput } from '@modules/user/application/services/auth.service';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto implements AuthInput {
  @IsEmail({}, { message: 'The email field must be a valid email' })
  @IsString({ message: 'The email field must be a string' })
  @IsNotEmpty({ message: 'The email field cannot be empty' })
  email: string;

  @IsString({ message: 'The password field must be a string' })
  @IsNotEmpty({ message: 'The password field cannot be empty' })
  password: string;
}

import { UserInput } from '@modules/user/application/services/create-user.service';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SignupDto implements UserInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsNotEmpty()
  emailVerified: Date;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  role: 'ADMIN' | 'USER';

  @IsBoolean()
  @IsNotEmpty()
  isTwoFactorEnabled: boolean;
}

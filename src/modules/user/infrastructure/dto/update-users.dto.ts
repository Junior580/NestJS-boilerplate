import { UpdateUserInput } from '@modules/user/application/services/update-user.service';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class UpdateUserDto implements UpdateUserInput {
  @IsString({ message: 'The ID field must be a string' })
  @IsNotEmpty({ message: 'The ID field cannot be empty' })
  id: string;

  @IsString({ message: 'The name field must be a string' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'The email field must be a valid email' })
  @IsString({ message: 'The email field must be a string' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'The password field must be a string' })
  @IsOptional()
  password?: string;

  @IsEnum(UserRole, { message: 'Role must be either ADMIN or USER' })
  @IsOptional()
  role?: 'ADMIN' | 'USER';

  @IsBoolean({ message: 'isTwoFactorEnabled must be a boolean' })
  @IsOptional()
  isTwoFactorEnabled?: boolean;
}

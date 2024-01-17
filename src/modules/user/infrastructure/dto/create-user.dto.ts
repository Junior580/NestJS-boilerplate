import { UserInput } from '@modules/user/application/services/create-user.service';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements UserInput {
  /**
   * User name,
   * @example user1
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Valid email address,
   * @example user1@email.com
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * a password with at least 6 digits,
   * @example @Teste123
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}

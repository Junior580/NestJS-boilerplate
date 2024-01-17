import { UserInput } from '@modules/user/application/services/create-user.service';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto implements UserInput {
  @ApiProperty({ description: 'User name', example: 'user1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Valid email address',
    example: 'user1@email.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'a password with at least 6 digits',
    example: '@Teste123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

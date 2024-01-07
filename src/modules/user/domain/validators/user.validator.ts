import { ClassValidatorFields } from '../../../../shared/domain/validators/class-validator-fields';
import { UserProps } from '../entities/user.entity';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  emailVerified?: Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  image?: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  role: UserRole;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  accounts: string[];

  @IsBoolean()
  @IsNotEmpty()
  isTwoFactorEnabled: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  twoFactorConfirmation?: string[];

  constructor({
    email,
    name,
    password,
    emailVerified,
    image,
    role,
    accounts,
    isTwoFactorEnabled,
    twoFactorConfirmation,
  }: UserProps) {
    Object.assign(this, {
      email,
      name,
      password,
      emailVerified,
      image,
      role,
      accounts,
      isTwoFactorEnabled,
      twoFactorConfirmation,
    });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserRules): boolean {
    return super.validate(new UserRules(data ?? ({} as UserProps)));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}

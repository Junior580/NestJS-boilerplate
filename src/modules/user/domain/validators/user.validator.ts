import { ClassValidatorFields } from '../../../../shared/domain/validators/class-validator-fields';
import { UserProps } from '../entities/user.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsBoolean,
} from 'class-validator';

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

  @IsOptional()
  emailVerified?: Date;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  image?: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  role?: 'ADMIN' | 'USER';

  @IsBoolean()
  @IsNotEmpty()
  isTwoFactorEnabled?: boolean;

  constructor({
    email,
    name,
    password,
    emailVerified,
    image,
    role,
    isTwoFactorEnabled,
  }: UserProps) {
    Object.assign(this, {
      email,
      name,
      password,
      emailVerified,
      image,
      role,
      isTwoFactorEnabled,
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

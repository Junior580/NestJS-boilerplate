import { MaxLength, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { ClassValidatorFields } from '@shared/domain/validators/class-validator-fields';
import { PasswordResetTokenProps } from '../entities/password-reset-token.entity';

export class PasswordResetTokenRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsDate()
  @IsNotEmpty()
  expires: Date;

  constructor({ email, token, expires }: PasswordResetTokenProps) {
    Object.assign(this, { email, token, expires });
  }
}

export class PasswordResetTokenValidator extends ClassValidatorFields<PasswordResetTokenRules> {
  validate(data: PasswordResetTokenRules): boolean {
    return super.validate(
      new PasswordResetTokenRules(data ?? ({} as PasswordResetTokenProps)),
    );
  }
}

export class PasswordResetTokenFactory {
  static create(): PasswordResetTokenValidator {
    return new PasswordResetTokenValidator();
  }
}

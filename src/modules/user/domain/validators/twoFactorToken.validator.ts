import { MaxLength, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { ClassValidatorFields } from '@shared/domain/validators/class-validator-fields';
import { TwoFactorTokenProps } from '../entities/twoFactorToken.entity';

export class TwoFactorTokenRules {
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

  constructor({ email, token, expires }: TwoFactorTokenProps) {
    Object.assign(this, { email, token, expires });
  }
}

export class TwoFactorTokenValidator extends ClassValidatorFields<TwoFactorTokenRules> {
  validate(data: TwoFactorTokenRules): boolean {
    return super.validate(
      new TwoFactorTokenRules(data ?? ({} as TwoFactorTokenProps)),
    );
  }
}

export class TwoFactorTokenFactory {
  static create(): TwoFactorTokenValidator {
    return new TwoFactorTokenValidator();
  }
}

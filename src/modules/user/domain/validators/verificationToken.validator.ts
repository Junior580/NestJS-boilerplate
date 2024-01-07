import { MaxLength, IsString, IsDate, IsNotEmpty } from 'class-validator';
import { VerificationTokenProps } from '../entities/verificationToken.entity';
import { ClassValidatorFields } from '@shared/domain/validators/class-validator-fields';

export class VerificationTokenRules {
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

  constructor({ email, token, expires }: VerificationTokenProps) {
    Object.assign(this, { email, token, expires });
  }
}

export class VerificationTokenValidator extends ClassValidatorFields<VerificationTokenRules> {
  validate(data: VerificationTokenRules): boolean {
    return super.validate(
      new VerificationTokenRules(data ?? ({} as VerificationTokenProps)),
    );
  }
}

export class VerificationTokenFactory {
  static create(): VerificationTokenValidator {
    return new VerificationTokenValidator();
  }
}

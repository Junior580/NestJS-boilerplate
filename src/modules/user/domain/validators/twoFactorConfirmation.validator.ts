import { MaxLength, IsString, IsNotEmpty } from 'class-validator';
import { ClassValidatorFields } from '@shared/domain/validators/class-validator-fields';
import { TwoFactorConfirmationProps } from '../entities/twoFactorConfirmation.entity';

export class TwoFactorConfirmationRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  user: string;

  constructor({ userId, user }: TwoFactorConfirmationProps) {
    Object.assign(this, { userId, user });
  }
}

export class TwoFactorConfirmationValidator extends ClassValidatorFields<TwoFactorConfirmationRules> {
  validate(data: TwoFactorConfirmationRules): boolean {
    return super.validate(
      new TwoFactorConfirmationRules(
        data ?? ({} as TwoFactorConfirmationProps),
      ),
    );
  }
}

export class TwoFactorConfirmationFactory {
  static create(): TwoFactorConfirmationValidator {
    return new TwoFactorConfirmationValidator();
  }
}

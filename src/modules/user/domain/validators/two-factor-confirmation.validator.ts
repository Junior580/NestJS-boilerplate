import { MaxLength, IsString, IsNotEmpty } from 'class-validator';
import { ClassValidatorFields } from '@shared/domain/validators/class-validator-fields';
import { TwoFactorConfirmationProps } from '../entities/two-factor-confirmation.entity';

export class TwoFactorConfirmationRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  userId: string;

  constructor({ userId }: TwoFactorConfirmationProps) {
    Object.assign(this, { userId });
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

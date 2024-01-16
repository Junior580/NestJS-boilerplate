import { Entity } from '@shared/domain/entities/entity';
import { EntityValidationError } from '@shared/domain/errors/validation-error';
import { TwoFactorConfirmationFactory } from '../validators/two-factor-confirmation.validator';

export interface TwoFactorConfirmationProps {
  userId: string;
}

export class TwoFactorConfirmationEntity extends Entity<TwoFactorConfirmationProps> {
  constructor(
    public readonly props: TwoFactorConfirmationProps,
    id?: string,
    createdAt?: Date,
  ) {
    TwoFactorConfirmationEntity.validate(props);
    super(props, id, createdAt);
  }

  get userId(): string {
    return this.props.userId;
  }

  static validate(props: TwoFactorConfirmationProps) {
    const validator = TwoFactorConfirmationFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

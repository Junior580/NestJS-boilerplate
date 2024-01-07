import { Entity } from '@shared/domain/entities/entity';
import { EntityValidationError } from '@shared/domain/errors/validation-error';
import { PasswordResetTokenFactory } from '../validators/passwordResetToken.validator';

export interface PasswordResetTokenProps {
  email: string;
  token: string;
  expires: Date;
}

export class PasswordResetTokenEntity extends Entity<PasswordResetTokenProps> {
  constructor(
    public readonly props: PasswordResetTokenProps,
    id?: string,
    createdAt?: Date,
  ) {
    PasswordResetTokenEntity.validate(props);
    super(props, id, createdAt);
  }

  get email(): string {
    return this.props.email;
  }

  get token(): string {
    return this.props.token;
  }

  get expires(): Date {
    return this.props.expires;
  }

  static validate(props: PasswordResetTokenProps) {
    const validator = PasswordResetTokenFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

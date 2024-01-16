import { Entity } from '@shared/domain/entities/entity';
import { EntityValidationError } from '@shared/domain/errors/validation-error';
import { TwoFactorTokenFactory } from '../validators/two-factor-token.validator';

export interface TwoFactorTokenProps {
  email: string;
  token: string;
  expires: Date;
}

export class TwoFactorTokenEntity extends Entity<TwoFactorTokenProps> {
  constructor(
    public readonly props: TwoFactorTokenProps,
    id?: string,
    createdAt?: Date,
  ) {
    TwoFactorTokenEntity.validate(props);
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

  static validate(props: TwoFactorTokenProps) {
    const validator = TwoFactorTokenFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

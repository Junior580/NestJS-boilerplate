import { EntityValidationError } from '../../../../shared/domain/errors/validation-error';
import { Entity } from '../../../../shared/domain/entities/entity';
import { VerificationTokenFactory } from '../validators/verificationToken.validator';

export interface VerificationTokenProps {
  email: string;
  token: string;
  expires: Date;
}

export class VerificationTokenEntity extends Entity<VerificationTokenProps> {
  constructor(
    public readonly props: VerificationTokenProps,
    id?: string,
    createdAt?: Date,
  ) {
    VerificationTokenEntity.validate(props);
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

  static validate(props: VerificationTokenProps) {
    const validator = VerificationTokenFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

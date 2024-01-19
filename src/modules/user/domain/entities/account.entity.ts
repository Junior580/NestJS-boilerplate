import { EntityValidationError } from '../../../../shared/domain/errors/validation-error';
import { Entity } from '../../../../shared/domain/entities/entity';
import { AccountValidatorFactory } from '../validators/account.validator';

export interface AccountProps {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  user: string;
}

export class AccountEntity extends Entity<AccountProps> {
  constructor(
    public readonly props: AccountProps,
    id?: string,
    createdAt?: Date,
  ) {
    AccountEntity.validate(props);
    super(props, id, createdAt);
  }

  get userId(): string {
    return this.props.userId;
  }

  get type(): string {
    return this.props.type;
  }

  get provider(): string {
    return this.props.provider;
  }

  get providerAccountId(): string {
    return this.props.providerAccountId;
  }

  get refresh_token(): string {
    return this.props.refresh_token;
  }

  get access_token(): string {
    return this.props.access_token;
  }

  get expires_at(): number {
    return this.props.expires_at;
  }

  get token_type(): string {
    return this.props.token_type;
  }

  get scope(): string {
    return this.props.scope;
  }

  get id_token(): string {
    return this.props.id_token;
  }

  get session_state(): string {
    return this.props.session_state;
  }

  get user(): string {
    return this.props.user;
  }

  static validate(props: AccountProps) {
    const validator = AccountValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

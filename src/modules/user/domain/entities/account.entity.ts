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
    if (!this.props.refresh_token) {
      throw new Error('No refresh_token setted');
    }
    return this.props.refresh_token;
  }

  get access_token(): string {
    if (!this.props.access_token) {
      throw new Error('No refresh_token setted');
    }
    return this.props.access_token;
  }

  get expires_at(): number {
    if (!this.props.expires_at) {
      throw new Error('No expires_at setted');
    }
    return this.props.expires_at;
  }

  get token_type(): string {
    if (!this.props.expires_at) {
      throw new Error('No expires_at setted');
    }
    return this.props.token_type;
  }

  get scope(): string {
    if (!this.props.scope) {
      throw new Error('No scope setted');
    }
    return this.props.scope;
  }

  get id_token(): string {
    if (!this.props.id_token) {
      throw new Error('No id_token setted');
    }
    return this.props.id_token;
  }

  get session_state(): string {
    if (!this.props.session_state) {
      throw new Error('No session_state setted');
    }
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

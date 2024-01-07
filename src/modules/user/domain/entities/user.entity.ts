import { EntityValidationError } from '../../../../shared/domain/errors/validation-error';
import { Entity } from '../../../../shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';

enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface UserProps {
  name: string;
  email: string;
  password: string;
  emailVerified?: Date;
  image?: string;
  role: UserRole;
  accounts: string[]; //ajustar o tipo para entity accounts
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation?: string[]; //ajustar o tipo para entity  twoFactorConfirmation
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
    createdAt?: Date,
  ) {
    UserEntity.validate(props);
    super(props, id, createdAt);
  }

  updatePassword(value: string): void {
    UserEntity.validate({
      ...this.props,
      password: value,
    });
    this.password = value;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get emailVerified(): Date {
    if (!this.props.emailVerified) {
      throw new Error('No emailVerified setted');
    }
    return this.props.emailVerified;
  }

  get image(): string {
    if (!this.props.image) {
      throw new Error('No image setted');
    }
    return this.props.image;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get accounts(): string[] {
    return this.props.accounts;
  }

  get isTwoFactorEnabled(): boolean {
    return this.props.isTwoFactorEnabled;
  }

  get twoFactorConfirmation(): string[] {
    if (!this.props.twoFactorConfirmation) {
      throw new Error('No twoFactorConfirmation setted');
    }
    return this.props.twoFactorConfirmation;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

import { EntityValidationError } from '../../../../shared/domain/errors/validation-error';
import { Entity } from '../../../../shared/domain/entities/entity';
import { UserValidatorFactory } from '../validators/user.validator';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  emailVerified?: Date;
  image?: string;
  role?: 'ADMIN' | 'USER';
  isTwoFactorEnabled?: boolean;
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    {
      name,
      email,
      password,
      emailVerified,
      image,
      role = 'USER',
      isTwoFactorEnabled = false,
    }: UserProps,
    id?: string,
    createdAt?: Date,
  ) {
    const defaultProps: UserProps = {
      name,
      email,
      password,
      emailVerified,
      image,
      role,
      isTwoFactorEnabled,
    };
    UserEntity.validate(defaultProps);
    super(defaultProps, id, createdAt);
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
    return this.props.emailVerified;
  }

  get image(): string {
    return this.props.image;
  }

  get role(): 'ADMIN' | 'USER' {
    return this.props.role;
  }

  get isTwoFactorEnabled(): boolean {
    return this.props.isTwoFactorEnabled;
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

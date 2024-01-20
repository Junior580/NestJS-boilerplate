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

  updateName(value: string): void {
    UserEntity.validate({
      ...this.props,
      name: value,
    });
    this.name = value;
  }

  updateEmail(value: string): void {
    UserEntity.validate({
      ...this.props,
      email: value,
    });
    this.email = value;
    this.emailVerified = undefined;
  }

  updatePassword(value: string): void {
    UserEntity.validate({
      ...this.props,
      password: value,
    });
    this.password = value;
  }

  updateRole(value: 'ADMIN' | 'USER'): void {
    UserEntity.validate({
      ...this.props,
      role: value,
    });
    this.role = value;
  }

  updateIsTwoFactorEnabled(value: boolean): void {
    UserEntity.validate({
      ...this.props,
      isTwoFactorEnabled: value,
    });
    this.isTwoFactorEnabled = value;
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

  private set name(value: string) {
    this.props.name = value;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  private set password(value: string) {
    this.props.password = value;
  }

  private set emailVerified(value: Date | undefined) {
    this.props.emailVerified = value;
  }

  private set isTwoFactorEnabled(value: boolean) {
    this.props.isTwoFactorEnabled = value;
  }

  private set role(value: 'ADMIN' | 'USER') {
    this.props.role = value;
  }

  static validate(props: UserProps) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

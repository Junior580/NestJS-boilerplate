import { ClassValidatorFields } from '../../../../shared/domain/validators/class-validator-fields';
import { AccountProps } from '../entities/account.entity';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AccountRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  type: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  provider: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  providerAccountId: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  refresh_token?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  access_token?: string;

  @MaxLength(255)
  @IsNumber()
  @IsOptional()
  expires_at?: number;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  token_type?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  scope?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  id_token?: string;

  @MaxLength(255)
  @IsString()
  @IsOptional()
  session_state?: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  user: string;

  constructor({
    userId,
    type,
    provider,
    providerAccountId,
    refresh_token,
    access_token,
    expires_at,
    token_type,
    scope,
    id_token,
    session_state,
    user,
  }: AccountProps) {
    Object.assign(this, {
      userId,
      type,
      provider,
      providerAccountId,
      refresh_token,
      access_token,
      expires_at,
      token_type,
      scope,
      id_token,
      session_state,
      user,
    });
  }
}

export class AccountValidator extends ClassValidatorFields<AccountRules> {
  validate(data: AccountRules): boolean {
    return super.validate(new AccountRules(data ?? ({} as AccountProps)));
  }
}

export class AccountValidatorFactory {
  static create(): AccountValidator {
    return new AccountValidator();
  }
}

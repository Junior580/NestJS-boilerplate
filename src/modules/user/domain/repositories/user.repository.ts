import { UserEntity } from '../entities/user.entity';
import {
  SearchParams as defaultSearchParams,
  SearchResult as defaultSearchResult,
  SearchableRepositoryInterface,
} from '@shared/domain/repositories/searchable-repository-contracts';
import { VerificationTokenEntity } from '../entities/verificationToken.entity';
import { TwoFactorTokenEntity } from '../entities/twoFactorToken.entity';
import { TwoFactorConfirmationEntity } from '../entities/twoFactorConfirmation.entity';

export type Filter = string;

export class UserSearchParams extends defaultSearchParams<Filter> {}

export class UserSearchResult extends defaultSearchResult<UserEntity, Filter> {}
export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
  emailExists(email: string): Promise<void>;
  getVerificationTokenByEmail(email: string): Promise<VerificationTokenEntity>;
  createVerificationToken(
    entity: VerificationTokenEntity,
  ): Promise<VerificationTokenEntity>;
  deteleVerificationToken(id: string): Promise<void>;
  getVerificationTokenByToken(token: string): Promise<VerificationTokenEntity>;
  updateUsererificationToken(userId: string, userEmail: string): Promise<void>;
  getTwoFactorTokenByEmail(email: string): Promise<TwoFactorTokenEntity>;
  deteleTwoFactorToken(id: string): Promise<void>;
  getTwoFactorConfirmationByUserId(
    userId: string,
  ): Promise<TwoFactorConfirmationEntity>;
  deteleTwoFactorConfirmation(id: string): Promise<void>;
  createTwoFactorConfirmation(
    entity: TwoFactorConfirmationEntity,
  ): Promise<TwoFactorConfirmationEntity>;
  createTwoFactorToken(
    entity: TwoFactorTokenEntity,
  ): Promise<TwoFactorTokenEntity>;
}

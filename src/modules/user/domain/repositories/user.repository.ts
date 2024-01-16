import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@shared/domain/repositories/searchable-repository-contracts';

import { UserEntity } from '../entities/user.entity';
import { VerificationTokenEntity } from '../entities/verificationToken.entity';
import { TwoFactorTokenEntity } from '../entities/twoFactorToken.entity';
import { TwoFactorConfirmationEntity } from '../entities/twoFactorConfirmation.entity';

export type Filter = string;

export class UserSearchParams extends DefaultSearchParams<Filter> {}

export class UserSearchResult extends DefaultSearchResult<UserEntity, Filter> {}

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity> {
  // Funções de busca (find) primeiro
  findByEmail(email: string): Promise<UserEntity | null>;
  userEmailExists(email: string): Promise<void>;

  // Funções relacionadas à entidade TwoFactorConfirmationEntity
  getTwoFactorConfirmationByUserId(
    userId: string,
  ): Promise<TwoFactorConfirmationEntity>;
  deleteTwoFactorConfirmation(id: string): Promise<void>;
  createTwoFactorConfirmation(
    entity: TwoFactorConfirmationEntity,
  ): Promise<TwoFactorConfirmationEntity>;

  // Funções relacionadas à entidade TwoFactorTokenEntity
  createTwoFactorToken(
    entity: TwoFactorTokenEntity,
  ): Promise<TwoFactorTokenEntity>;
}

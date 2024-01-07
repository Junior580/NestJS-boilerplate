// import { RepositoryInterface } from '@shared/domain/repositories/repository-contracts';
import { TwoFactorTokenEntity } from '../entities/twoFactorToken.entity';
import { UserEntity } from '../entities/user.entity';
import {
  SearchParams as defaultSearchParams,
  SearchResult as defaultSearchResult,
  SearchableRepositoryInterface,
} from '@shared/domain/repositories/searchable-repository-contracts';

export type Filter = string;

export class UserSearchParams extends defaultSearchParams<Filter> {}

export class UserSearchResult extends defaultSearchResult<UserEntity, Filter> {}
export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
  emailExists(email: string): Promise<void>;
  getVerificationTokenByEmail(email: string): Promise<TwoFactorTokenEntity>;
}

import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@shared/domain/repositories/searchable-repository-contracts';

import { UserEntity } from '../entities/user.entity';

export type Filter = string;

export class UserSearchParams extends DefaultSearchParams<Filter> {}

export class UserSearchResult extends DefaultSearchResult<UserEntity, Filter> {}

export interface UserRepository
  extends SearchableRepositoryInterface<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
  userEmailExists(email: string): Promise<void>;
}

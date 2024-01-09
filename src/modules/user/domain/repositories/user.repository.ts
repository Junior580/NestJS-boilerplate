import { UserEntity } from '../entities/user.entity';
import {
  SearchParams as defaultSearchParams,
  SearchResult as defaultSearchResult,
  SearchableRepositoryInterface,
} from '@shared/domain/repositories/searchable-repository-contracts';
import { VerificationTokenEntity } from '../entities/verificationToken.entity';

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
  deteleToken(id: string): Promise<void>;
}

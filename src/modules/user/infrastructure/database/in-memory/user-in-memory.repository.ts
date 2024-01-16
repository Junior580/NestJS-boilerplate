import { UserEntity } from '../../../domain/entities/user.entity';
import { InMemoryRepository } from '../../../../../shared/domain/repositories/in-memory.repository';
import { UserRepository } from '@modules/user/domain/repositories/user.repository';
import { TwoFactorConfirmationEntity } from '@modules/user/domain/entities/two-factor-confirmation.entity';
import { TwoFactorTokenEntity } from '@modules/user/domain/entities/two-factor-token.entity';
import { VerificationTokenEntity } from '@modules/user/domain/entities/verification-token.entity';
import {
  SearchParams,
  SearchResult,
} from '@shared/domain/repositories/searchable-repository-contracts';

export class UserInMemoryRepository
  extends InMemoryRepository<UserEntity>
  implements UserRepository
{
  sortableFields: string[] = ['name', 'createdAt'];
  private verificationTokenEntity: VerificationTokenEntity[] = [];

  async insert(entity: UserEntity): Promise<void> {
    this.items.push(entity);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find((item) => item.email === email);
    if (!entity) {
      throw new Error(`Entity not found using email ${email}`);
    }
    return entity;
  }

  async emailExists(email: string): Promise<void> {
    const entity = this.items.find((item) => item.email === email);
    if (entity) {
      throw new Error('Email address already used');
    }
  }

  async userEmailExists(email: string): Promise<void> {
    const entity = this.items.find((item) => item.email === email);
    if (entity) {
      throw new Error('Email address already used');
    }
  }

  async getVerificationTokenByEmail(
    email: string,
  ): Promise<VerificationTokenEntity> {
    const entity = this.verificationTokenEntity.find(
      (item) => item.email === email,
    );
    if (entity) {
      throw new Error('Email address already used');
    }
    return entity;
  }

  async createVerificationToken(
    entity: VerificationTokenEntity,
  ): Promise<VerificationTokenEntity> {
    this.verificationTokenEntity.push(entity);
    return entity;
  }

  async deleteVerificationToken(id: string): Promise<void> {
    const newArray = this.verificationTokenEntity.filter(
      (item) => item.id !== id,
    );

    if (newArray.length === this.verificationTokenEntity.length) {
      throw new Error('Item not found in the array');
    }
  }

  async getVerificationTokenByToken(
    token: string,
  ): Promise<VerificationTokenEntity> {
    return this.verificationTokenEntity.filter(
      (item) => item.token === token,
    )[0];
  }

  async updateUserVerificationToken(
    userId: string,
    userEmail: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getTwoFactorTokenByEmail(email: string): Promise<TwoFactorTokenEntity> {
    throw new Error('Method not implemented.');
  }
  deleteTwoFactorToken(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getTwoFactorConfirmationByUserId(
    userId: string,
  ): Promise<TwoFactorConfirmationEntity> {
    throw new Error('Method not implemented.');
  }
  deleteTwoFactorConfirmation(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  createTwoFactorConfirmation(
    entity: TwoFactorConfirmationEntity,
  ): Promise<TwoFactorConfirmationEntity> {
    throw new Error('Method not implemented.');
  }
  createTwoFactorToken(
    entity: TwoFactorTokenEntity,
  ): Promise<TwoFactorTokenEntity> {
    throw new Error('Method not implemented.');
  }
  search(
    props: SearchParams<string>,
  ): Promise<SearchResult<UserEntity, string>> {
    throw new Error('Method not implemented.');
  }
}

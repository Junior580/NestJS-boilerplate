import { UserEntity } from '../../../domain/entities/user.entity';
import { InMemoryRepository } from '../../../../../shared/domain/repositories/in-memory.repository';

export class UserInMemoryRepository extends InMemoryRepository<UserEntity> {
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
}

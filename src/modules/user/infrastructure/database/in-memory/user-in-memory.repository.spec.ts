import { UserEntity } from '../../../domain/entities/user.entity';
import { UserInMemoryRepository } from './user-in-memory.repository';

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new Error('Entity not found using email a@a.com'),
    );
  });

  it('Should find a entity by email - findByEmail method', async () => {
    const userProps = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secretpassword',
      createdAt: new Date('2023-01-01'),
    };
    const entity = new UserEntity(userProps);
    await sut.insert(entity);
    const result = await sut.findByEmail(entity.email);
    expect(entity.toJSON()).toStrictEqual(result.toJSON());
  });
});

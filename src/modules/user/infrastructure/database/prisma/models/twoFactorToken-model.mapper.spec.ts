import { PrismaClient, TwoFactorToken } from '@prisma/client';
import { TwoFactorTokenModelMapper } from './twoFactorToken-model.mapper';
import { TwoFactorTokenEntity } from '../../../../domain/entities/twoFactorToken.entity';

describe('UserModelMapper integration tests', () => {
  let prismaService: PrismaClient;

  let props: any;

  beforeAll(async () => {
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();

    const expires = new Date();
    const createdAt = new Date();
    props = {
      id: 'd4255494-f981-4d26-a2a1-35d3f5b8d36a',
      email: 'a@a.com',
      token: 'Test name',
      expires: expires,
      createdAt: createdAt,
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when user model is invalid', async () => {
    const model: TwoFactorToken = Object.assign(props, { email: null });
    expect(() => TwoFactorTokenModelMapper.toEntity(model)).toThrow(
      'An entity not be loaded',
    );
  });

  it('should convert a user model to a user entity', async () => {
    const model: TwoFactorToken = await prismaService.twoFactorToken.create({
      data: props,
    });
    const sut = TwoFactorTokenModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(TwoFactorTokenEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});

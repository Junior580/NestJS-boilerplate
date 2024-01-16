import { PrismaClient, TwoFactorToken } from '@prisma/client';
import { TwoFactorTokenModelMapper } from './two-factor-token-model.mapper';
import { TwoFactorTokenEntity } from '../../../../domain/entities/two-factor-token.entity';

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
    const createdAt = new Date('2024-01-16T01:42:21.317Z');
    props = {
      id: 'idteste',
      email: 'a@a.com',
      token: 'Test name',
      expires: expires,
      createdAt: new Date(),
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

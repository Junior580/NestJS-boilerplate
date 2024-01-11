import { PrismaClient, TwoFactorConfirmation } from '@prisma/client';
import { TwoFactorConfirmationModelMapper } from './twoFactorConfirmation-model.mapper';
import { TwoFactorConfirmationEntity } from '@modules/user/domain/entities/twoFactorConfirmation.entity';

describe('two factor confirmation integration tests', () => {
  let prismaService: PrismaClient;

  let props: any;

  beforeAll(async () => {
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.user.deleteMany();
    const createdAt = new Date('2024-01-11T02:46:32.309Z');

    props = {
      userId: 'a@a.com',
      id: 'd4255494-f981-4d26-a2a1-35d3f5b8d36a',
      createdAt,
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when two factor confirmation model is invalid', async () => {
    const model: TwoFactorConfirmation = Object.assign(props, { userId: null });
    expect(() => TwoFactorConfirmationModelMapper.toEntity(model)).toThrow(
      'An entity not be loaded',
    );
  });

  it('should convert a two factor confirmation model to a two factor confirmation entity', async () => {
    const model: TwoFactorConfirmation =
      await prismaService.twoFactorConfirmation.create({
        data: props,
      });
    const sut = TwoFactorConfirmationModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(TwoFactorConfirmationEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});

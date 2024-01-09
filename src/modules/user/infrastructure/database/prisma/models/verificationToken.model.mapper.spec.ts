import { PrismaClient, VerificationToken } from '@prisma/client';
import { VerificationTokenModelMapper } from './verification-token.model.mapper';
import { VerificationTokenEntity } from '../../../../domain/entities/verificationToken.entity';

describe('Verification token ModelMapper integration tests', () => {
  let prismaService: PrismaClient;

  let props: any;

  beforeAll(async () => {
    prismaService = new PrismaClient();
    await prismaService.$connect();
  });

  beforeEach(async () => {
    await prismaService.verificationToken.deleteMany();
    props = {
      id: 'd4255494-f981-4d26-a2a1-35d3f5b8d36a',
      email: 'user1@email.com',
      token: '3cdb5c32-04df-4c1f-bf10-8980f97d12a3',
      expires: new Date('2024-01-09T01:08:58.776Z'),
      createdAt: new Date(),
    };
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  it('should throws error when user model is invalid', async () => {
    const model: VerificationToken = Object.assign(props, { email: null });
    expect(() => VerificationTokenModelMapper.toEntity(model)).toThrow(
      'An entity not be loaded',
    );
  });

  it('should convert a user model to a user entity', async () => {
    const model: VerificationToken =
      await prismaService.verificationToken.create({
        data: props,
      });
    const sut = VerificationTokenModelMapper.toEntity(model);
    expect(sut).toBeInstanceOf(VerificationTokenEntity);
    expect(sut.toJSON()).toStrictEqual(props);
  });
});

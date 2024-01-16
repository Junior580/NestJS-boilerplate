import { TwoFactorTokenRepository } from '@modules/user/domain/repositories/two-factor-token.repository';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { TwoFactorTokenModelMapper } from '../models/two-factor-token-model.mapper';
import { TwoFactorTokenEntity } from '@modules/user/domain/entities/two-factor-token.entity';

export class VerificationTokenPrismaRepository
  implements TwoFactorTokenRepository
{
  constructor(private prismaService: PrismaService) {}

  async createTwoFactorToken(
    entity: TwoFactorTokenEntity,
  ): Promise<TwoFactorTokenEntity> {
    const twoFactorToken = await this.prismaService.twoFactorToken.create({
      data: entity.toJSON(),
    });

    return TwoFactorTokenModelMapper.toEntity(twoFactorToken);
  }

  async getTwoFactorTokenByEmail(email: string) {
    try {
      const verificationToken =
        await this.prismaService.twoFactorToken.findFirst({
          where: { email },
        });

      return TwoFactorTokenModelMapper.toEntity(verificationToken);
    } catch (error) {
      return null;
    }
  }

  async deleteTwoFactorToken(id: string): Promise<void> {
    await this.prismaService.twoFactorToken.delete({
      where: {
        id,
      },
    });
  }
}

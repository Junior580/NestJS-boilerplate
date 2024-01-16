import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { TwoFactorConfirmationRepository } from '@modules/user/domain/repositories/two-factor-confirmation.repository';
import { TwoFactorConfirmationEntity } from '@modules/user/domain/entities/two-factor-confirmation.entity';
import { TwoFactorConfirmationModelMapper } from '../models/two-factor-confirmation-model.mapper';

export class TwoFactorConfirmationPrismaRepository
  implements TwoFactorConfirmationRepository
{
  constructor(private prismaService: PrismaService) {}
  async createTwoFactorConfirmation(
    entity: TwoFactorConfirmationEntity,
  ): Promise<TwoFactorConfirmationEntity> {
    const twoFactorConfirmation =
      await this.prismaService.twoFactorConfirmation.create({
        data: entity.toJSON(),
      });

    return TwoFactorConfirmationModelMapper.toEntity(twoFactorConfirmation);
  }

  async getTwoFactorConfirmationByUserId(
    userId: string,
  ): Promise<TwoFactorConfirmationEntity> {
    try {
      const twoFactorConfirmation =
        await this.prismaService.twoFactorConfirmation.findUnique({
          where: { userId },
        });

      return TwoFactorConfirmationModelMapper.toEntity(twoFactorConfirmation);
    } catch {
      return null;
    }
  }

  async deleteTwoFactorConfirmation(id: string): Promise<void> {
    await this.prismaService.twoFactorConfirmation.delete({
      where: { id },
    });
  }
}

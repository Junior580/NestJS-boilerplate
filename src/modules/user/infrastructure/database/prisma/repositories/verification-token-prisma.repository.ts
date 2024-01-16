import { VerificationTokenEntity } from '@modules/user/domain/entities/verification-token.entity';
import { VerificationTokenRepository } from '@modules/user/domain/repositories/verification-token.repository';
import { VerificationTokenModelMapper } from '../models/verification-token-model.mapper';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';

export class VerificationTokenPrismaRepository
  implements VerificationTokenRepository
{
  constructor(private prismaService: PrismaService) {}

  async createVerificationToken(
    entity: VerificationTokenEntity,
  ): Promise<VerificationTokenEntity> {
    const verificationToken = await this.prismaService.verificationToken.create(
      {
        data: entity.toJSON(),
      },
    );

    return VerificationTokenModelMapper.toEntity(verificationToken);
  }

  async getVerificationTokenByToken(token: string) {
    try {
      const verificationToken =
        await this.prismaService.verificationToken.findUnique({
          where: { token },
        });

      return VerificationTokenModelMapper.toEntity(verificationToken);
    } catch (error) {
      return null;
    }
  }

  async getVerificationTokenByEmail(email: string) {
    try {
      const verificationToken =
        await this.prismaService.verificationToken.findFirst({
          where: { email },
        });

      return VerificationTokenModelMapper.toEntity(verificationToken);
    } catch (error) {
      return null;
    }
  }

  async updateUserVerificationToken(userId: string, userEmail: string) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { emailVerified: new Date(), email: userEmail },
    });
  }

  async deleteVerificationToken(id: string): Promise<void> {
    await this.prismaService.verificationToken.delete({
      where: {
        id,
      },
    });
  }
}

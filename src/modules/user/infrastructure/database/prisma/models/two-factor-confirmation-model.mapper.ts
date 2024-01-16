import { TwoFactorConfirmationEntity } from '@modules/user/domain/entities/two-factor-confirmation.entity';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { TwoFactorConfirmation as UserPrisma } from '@prisma/client';

export class TwoFactorConfirmationModelMapper {
  static toEntity(model: UserPrisma) {
    const data = {
      userId: model.userId,
    };
    try {
      return new TwoFactorConfirmationEntity(data, model.id);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}

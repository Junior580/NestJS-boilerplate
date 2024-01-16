import { TwoFactorTokenEntity } from '@modules/user/domain/entities/two-factor-token.entity';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { TwoFactorToken as UserPrisma } from '@prisma/client';

export class TwoFactorTokenModelMapper {
  static toEntity(model: UserPrisma) {
    const data = {
      email: model.email,
      token: model.token,
      expires: model.expires,
    };
    try {
      return new TwoFactorTokenEntity(data, model.id, model.createdAt);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}

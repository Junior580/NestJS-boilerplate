import { ValidationError } from '@shared/domain/errors/validation-error';
import { VerificationToken as VerificationTokenPrisma } from '@prisma/client';
import { VerificationTokenEntity } from '@modules/user/domain/entities/verification-token.entity';

export class VerificationTokenModelMapper {
  static toEntity(model: VerificationTokenPrisma) {
    const data = {
      id: model.id,
      email: model.email,
      token: model.token,
      expires: model.expires,
      createdAt: model.createdAt,
    };
    try {
      return new VerificationTokenEntity(data, model.id);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}

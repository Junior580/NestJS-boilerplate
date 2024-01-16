import { ValidationError } from '@shared/domain/errors/validation-error';
import { VerificationToken as VerificationTokenPrisma } from '@prisma/client';
import { VerificationTokenEntity } from '@modules/user/domain/entities/verification-token.entity';

export class VerificationTokenModelMapper {
  static toEntity(model: VerificationTokenPrisma) {
    const data = {
      email: model.email,
      token: model.token,
      expires: model.expires,
    };
    try {
      return new VerificationTokenEntity(data, model.id, model.createdAt);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}

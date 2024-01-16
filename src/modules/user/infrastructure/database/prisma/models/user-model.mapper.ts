import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ValidationError } from '@shared/domain/errors/validation-error';
import { User as UserPrisma } from '@prisma/client';

export class UserModelMapper {
  static toEntity(model: UserPrisma) {
    const data = {
      name: model.name,
      email: model.email,
      password: model.password,
      emailVerified: model.emailVerified,
      image: model.image,
      role: model.role,
      isTwoFactorEnabled: model.isTwoFactorEnabled,
    };
    try {
      return new UserEntity(data, model.id, model.createdAt);
    } catch {
      throw new ValidationError('An entity not be loaded');
    }
  }
}

import { UserEntity } from '@modules/user/domain/entities/user.entity';

export type UserOutput = {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: Date;
  image: string;
  role: 'ADMIN' | 'USER';
  isTwoFactorEnabled: boolean;
  createdAt: Date;
};

export class UserOutputMapper {
  static toOutput(entity: UserEntity): UserOutput {
    return entity.toJSON();
  }
}

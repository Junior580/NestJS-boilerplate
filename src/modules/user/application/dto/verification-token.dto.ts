import { VerificationTokenEntity } from '@modules/user/domain/entities/verificationToken.entity';

export type VerificationTokenOutput = {
  email: string;
  token: string;
  expires: Date;
};

export class VerificationTokenMapper {
  static toOutput(entity: VerificationTokenEntity): VerificationTokenOutput {
    return entity.toJSON();
  }
}

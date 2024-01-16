import { VerificationTokenEntity } from '../entities/verification-token.entity';

export interface VerificationTokenRepository {
  createVerificationToken(
    entity: VerificationTokenEntity,
  ): Promise<VerificationTokenEntity>;
  getVerificationTokenByToken(token: string): Promise<VerificationTokenEntity>;
  getVerificationTokenByEmail(email: string): Promise<VerificationTokenEntity>;
  updateUserVerificationToken(userId: string, userEmail: string): Promise<void>;
  deleteVerificationToken(id: string): Promise<void>;
}

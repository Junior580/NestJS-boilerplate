import { TwoFactorTokenEntity } from '../entities/two-factor-token.entity';

export interface TwoFactorTokenRepository {
  createTwoFactorToken(
    entity: TwoFactorTokenEntity,
  ): Promise<TwoFactorTokenEntity>;
  getTwoFactorTokenByEmail(email: string): Promise<TwoFactorTokenEntity>;
  deleteTwoFactorToken(id: string): Promise<void>;
}

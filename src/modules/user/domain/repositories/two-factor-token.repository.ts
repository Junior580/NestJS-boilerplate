import { TwoFactorTokenEntity } from '../entities/two-factor-token.entity';

export interface TwoFactorTokenRepository {
  getTwoFactorTokenByEmail(email: string): Promise<TwoFactorTokenEntity>;
  deleteTwoFactorToken(id: string): Promise<void>;
}

import { TwoFactorConfirmationEntity } from '../entities/two-factor-confirmation.entity';

export interface TwoFactorConfirmationRepository {
  createTwoFactorConfirmation(
    entity: TwoFactorConfirmationEntity,
  ): Promise<TwoFactorConfirmationEntity>;

  getTwoFactorConfirmationByUserId(
    userId: string,
  ): Promise<TwoFactorConfirmationEntity>;

  deleteTwoFactorConfirmation(id: string): Promise<void>;
}

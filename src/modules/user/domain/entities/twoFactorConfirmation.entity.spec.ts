import { TwoFactorConfirmationEntity } from './twoFactorConfirmation.entity';

describe('Two Factor confirmation class', () => {
  let twoFactorConfirmation: TwoFactorConfirmationEntity;
  let twoFactorConfirmationProps: any;

  beforeEach(() => {
    TwoFactorConfirmationEntity.validate = jest.fn();

    const twoFactorConfirmationProps1 = {
      userId: 'email',
      user: 'Confirmation',
    };

    twoFactorConfirmationProps = twoFactorConfirmationProps1;

    twoFactorConfirmation = new TwoFactorConfirmationEntity(
      twoFactorConfirmationProps1,
    );
  });

  it('should have correct userId', () => {
    expect(twoFactorConfirmation.props.userId).toBe(
      twoFactorConfirmationProps.userId,
    );
  });

  it('constructor method', () => {
    expect(TwoFactorConfirmationEntity.validate).toHaveBeenCalled();
    expect(twoFactorConfirmation.props.userId).toBe(
      twoFactorConfirmationProps.userId,
    );
  });

  it('getter of userId field', () => {
    expect(twoFactorConfirmation.props.userId).toBeDefined();
    expect(twoFactorConfirmation.props.userId).toEqual(
      twoFactorConfirmationProps.userId,
    );
    expect(typeof twoFactorConfirmation.props.userId).toBe('string');
  });
});

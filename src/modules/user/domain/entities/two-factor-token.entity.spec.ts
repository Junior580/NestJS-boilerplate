import { TwoFactorTokenEntity } from './two-factor-token.entity';

describe('Two Factor Token class', () => {
  let twoFactorToken: TwoFactorTokenEntity;
  let twoFactorTokenProps: any;

  beforeEach(() => {
    TwoFactorTokenEntity.validate = jest.fn();

    const expires = new Date();

    const twoFactorTokenProps1 = {
      email: 'email',
      token: 'token',
      expires,
    };

    twoFactorTokenProps = twoFactorTokenProps1;

    twoFactorToken = new TwoFactorTokenEntity(twoFactorTokenProps1);
  });

  it('should have correct email', () => {
    expect(twoFactorToken.props.email).toBe(twoFactorTokenProps.email);
  });

  it('should have correct token', () => {
    expect(twoFactorToken.props.token).toBe(twoFactorTokenProps.token);
  });

  it('should have correct expires', () => {
    expect(twoFactorToken.props.expires).toBe(twoFactorTokenProps.expires);
  });

  it('constructor method', () => {
    expect(TwoFactorTokenEntity.validate).toHaveBeenCalled();
    expect(twoFactorToken.props.email).toBe(twoFactorTokenProps.email);
    expect(twoFactorToken.props.token).toBe(twoFactorTokenProps.token);
    expect(twoFactorToken.props.expires).toBe(twoFactorTokenProps.expires);
  });

  it('getter of email field', () => {
    expect(twoFactorToken.props.email).toBeDefined();
    expect(twoFactorToken.props.email).toEqual(twoFactorTokenProps.email);
    expect(typeof twoFactorToken.props.email).toBe('string');
  });

  it('getter of token field', () => {
    expect(twoFactorToken.props.token).toBeDefined();
    expect(twoFactorToken.props.token).toEqual(twoFactorTokenProps.token);
    expect(typeof twoFactorToken.props.token).toBe('string');
  });

  it('getter of expires field', () => {
    expect(twoFactorToken.props.expires).toBeDefined();
    expect(twoFactorToken.props.expires).toEqual(twoFactorTokenProps.expires);
    expect(twoFactorToken.props.expires).toBeInstanceOf(Date);
  });
});

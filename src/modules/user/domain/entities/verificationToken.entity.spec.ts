import { VerificationTokenEntity } from './verificationToken.entity';

describe('Verification Token class', () => {
  let verificationToken: VerificationTokenEntity;
  let verificationTokenProps: any;

  beforeEach(() => {
    VerificationTokenEntity.validate = jest.fn();

    const expires = new Date();

    const verificationTokenProps1 = {
      email: 'email',
      token: 'token',
      expires,
    };

    verificationTokenProps = verificationTokenProps1;

    verificationToken = new VerificationTokenEntity(verificationTokenProps);
  });

  it('should have correct email', () => {
    expect(verificationToken.props.email).toBe(verificationToken.email);
  });

  it('should have correct token', () => {
    expect(verificationToken.props.token).toBe(verificationTokenProps.token);
  });

  it('should have correct expires', () => {
    expect(verificationToken.props.expires).toBe(
      verificationTokenProps.expires,
    );
  });

  it('constructor method', () => {
    expect(VerificationTokenEntity.validate).toHaveBeenCalled();
    expect(verificationToken.props.email).toBe(verificationTokenProps.email);
    expect(verificationToken.props.token).toBe(verificationTokenProps.token);
    expect(verificationToken.props.expires).toBe(
      verificationTokenProps.expires,
    );
  });

  it('getter of email field', () => {
    expect(verificationToken.props.email).toBeDefined();
    expect(verificationToken.props.email).toEqual(verificationTokenProps.email);
    expect(typeof verificationToken.props.email).toBe('string');
  });

  it('getter of token field', () => {
    expect(verificationToken.props.token).toBeDefined();
    expect(verificationToken.props.token).toEqual(verificationTokenProps.token);
    expect(typeof verificationToken.props.token).toBe('string');
  });

  it('getter of expires field', () => {
    expect(verificationToken.props.expires).toBeDefined();
    expect(verificationToken.props.expires).toEqual(
      verificationTokenProps.expires,
    );
    expect(verificationToken.props.expires).toBeInstanceOf(Date);
  });
});

import { PasswordResetTokenEntity } from './passwordResetToken.entity';

describe('User class', () => {
  let passwordReset: PasswordResetTokenEntity;
  let passwordResetProps: any;

  beforeEach(() => {
    PasswordResetTokenEntity.validate = jest.fn();

    const expires = new Date();

    const passwordResetProps1 = {
      email: 'email',
      token: 'token',
      expires,
    };

    passwordResetProps = passwordResetProps1;

    passwordReset = new PasswordResetTokenEntity(passwordResetProps1);
  });

  it('should have correct email', () => {
    expect(passwordReset.props.email).toBe(passwordResetProps.email);
  });

  it('should have correct token', () => {
    expect(passwordReset.props.token).toBe(passwordResetProps.token);
  });

  it('should have correct expires', () => {
    expect(passwordReset.props.expires).toBe(passwordResetProps.expires);
  });

  it('constructor method', () => {
    expect(PasswordResetTokenEntity.validate).toHaveBeenCalled();
    expect(passwordReset.props.email).toBe(passwordResetProps.email);
    expect(passwordReset.props.token).toBe(passwordResetProps.token);
    expect(passwordReset.props.expires).toBe(passwordResetProps.expires);
  });

  it('getter of email field', () => {
    expect(passwordReset.props.email).toBeDefined();
    expect(passwordReset.props.email).toEqual(passwordResetProps.email);
    expect(typeof passwordReset.props.email).toBe('string');
  });

  it('getter of token field', () => {
    expect(passwordReset.props.token).toBeDefined();
    expect(passwordReset.props.token).toEqual(passwordResetProps.token);
    expect(typeof passwordReset.props.token).toBe('string');
  });

  it('getter of expires field', () => {
    expect(passwordReset.props.expires).toBeDefined();
    expect(passwordReset.props.expires).toEqual(passwordResetProps.expires);
    expect(passwordReset.props.expires).toBeInstanceOf(Date);
  });
});

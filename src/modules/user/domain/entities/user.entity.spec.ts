import { UserEntity } from './user.entity';

describe('User class', () => {
  let user: UserEntity;
  let userProps: any;

  beforeEach(() => {
    UserEntity.validate = jest.fn();

    const emailVerified = new Date();

    const userProps1 = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secretpassword',
      emailVerified,
      image: 'string',
      role: 'UserRole',
      isTwoFactorEnabled: true,
    };

    userProps = userProps1;

    user = new UserEntity(userProps);
  });

  it('should have correct name', () => {
    expect(user.name).toBe(userProps.name);
  });

  it('should have correct email', () => {
    expect(user.email).toBe(userProps.email);
  });

  it('should have correct password', () => {
    expect(user.password).toBe(userProps.password);
  });

  it('should have correct emailVerified', () => {
    expect(user.emailVerified).toBe(userProps.emailVerified);
  });
  it('should have correct image', () => {
    expect(user.image).toBe(userProps.image);
  });
  it('should have correct role', () => {
    expect(user.role).toBe(userProps.role);
  });

  it('should have correct isTwoFactorEnabled', () => {
    expect(user.isTwoFactorEnabled).toBe(userProps.isTwoFactorEnabled);
  });

  it('constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(user.props.name).toBe(userProps.name);
    expect(user.props.email).toBe(userProps.email);
    expect(user.props.password).toBe(userProps.password);
    expect(user.props.emailVerified).toBe(userProps.emailVerified);
    expect(user.props.image).toBe(userProps.image);
    expect(user.props.role).toBe(userProps.role);
    expect(user.props.isTwoFactorEnabled).toBe(userProps.isTwoFactorEnabled);

    expect(user.createdAt).toBeInstanceOf(Date);
  });

  it('getter of name field', () => {
    expect(user.props.name).toBeDefined();
    expect(user.props.name).toEqual(userProps.name);
    expect(typeof user.props.name).toBe('string');
  });

  it('getter of email field', () => {
    expect(user.props.email).toBeDefined();
    expect(user.props.email).toEqual(userProps.email);
    expect(typeof user.props.email).toBe('string');
  });

  it('getter of password field', () => {
    expect(user.props.password).toBeDefined();
    expect(user.props.password).toEqual(userProps.password);
    expect(typeof user.props.password).toBe('string');
  });

  it('getter of emailVerified field', () => {
    expect(user.props.emailVerified).toBeDefined();
    expect(user.props.emailVerified).toEqual(userProps.emailVerified);
    expect(user.props.emailVerified).toBeInstanceOf(Date);
  });

  it('getter of image field', () => {
    expect(user.props.image).toBeDefined();
    expect(user.props.image).toEqual(userProps.image);
    expect(typeof user.props.image).toBe('string');
  });

  it('getter of role field', () => {
    expect(user.props.role).toBeDefined();
    expect(user.props.role).toEqual(userProps.role);
    expect(typeof user.props.role).toBe('string');
  });

  it('getter of isTwoFactorEnabled field', () => {
    expect(user.props.isTwoFactorEnabled).toBeDefined();
    expect(user.props.isTwoFactorEnabled).toEqual(userProps.isTwoFactorEnabled);
    expect(typeof user.props.isTwoFactorEnabled).toBe('boolean');
  });
});

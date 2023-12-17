import { UserEntity } from './user.entity';

describe('User class', () => {
  let user: UserEntity;
  let userProps: any;

  beforeEach(() => {
    UserEntity.validate = jest.fn();
    const userProps1 = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secretpassword',
      createdAt: new Date('2023-01-01'),
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

  it('should have correct createdAt', () => {
    expect(user.props.createdAt).toEqual(userProps.createdAt);
  });

  it('constructor method', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(user.props.name).toBe(userProps.name);
    expect(user.props.email).toBe(userProps.email);
    expect(user.props.password).toBe(userProps.password);
    expect(user.props.createdAt).toBeInstanceOf(Date);
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
});

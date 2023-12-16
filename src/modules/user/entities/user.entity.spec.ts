import { User } from './user.entity'; // Update the path accordingly

describe('User class', () => {
  const userProps = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secretpassword',
    createdAt: new Date('2023-01-01'),
  };

  const user = new User(userProps);

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
});

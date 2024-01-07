import { AccountEntity } from './account.entity';

describe('Account class', () => {
  let account: AccountEntity;
  let accountProps: any;

  beforeEach(() => {
    AccountEntity.validate = jest.fn();

    const accountProps1 = {
      userId: 'userId1',
      type: 'type1',
      provider: 'provider1',
      providerAccountId: 'AccountEntity',
      refresh_token: 'refresh_token',
      access_token: 'access_token',
      expires_at: 123,
      token_type: 'token_type',
      scope: 'scope',
      id_token: 'id_token',
      session_state: 'session_state',
      user: 'user1',
    };

    accountProps = accountProps1;

    account = new AccountEntity(accountProps);
  });

  it('should have correct userId', () => {
    expect(account.userId).toBe(account.userId);
  });

  it('should have correct type', () => {
    expect(account.type).toBe(accountProps.type);
  });

  it('should have correct provider', () => {
    expect(account.provider).toBe(accountProps.provider);
  });

  it('should have correct providerAccountId', () => {
    expect(account.providerAccountId).toBe(accountProps.providerAccountId);
  });
  it('should have correct refresh_token', () => {
    expect(account.refresh_token).toBe(accountProps.refresh_token);
  });
  it('should have correct access_token', () => {
    expect(account.access_token).toBe(accountProps.access_token);
  });
  it('should have correct expires_at', () => {
    expect(account.expires_at).toBe(accountProps.expires_at);
  });
  it('should have correct token_type', () => {
    expect(account.token_type).toBe(accountProps.token_type);
  });
  it('should have correct scope', () => {
    expect(account.scope).toBe(accountProps.scope);
  });
  it('should have correct id_token', () => {
    expect(account.id_token).toBe(accountProps.id_token);
  });
  it('should have correct session_state', () => {
    expect(account.session_state).toBe(accountProps.session_state);
  });
  it('should have correct account', () => {
    expect(account.user).toBe(accountProps.user);
  });

  it('constructor method', () => {
    expect(AccountEntity.validate).toHaveBeenCalled();
    expect(account.props.userId).toBe(accountProps.userId);
    expect(account.props.type).toBe(accountProps.type);
    expect(account.props.provider).toBe(accountProps.provider);
    expect(account.props.providerAccountId).toBe(
      accountProps.providerAccountId,
    );
    expect(account.props.refresh_token).toBe(accountProps.refresh_token);
    expect(account.props.access_token).toBe(accountProps.access_token);
    expect(account.props.expires_at).toBe(accountProps.expires_at);
    expect(account.props.token_type).toBe(accountProps.token_type);
    expect(account.props.scope).toBe(accountProps.scope);
    expect(account.props.id_token).toBe(accountProps.id_token);
    expect(account.props.session_state).toBe(accountProps.session_state);
    expect(account.props.user).toBe(accountProps.user);

    expect(account.createdAt).toBeInstanceOf(Date);
  });

  it('getter of userId field', () => {
    expect(account.props.userId).toBeDefined();
    expect(account.props.userId).toEqual(accountProps.userId);
    expect(typeof account.props.userId).toBe('string');
  });

  it('getter of type field', () => {
    expect(account.props.type).toBeDefined();
    expect(account.props.type).toEqual(accountProps.type);
    expect(typeof account.props.type).toBe('string');
  });

  it('getter of provider field', () => {
    expect(account.props.provider).toBeDefined();
    expect(account.props.provider).toEqual(accountProps.provider);
    expect(typeof account.props.provider).toBe('string');
  });

  it('getter of providerAccountId field', () => {
    expect(account.props.providerAccountId).toBeDefined();
    expect(account.props.providerAccountId).toEqual(
      accountProps.providerAccountId,
    );
    expect(typeof account.props.providerAccountId).toBe('string');
  });

  it('getter of refresh_token field', () => {
    expect(account.props.refresh_token).toBeDefined();
    expect(account.props.refresh_token).toEqual(accountProps.refresh_token);
    expect(typeof account.props.refresh_token).toBe('string');
  });

  it('getter of access_token field', () => {
    expect(account.props.access_token).toBeDefined();
    expect(account.props.access_token).toEqual(accountProps.access_token);
    expect(typeof account.props.access_token).toBe('string');
  });

  it('getter of expires_at field', () => {
    expect(account.props.expires_at).toBeDefined();
    expect(account.props.expires_at).toEqual(accountProps.expires_at);
    expect(typeof account.props.expires_at).toBe('number');
  });

  it('getter of token_type field', () => {
    expect(account.props.token_type).toBeDefined();
    expect(account.props.token_type).toEqual(accountProps.token_type);
    expect(typeof account.props.token_type).toBe('string');
  });

  it('getter of scope field', () => {
    expect(account.props.scope).toBeDefined();
    expect(account.props.scope).toEqual(accountProps.scope);
    expect(typeof account.props.scope).toBe('string');
  });

  it('getter of id_token field', () => {
    expect(account.props.id_token).toBeDefined();
    expect(account.props.id_token).toEqual(accountProps.id_token);
    expect(typeof account.props.id_token).toBe('string');
  });

  it('getter of session_state field', () => {
    expect(account.props.session_state).toBeDefined();
    expect(account.props.session_state).toEqual(accountProps.session_state);
    expect(typeof account.props.session_state).toBe('string');
  });

  it('getter of user field', () => {
    expect(account.props.user).toBeDefined();
    expect(account.props.user).toEqual(accountProps.user);
    expect(typeof account.props.user).toBe('string');
  });
});

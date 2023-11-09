const Accounts = require('../src/Accounts').default;
describe('Test register account', () => {
  const accounts = new Accounts();

  it('should success and return registered account', () => {
    const account = accounts.register({ role: 'admin', name: 'Tom', password: '123' });
    expect(account).toEqual({ id: 0, role: 'admin', name: 'Tom', password: '123' });
  });

  it('should verify arguments', () => {
    const error = accounts.register({ role: 'user', password: '321' });
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid account information');
    const error1 = accounts.register({ password: '321' });
    expect(error1).toBeInstanceOf(Error);
    expect(error1.message).toBe('Invalid account information');
    const error2 = accounts.register({ role: 'user' });
    expect(error2).toBeInstanceOf(Error);
    expect(error2.message).toBe('Invalid account information');
  });

  it('should check if account is registered by name', () => {
    accounts.register({ role: 'admin', name: 'Jim', password: '123' });
    const error = accounts.register({ role: 'user', name: 'Jim', password: '321' });
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Account already exists');
  })

  it('should check if account is registered by role user or admin', () => {
    const error = accounts.register({ role: 'super', name: 'Jack', password: '321' });
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid account role');
  });
});

describe('Test login account', () => {
  const accounts = new Accounts();
  accounts.register({ role: 'admin', name: 'Tom', password: '123' });
  accounts.register({ role: 'user', name: 'Jim', password: '123' });

  it('should success and return account', () => {
    const account = accounts.login({ name: 'Tom', password: '123' });
    expect(account).toEqual({ id: 0, role: 'admin', name: 'Tom', password: '123' });
  });

  it('should verify arguments', () => {
    const error = accounts.login({ name: 'Tom' });
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Invalid account information');
    const error1 = accounts.login({ password: '321' });
    expect(error1).toBeInstanceOf(Error);
    expect(error1.message).toBe('Invalid account information');
  });

  it('should fail if account not exit', () => {
    const account = accounts.login({ name: 'Jack', password: '123' });
    expect(account).toBeInstanceOf(Error);
    expect(account.message).toBe('Account not exists');
  });
});
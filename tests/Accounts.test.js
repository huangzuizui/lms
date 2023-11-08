const Accounts = require('../src/Accounts').default;
describe('Test register account', () => {
  const accounts = new Accounts();

  it('should return registered account', () => {
    const account = accounts.register({ role: 'admin', name: 'Tom', password: '123' });
    expect(account).toEqual({ id: 0, role: 'admin', name: 'Tom', password: '123' });
  });

  it('should verify arguments', () => {
    expect(() => accounts.register({ role: 'user', password: '321' })).toThrow('Invalid account information');
    expect(() => accounts.register({ password: '321' })).toThrow('Invalid account information');
    expect(() => accounts.register({ role: 'user' })).toThrow('Invalid account information');
  });

  it('should check if account is registered by name', () => {
    accounts.register({ role: 'admin', name: 'Jim', password: '123' });
    expect(() => accounts.register({ role: 'user', name: 'Jim', password: '321' })).toThrow('Account already exists');
  })

  it('should check if account is registered by role user or admin', () => {
    expect(() => accounts.register({ role: 'super', name: 'Jack', password: '321' })).toThrow('Invalid account role');
  });
});

describe('Test login account', () => {
  const accounts = new Accounts();
  accounts.register({ role: 'admin', name: 'Tom', password: '123' });
  accounts.register({ role: 'user', name: 'Jim', password: '123' });

  it('should return account', () => {
    const account = accounts.login({ name: 'Tom', password: '123' });
    expect(account).toEqual({ id: 0, role: 'admin', name: 'Tom', password: '123' });
  });

  it('should verify arguments', () => {
    expect(() => accounts.login({ role: 'Tom' })).toThrow('Invalid account information');
    expect(() => accounts.login({ password: '321' })).toThrow('Invalid account information');
  });

  it('should return undefined if account is not registered', () => {
    const account = accounts.login({ name: 'Jack', password: '123' });
    expect(account).toEqual(undefined);
  });
});
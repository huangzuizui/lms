const Data = require('./data').default;

class Accounts {
  constructor() {
    this.data = new Data();
  }

  register({ role, name, password }) {
    if (!role || !name || !password) {
      return new Error('Invalid account information');
    }
    if (this.data.find({ name }).length > 0) {
      return new Error(`Account ${name} already exists`);
    }
    if (role !== 'admin' && role !== 'user') {
      return new Error('Invalid account role');
    }
    return this.data.add({ role, name, password });
  }

  login({ name, password }) {
    if (!name || !password) {
      return new Error('Invalid account information');
    }
    const [account] = this.data.find({ name, password });
    if (!account) {
      return new Error('Account not exists');
    }
    return account;
  }
}

exports.default = Accounts;
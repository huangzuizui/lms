const Data = require('./data').default;
class Accounts {
  constructor() {
    this.data = new Data();
  }

  register({ role, name, password }) {
    if (!role || !name || !password) {
      throw new Error('Invalid account information');
    }
    if (this.data.find({ name }).length > 0) {
      throw new Error('Account already exists');
    }
    if (role !== 'admin' && role !== 'user') {
      throw new Error('Invalid account role');
    }
    return this.data.add({ role, name, password });
  }

  login({ name, password }) {
    if (!name || !password) {
      throw new Error('Invalid account information');
    }
    const [account] = this.data.find({ name, password });
    return account;
  }
}

exports.default = Accounts;
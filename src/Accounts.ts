import Data from './Data';

type TRegisterArgs = {
  role: string;
  name: string;
  password: string;
}

type TLoginArgs = {
  name: string;
  password: string;
}

class Accounts {
  data: Data;
  constructor() {
    this.data = new Data();
  }

  register({ role, name, password }: TRegisterArgs) {
    if (!role || !name || !password) {
      return new Error('Invalid account information');
    }
    const res = this.data.find({ name });
    if (res instanceof Error) {
      return res;
    }
    if (res.length > 0) {
      return new Error(`Account ${name} already exists`);
    }
    if (role !== 'admin' && role !== 'user') {
      return new Error('Invalid account role');
    }
    return this.data.add({ role, name, password });
  }

  login({ name, password }: TLoginArgs) {
    if (!name || !password) {
      return new Error('Invalid account information');
    }
    const res = this.data.find({ name, password });
    if (res instanceof Error) {
      return res;
    }
    const [account] = res;
    if (!account) {
      return new Error('Account not exists');
    }
    return account;
  }
}

export default Accounts;
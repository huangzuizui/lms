const Data = require('../src/data').default;

class BorrowRecords {
  constructor() {
    this.data = new Data();
  }

  add({ userId, bookName, author }) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Please input userId, bookName and author.`);
    }
    return this.data.add({ userId, bookName, author });
  }

  remove({ userId, bookName, author } = {}) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Please input userId, bookName and author.`);
    }
    const records = this.data.find({ userId, bookName, author });
    if (!records || records.length === 0) {
      console.log(`Cannot find borrow record.`);
      return;
    }
    return this.data.removeById(records[0].id);
  }
}

exports.default = BorrowRecords;
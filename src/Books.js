const Data = require('../src/data').default;
class Books {
  constructor() {
    this.data = new Data();
  }

  add({ bookName, author, amount }) {
    if (!bookName) {
      return new Error('bookName is required');
    }
    if (!author) {
      return new Error('author is required');
    }
    if (!Number.isInteger(amount) || amount < 0) {
      return new Error('amount is required and should be a positive integer');
    }
    const [book] = this.data.find({ bookName, author });
    if (!book) {
      return {
        book: this.data.add({ bookName, author, inventory: amount }),
        type: 'add',
      }
    } else {
      return {
        book: this.data.updateById(book.id, { inventory: book.inventory + amount }),
        type: 'update',
      }
    }
  }

  list() {
    return this.data.list();
  }

  search({ bookName, author }) {
    return this.data.find({ bookName, author });
  }

  remove({ bookName, author }) {
    if (!bookName) {
      return new Error('bookName is required');
    }
    if (!author) {
      return new Error('author is required');
    }
    const [book] = this.data.find({ bookName, author });
    if (!book) {
      console.log(`remove book failed: cannot find book ${bookName} - ${author}`);
      return;
    }
    return this.data.removeById(book.id);
  }
}

exports.default = Books;
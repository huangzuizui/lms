const Accounts = require('./Accounts').default;
const Books = require('./Books').default;
const BorrowRecords = require('./BorrowRecords').default;

class Library {
  constructor() {
    this.accounts = new Accounts();
    this.books = new Books();
    this.borrowRecords = new BorrowRecords();
  }

  borrowBook({ userId, bookName, author }) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Cannot borrow book, missing arguments`);
    }
    if (this.accounts.data.find({ id: userId }).length === 0) {
      return new Error(`Cannot find user ${userId}`);
    }
    const [book] = this.books.search({ bookName, author });
    if (!book) {
      return new Error(`Cannot find book ${bookName} - ${author}`);
    }
    if (book.inventory === 0) {
      return new Error(`No book ${bookName} - ${author} left`);
    }
    this.books.data.updateById(book.id, { inventory: book.inventory - 1 });
    return this.borrowRecords.add({ userId, bookName, author });
  }

  returnBook({ userId, bookName, author }) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Cannot borrow book, missing arguments`);
    }
    if (this.accounts.data.find({ id: userId }).length === 0) {
      return new Error(`Cannot find user ${userId}`);
    }
    const [book] = this.books.search({ bookName, author});
    if (!book) {
      return new Error(`Cannot find book ${bookName} - ${author}`);
    }
    this.books.data.updateById(book.id, { inventory: book.inventory + 1 });
    return this.borrowRecords.remove({ userId, bookName, author });
  }

  deleteBook({bookName, author, userId}) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Cannot delete book, missing arguments`);
    }
    if (this.accounts.data.find({ id: userId }).length === 0) {
      return new Error(`Cannot find userId ${userId}`);
    }
    if (this.accounts.data.find({ id: userId })[0].role !== 'admin') {
      return new Error(`Only admin can delete book`);
    }
    const [book] = this.books.data.find({ bookName, author });
    if (!book) {
      return new Error(`Cannot find book ${bookName} - ${author}`);
    }
    const records = this.borrowRecords.data.find({ bookName, author });
    if (records && records.length > 0) {
      return new Error(`Cannot delete book ${bookName} - ${author} because it is currently borrowed.`);
    }
    return this.books.remove({ bookName, author });
  }
}

exports.default = Library;
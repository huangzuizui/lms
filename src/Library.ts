import Accounts from './Accounts';
import Books from './Books';
import BorrowRecords from './BorrowRecords';

type TBorrowBookArgs = { userId: number, bookName: string, author: string };
type TReturnBookArgs = TBorrowBookArgs;
type TDeleteBookArgs = TBorrowBookArgs;

class Library {
  accounts: Accounts;
  books: Books;
  borrowRecords: BorrowRecords;

  constructor() {
    this.accounts = new Accounts();
    this.books = new Books();
    this.borrowRecords = new BorrowRecords();
  }

  borrowBook({ userId, bookName, author }: TBorrowBookArgs) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Cannot borrow book, missing arguments`);
    }
    const accountsRes = this.accounts.data.find({ id: userId });
    if (accountsRes instanceof Error) {
      return accountsRes;
    }

    if (accountsRes.length === 0) {
      return new Error(`Cannot find user ${userId}`);
    }

    const booksRes = this.books.search({ bookName, author });
    if (booksRes instanceof Error) {
      return booksRes;
    }
    const [book] = booksRes;
    if (!book) {
      return new Error(`Cannot find book ${bookName} - ${author}`);
    }
    if (book.inventory === 0) {
      return new Error(`No book ${bookName} - ${author} left`);
    }
    this.books.data.updateById(book.id, { inventory: book.inventory - 1 });
    return this.borrowRecords.add({ userId, bookName, author });
  }

  returnBook({ userId, bookName, author }: TReturnBookArgs) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Cannot borrow book, missing arguments`);
    }
    const accountsRes = this.accounts.data.find({ id: userId });
    if (accountsRes instanceof Error) {
      return accountsRes;
    }
    if (accountsRes.length === 0) {
      return new Error(`Cannot find user ${userId}`);
    }
    const booksRes = this.books.search({ bookName, author });
    if (booksRes instanceof Error) {
      return booksRes;
    }
    const [book] = booksRes;
    if (!book) {
      return new Error(`Cannot find book ${bookName} - ${author}`);
    }
    this.books.data.updateById(book.id, { inventory: book.inventory + 1 });
    return this.borrowRecords.remove({ userId, bookName, author });
  }

  deleteBook({ bookName, author, userId }: TDeleteBookArgs) {
    if (userId === undefined || !bookName || !author) {
      return new Error(`Cannot delete book, missing arguments`);
    }
    const accountsRes = this.accounts.data.find({ id: userId });
    if (accountsRes instanceof Error) {
      return accountsRes;
    }
    const [account] = accountsRes;
    if (!account) {
      return new Error(`Cannot find userId ${userId}`);
    }
    if (account.role !== 'admin') {
      return new Error(`Only admin can delete book`);
    }

    const booksRes = this.books.data.find({ bookName, author });
    if (booksRes instanceof Error) {
      return booksRes;
    }
    const [book] = booksRes;
    if (!book) {
      return new Error(`Cannot find book ${bookName} - ${author}`);
    }
    const records = this.borrowRecords.data.find({ bookName, author });
    if (records instanceof Error) {
      return records;
    }
    if (records && records.length > 0) {
      return new Error(`Cannot delete book ${bookName} - ${author} because it is currently borrowed.`);
    }
    return this.books.remove({ bookName, author });
  }
}

export default Library;
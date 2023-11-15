import Data from './Data';

type TAddBookArgs =  { bookName: string, author: string, amount: number };
type TBookArgs =  { bookName: string, author: string };
export type TBook = { id: number, bookName: string, author: string, inventory: number };

class Books {
  data: Data;

  constructor() {
    this.data = new Data();
  }

  add({ bookName, author, amount }: TAddBookArgs) {
    if (!bookName) {
      return new Error('bookName is required');
    }
    if (!author) {
      return new Error('author is required');
    }
    if (!Number.isInteger(amount) || amount < 0) {
      return new Error('amount is required and should be a positive integer');
    }
    const res = this.data.find({ bookName, author });
    if (res instanceof Error) {
      return res;
    }
    const [book] = res;
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

  search({ bookName, author }: TBookArgs) {
    return this.data.find({ bookName, author });
  }

  remove({ bookName, author }: TBookArgs) {
    if (!bookName) {
      return new Error('bookName is required');
    }
    if (!author) {
      return new Error('author is required');
    }
    const res = this.data.find({ bookName, author });
    if (res instanceof Error) {
      return res;
    }
    const [book] = res;
    if (!book) {
      console.log(`remove book failed: cannot find book ${bookName} - ${author}`);
      return;
    }
    return this.data.removeById(book.id);
  }
}

export default Books;
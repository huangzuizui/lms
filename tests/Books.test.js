const { default: Data } = require('../src/Data');
const Books = require('../src/Books').default;
describe('Test create books', () => {
  const books = new Books();
  const book0 = { author: 'Tom', amount: 3, bookName: 'Foo' };
  const book1 = { author: 'Jim', amount: 5, bookName: 'Bar' };
  const book2 = { author: 'Jimmy', amount: 0, bookName: 'Baz' };

  it('should add an auto autoIncrement id when adding new book', () => {
    const returnData = books.add(book0);
    expect(returnData).toEqual({ id: 0, author: 'Tom', inventory: 3, bookName: 'Foo' });
    const returnData1 = books.add(book1);
    expect(returnData1).toEqual({ id: 1, author: 'Jim', inventory: 5, bookName: 'Bar' });
    const returnData2 = books.add(book2);
    expect(returnData2).toEqual({ id: 2, author: 'Jimmy', inventory: 0, bookName: 'Baz' });
  });

  it('should merge to inventory when adding existing book', () => {
    const book3 = { author: 'Jack', amount: 3, bookName: 'Baz' };
    const book4 = { author: 'Jack', amount: 6, bookName: 'Baz' };
    books.add(book3);
    const returnData2 = books.add(book4);
    expect(returnData2.inventory).toBe(book3.amount + book4.amount);
  });

  it('should pass author, bookName, amount at the same time', () => {
    const errorMessageBookName = 'bookName is required';
    const errorMessageAuthor = 'author is required';
    const errorMessageAmount = 'amount is required';
    expect(() => books.add({ author: 'Tom', amount: 3 })).toThrowError(errorMessageBookName);
    expect(() => books.add({ bookName: 'Foo', amount: 3 })).toThrowError(errorMessageAuthor);
    expect(() => books.add({ bookName: 'Foo', author: 'Tom' })).toThrowError(errorMessageAmount);
  });
});

describe('Test list books', () => {
  const books = new Books();
  const book0 = { author: 'Tom', amount: 3, bookName: 'Foo' };
  const book1 = { author: 'Jim', amount: 5, bookName: 'Bar' };
  books.add(book0);
  books.add(book1);

  it('should list all books', () => {
    const returnData = books.list();
    expect(returnData).toEqual([
      {
        id: 0,
        author: 'Tom',
        inventory: 3,
        bookName: 'Foo'
      }, {
        id: 1,
        author: 'Jim',
        inventory: 5,
        bookName: 'Bar'
      }]);
  });
});

describe('Test search book', () => {
  const books = new Books();
  const book0 = { author: 'Tom', amount: 3, bookName: 'Foo' };
  const book1 = { author: 'Jim', amount: 5, bookName: 'Bar' };
  const book2 = { author: 'Jim', amount: 5, bookName: 'Baz' };
  books.add(book0);
  books.add(book1);
  books.add(book2);

  it('should search by author,bookName', () => {
    const returnData = books.search({ author: 'Jim', bookName: 'Bar' });
    expect(returnData).toEqual([{ id: 1, author: 'Jim', inventory: 5, bookName: 'Bar' }]);
    const returnData1 = books.search({ author: 'Jim' });
    expect(returnData1).toEqual([{ id: 1, author: 'Jim', inventory: 5, bookName: 'Bar' }, {
      id: 2,
      author: 'Jim',
      inventory: 5,
      bookName: 'Baz'
    }]);
    const returnData2 = books.search({ bookName: 'Bar' });
    expect(returnData2).toEqual([{ id: 1, author: 'Jim', inventory: 5, bookName: 'Bar' }]);
  });

  it('should return empty array when condition do not match', () => {
    const returnData = books.search({ author: 'Jimmy' });
    expect(returnData).toEqual([]);
    const returnData1 = books.search({ bookName: 'Boo' });
    expect(returnData1).toEqual([]);
    const returnData2 = books.search({ k3: 'v3.1' });
    expect(returnData2).toEqual([]);
  });
});

describe('Test remove books', () => {
  const books = new Books();
  const book0 = { author: 'Tom', amount: 3, bookName: 'Foo' };
  const book1 = { author: 'Jim', amount: 5, bookName: 'Bar' };
  const book2 = { author: 'Jim', amount: 5, bookName: 'Baz' };
  books.add(book0);
  books.add(book1);
  books.add(book2);

  it('should return undefined when remove by not exited author and bookName', () => {
    const returnData = books.remove({ author: 'Jimmy', bookName: 'Boo' });
    expect(returnData).toBeUndefined();
  });

  it('should remove by author and bookName', () => {
    const returnData = books.remove({ author: 'Jim', bookName: 'Bar' });
    expect(returnData).toEqual({ id: 1, author: 'Jim', bookName: 'Bar', inventory: 5 });
  });

  it('should pass author, bookName at the same time', () => {
    const errorMessageBookName = 'bookName is required';
    const errorMessageAuthor = 'author is required';
    expect(() => books.remove({ author: 'Tom' })).toThrowError(errorMessageBookName);
    expect(() => books.remove({ bookName: 'Foo' })).toThrowError(errorMessageAuthor);
  });
});
// @ts-nocheck
import Library from '../src/Library';

describe('Test borrow book', () => {
  const library = new Library();
  library.books.add({ bookName: 'book1', author: 'author1', amount: 10 });
  library.books.add({ bookName: 'book2', author: 'author2', amount: 5 });
  library.books.add({ bookName: 'book3', author: 'author3', amount: 0 });
  const user1 = library.accounts.register({ role: 'user', name: 'Jimmy', password: '456' });
  const user2 = library.accounts.register({ role: 'user', name: 'Jacky', password: '890' });

  it('should borrow book success, inventory -1', () => {
    const returnData = library.borrowBook({ bookName: 'book1', author: 'author1', userId: user1.id });
    expect(returnData).toEqual({ bookName: 'book1', author: 'author1', userId: user1.id, id: 0 });
    expect(library.books.data.find({ bookName: 'book1', author: 'author1' })[0].inventory).toEqual(9);
  });

  it('should borrow book fail if arguments is not enough', () => {
    const returnData = library.borrowBook({ bookName: 'book1', author: 'author1' });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot borrow book, missing arguments');
    const returnData1 = library.borrowBook({ author: 'author1', userId: user1.id });
    expect(returnData1).toBeInstanceOf(Error);
    expect(returnData1.message).toBe('Cannot borrow book, missing arguments');
    const returnData2 = library.borrowBook({ userId: user1.id, bookName: 'book1' });
    expect(returnData2).toBeInstanceOf(Error);
    expect(returnData2.message).toBe('Cannot borrow book, missing arguments');
    const returnData3 = library.borrowBook({ bookName: 'book1' });
    expect(returnData3).toBeInstanceOf(Error);
    expect(returnData3.message).toBe('Cannot borrow book, missing arguments');
  });

  it('should borrow book fail if book is not exist', () => {
    const returnData = library.borrowBook({ bookName: 'book100', author: 'author4', userId: user1.id });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot find book book100 - author4');
  });

  it('should borrow book fail if book is not enough', () => {
    const returnData = library.borrowBook({ bookName: 'book3', author: 'author3', userId: user2.id });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('No book book3 - author3 left');
  });

  it('should borrow book fail if user is not exist', () => {
    const returnData = library.borrowBook({ bookName: 'book1', author: 'author1', userId: 100 });
    expect(returnData).toBeInstanceOf(Error);
    
    expect(returnData.message).toBe('Cannot find user 100');
  });
});

describe('Test return book', () => {
  const library = new Library();
  library.books.add({ bookName: 'book1', author: 'author1', amount: 10 });
  library.books.add({ bookName: 'book2', author: 'author2', amount: 5 });
  library.books.add({ bookName: 'book3', author: 'author3', amount: 0 });
  const user1 = library.accounts.register({ role: 'user', name: 'Jimmy', password: '456' });

  it('should return book success, inventory +1', () => {
    library.borrowBook({ bookName: 'book1', author: 'author1', userId: user1.id });
    expect(library.books.data.find({ bookName: 'book1', author: 'author1' })[0].inventory).toEqual(9);
    const returnData = library.returnBook({ bookName: 'book1', author: 'author1', userId: user1.id });
    expect(returnData).toEqual({ bookName: 'book1', author: 'author1', userId: user1.id, id: 0 });
    expect(library.books.data.find({ bookName: 'book1', author: 'author1' })[0].inventory).toEqual(10);
  });

  it('should return book fail if arguments is not enough', () => {
    library.borrowBook({ bookName: 'book1', author: 'author1', userId: user1.id });
    const returnData = library.returnBook({ bookName: 'book1', author: 'author1' });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot borrow book, missing arguments');
    const returnData1 = library.returnBook({ author: 'author1', userId: user1.id });
    expect(returnData1).toBeInstanceOf(Error);
    expect(returnData1.message).toBe('Cannot borrow book, missing arguments');
    const returnData2 = library.returnBook({ userId: user1.id, bookName: 'book1' });
    expect(returnData2).toBeInstanceOf(Error);
    expect(returnData2.message).toBe('Cannot borrow book, missing arguments');
    const returnData3 = library.returnBook({ bookName: 'book1' });
    expect(returnData3).toBeInstanceOf(Error);
    expect(returnData3.message).toBe('Cannot borrow book, missing arguments');
  });

  it('should return book fail if book is not exist', () => {
    const returnData = library.returnBook({ bookName: 'book100', author: 'author4', userId: user1.id });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot find book book100 - author4');
  });

  it('should return book fail if user is not exist', () => {
    const returnData = library.returnBook({ bookName: 'book1', author: 'author1', userId: 100 });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot find user 100');
  });
});

describe('Test delete book', () => {
  const library = new Library();
  library.books.add({ bookName: 'book2', author: 'author2', amount: 5 });
  library.books.add({ bookName: 'book3', author: 'author3', amount: 0 });
  const admin = library.accounts.register({ role: 'admin', name: 'Tommy', password: '123' });

  it('should delete book success', () => {
    library.books.add({ bookName: 'book1', author: 'author1', amount: 10 });
    const returnData = library.deleteBook({ bookName: 'book1', author: 'author1', userId: admin.id });
    expect(returnData).toEqual({ bookName: 'book1', author: 'author1', inventory: 10, id: 2 });
    expect(library.books.data.find({ bookName: 'book1', author: 'author1' })).toEqual([]);
  });

  it('should delete book fail if arguments is not enough', () => {
    const returnData = library.deleteBook({ bookName: 'book1', author: 'author1' });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot delete book, missing arguments');
    const returnData1 = library.deleteBook({ author: 'author1', userId: admin.id });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot delete book, missing arguments');
    const returnData2 = library.deleteBook({ userId: admin.id, bookName: 'book1' });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot delete book, missing arguments');
    const returnData3 = library.deleteBook({ bookName: 'book1' });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot delete book, missing arguments');
  });

  it('should delete book fail if book is not exist', () => {
    const returnData = library.deleteBook({ bookName: 'book100', author: 'author4', userId: admin.id });
    expect(returnData).toBeInstanceOf(Error);
    
    expect(returnData.message).toBe('Cannot find book book100 - author4');
  });

  it('should delete book fail if user is not exist', () => {
    const returnData = library.deleteBook({ bookName: 'book1', author: 'author1', userId: 100 });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot find userId 100');
  })

  it('should delete book fail if book is borrowed', () => {
    library.borrowBook({ bookName: 'book2', author: 'author2', userId: admin.id });
    const returnData = library.deleteBook({ bookName: 'book2', author: 'author2', userId: admin.id });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Cannot delete book book2 - author2 because it is currently borrowed.');
  });

  it('should delete book fail if user is not admin', () => {
    const user = library.accounts.register({ role: 'user', name: 'Jimmy', password: '456' });
    const returnData = library.deleteBook({ bookName: 'book2', author: 'author2', userId: user.id });
    expect(returnData).toBeInstanceOf(Error);
    expect(returnData.message).toBe('Only admin can delete book');
  });
});

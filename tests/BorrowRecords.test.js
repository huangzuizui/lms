const BorrowRecords = require('../src/BorrowRecords').default;
describe('Test add borrowRecords', () => {
  const borrowRecords = new BorrowRecords();

  it('should return borrow records', () => {
    const record = borrowRecords.add({ userId: 0, bookName: 'JavaScript', author: 'Tom' });
    expect(record).toEqual({ id: 0, userId: 0, bookName: 'JavaScript', author: 'Tom' });
  });

  it('should verify arguments', () => {
    const error1 = borrowRecords.add({ userId: 0, bookName: 'JavaScript' });
    expect(error1).toBeInstanceOf(Error);
    expect(error1.message).toBe('Please input userId, bookName and author.');
    const error2 = borrowRecords.add({ bookName: 'JavaScript' });
    expect(error2).toBeInstanceOf(Error);
    expect(error2.message).toBe('Please input userId, bookName and author.');
    const error3 = borrowRecords.add({ userId: 0 });
    expect(error3).toBeInstanceOf(Error);
    expect(error3.message).toBe('Please input userId, bookName and author.');
  });
});


describe('Test remove record', () => {
  it('should return removed record', () => {
    const borrowRecords = new BorrowRecords();
    borrowRecords.add({ userId: 0, bookName: 'JavaScript', author: 'Tom' });
    const record = borrowRecords.remove({ userId: 0, bookName: 'JavaScript', author: 'Tom' });
    expect(record).toEqual({ id: 0, userId: 0, bookName: 'JavaScript', author: 'Tom' });
  });

  it('should return undefined if record is not found', () => {
    const borrowRecords = new BorrowRecords();
    const record = borrowRecords.remove({ userId: 100, bookName: 'JavaScript', author: 'Tom' });
    expect(record).toEqual(undefined);
  });

  it('should verify arguments', () => {
    const borrowRecords = new BorrowRecords();
    const error1 = borrowRecords.remove();
    expect(error1).toBeInstanceOf(Error);
    expect(error1.message).toBe('Please input userId, bookName and author.');
    const error2 = borrowRecords.remove({ userId: 0, bookName: 'JavaScript' });
    expect(error2).toBeInstanceOf(Error);
    expect(error2.message).toBe('Please input userId, bookName and author.');
    const error3 = borrowRecords.remove({ bookName: 'JavaScript' });
    expect(error3).toBeInstanceOf(Error);
    expect(error3.message).toBe('Please input userId, bookName and author.');
    const error4 = borrowRecords.remove({ userId: 0 });
    expect(error4).toBeInstanceOf(Error);
    expect(error4.message).toBe('Please input userId, bookName and author.');
  });
});
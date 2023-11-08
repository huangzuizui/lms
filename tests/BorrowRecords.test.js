const BorrowRecords = require('../src/BorrowRecords').default;
describe('Test add borrowRecords', () => {
  const borrowRecords = new BorrowRecords();

  it('should return borrow records', () => {
    const record = borrowRecords.add({ userId: 0, bookName: 'JavaScript', author: 'Tom' });
    expect(record).toEqual({ id: 0, userId: 0, bookName: 'JavaScript', author: 'Tom' });
  });

  it('should verify arguments', () => {
    expect(() => borrowRecords.add({ userId: 0, bookName: 'JavaScript' })).toThrow('Please input userId, bookName and author.');
    expect(() => borrowRecords.add({ bookName: 'JavaScript' })).toThrow('Please input userId, bookName and author.');
    expect(() => borrowRecords.add({ userId: 0 })).toThrow('Please input userId, bookName and author.');
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
    expect(() => borrowRecords.remove()).toThrow('Please input userId, bookName and author.');
    expect(() => borrowRecords.remove({ userId: 0, bookName: 'JavaScript' })).toThrow('Please input userId, bookName and author.');
    expect(() => borrowRecords.remove({ bookName: 'JavaScript' })).toThrow('Please input userId, bookName and author.');
    expect(() => borrowRecords.remove({ userId: 0 })).toThrow('Please input userId, bookName and author.');
  });
});
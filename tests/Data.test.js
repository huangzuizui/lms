const Data = require('../src/Data').default;
describe('Test create data', () => {
  const data = new Data();
  const datum0 = { k1: 'v1', k2: 'v2' };
  const datum1 = { k1: 'v3', k2: 'v4' };

  it('should add an auto autoIncrement id when adding new data', () => {
    const returnData = data.add(datum0);
    expect(returnData).toEqual({ id: 0, ...datum0 });
    const returnData1 = data.add(datum1);
    expect(returnData1).toEqual({ id: 1, ...datum1 });
  });

  it ('should add object literal as data', () => {
    const errorMessage = 'Data must be an object literal.';
    const addNumberAsData = () => data.add(1);
    expect(addNumberAsData).toThrowError(errorMessage);
    const addStringAsData = () => data.add('abc');
    expect(addStringAsData).toThrowError(errorMessage);
    const addArrayAsData = () => data.add(['11']);
    expect(addArrayAsData).toThrowError(errorMessage);
    const addNullAsData = () => data.add(1);
    expect(addNullAsData).toThrowError(errorMessage);
    const addUndefinedAsData = () => data.add();
    expect(addUndefinedAsData).toThrowError(errorMessage);
  });
});

describe('Test remove data', () => {
  const data = new Data();
  const datum0 = { k1: 'v1', k2: 'v2' };
  const datum1 = { k1: 'v3', k2: 'v4' };
  data.add(datum0);
  data.add(datum1);

  it('should return undefined when remove by not exited id', () => {
    const returnData = data.removeById(100);
    expect(returnData).toBeUndefined();
  });

  it('should remove by id', () => {
    const returnData = data.removeById(1);
    expect(returnData).toEqual({ id: 1, ...datum1 });
  });
});

describe('Test update data', () => {
  const data = new Data();
  const datum0 = { k1: 'v1', k2: 'v2' };
  const datum1 = { k1: 'v3', k2: 'v4' };
  data.add(datum0);
  data.add(datum1);

  it('should update by id and return updated datum', () => {
    const updatedDatum = { k1: 'v3.1' };
    const returnData = data.updateById(1, updatedDatum);
    expect(returnData).toEqual({ id: 1, ...datum1, ...updatedDatum });
  });

  it('should return undefined when update by not exited id', () => {
    const returnData = data.updateById(100, { k1: 'v3.1' });
    expect(returnData).toBeUndefined();
  });
});

describe('Test find data', () => {
  const data = new Data();
  const datum0 = { k1: 'v1', k2: 'v2' };
  const datum1 = { k1: 'v1', k2: 'v4' };
  data.add(datum0);
  data.add(datum1);

  it('should return an array', () => {
    const returnData = data.find({k2: 'v2'});
    expect(returnData).toEqual([{ id: 0, ...datum0 }]);
    const returnData1 = data.find({k1: 'v1'});
    expect(returnData1).toEqual([{id: 0, ...datum0}, {id:1, ...datum1}]);
  });

  it('should return empty array when condition do not match', () => {
    const returnData = data.find( { k1: 'v3.1' });
    expect(returnData).toEqual([]);
    const returnData1 = data.find( { k3: 'v3.1' });
    expect(returnData1).toEqual([]);
  });

  it ('should find condition be an object literal', () => {
    const errorMessage = 'Condition must be an object literal.';
    const addNumberAsData = () => data.find(1);
    expect(addNumberAsData).toThrowError(errorMessage);
    const addStringAsData = () => data.find('abc');
    expect(addStringAsData).toThrowError(errorMessage);
    const addArrayAsData = () => data.find(['11']);
    expect(addArrayAsData).toThrowError(errorMessage);
    const addNullAsData = () => data.find(1);
    expect(addNullAsData).toThrowError(errorMessage);
    const addUndefinedAsData = () => data.find();
    expect(addUndefinedAsData).toThrowError(errorMessage);
  });
});

describe('Test list data', () => {
  const data = new Data();
  const datum0 = { k1: 'v1', k2: 'v2' };
  const datum1 = { k1: 'v3', k2: 'v4' };
  data.add(datum0);
  data.add(datum1);

  it('should list all data', () => {
    const returnData = data.list();
    expect(returnData).toEqual([{ id: 0, ...datum0 }, { id: 1, ...datum1 }]);
  });

  it('should ignore pass in args', () => {
    const returnData = data.list('abc');
    expect(returnData).toEqual([{ id: 0, ...datum0 }, { id: 1, ...datum1 }]);
    const returnData1 = data.list(123);
    expect(returnData).toEqual([{ id: 0, ...datum0 }, { id: 1, ...datum1 }]);
    const returnData2 = data.list([123]);
    expect(returnData).toEqual([{ id: 0, ...datum0 }, { id: 1, ...datum1 }]);
    const returnData4 = data.list({});
    expect(returnData).toEqual([{ id: 0, ...datum0 }, { id: 1, ...datum1 }]);
  });
});
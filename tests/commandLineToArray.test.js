const commandLineToArray = require('../src/utils/commandLineToArray').default;
describe('Test commandLineToArray', () => {
  it('should return array', () => {
    expect(commandLineToArray('a')).toEqual(['a']);
    expect(commandLineToArray('a b')).toEqual(['a', 'b']);
    expect(commandLineToArray('a b c')).toEqual(['a', 'b', 'c']);
    expect(commandLineToArray('a b c 1')).toEqual(['a', 'b', 'c', '1']);
  });
  it('should be able to parse double quote', () => {
    expect(commandLineToArray('a "b c" d')).toEqual(['a', 'b c', 'd']);
    expect(commandLineToArray('a "b c d" 1')).toEqual(['a', 'b c d', '1']);
    expect(commandLineToArray('a "b c" "d e" f')).toEqual(['a', 'b c', 'd e', 'f']);
  });
  it('should be able to parse single quote', () => {
    expect(commandLineToArray(`a 'b c' d`)).toEqual(['a', 'b c', 'd']);
    expect(commandLineToArray(`a 'b c d' 1`)).toEqual(['a', 'b c d', '1']);
    expect(commandLineToArray(`a 'b c' 'd e' f`)).toEqual(['a', 'b c', 'd e', 'f']);
  });
});
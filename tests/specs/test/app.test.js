import { nameIsValid, fullTrim, getTotal } from '../../../src/app';
import { arrTest } from './constants';
describe('nameIsValid', () => {
  test("it's valid name", () => {
    expect(nameIsValid('anna')).toBe(true);
    expect(nameIsValid('jo')).toBe(true);
  });
  test("it's not valid name", () => {
    expect(nameIsValid('Anna')).toBe(false);
    expect(nameIsValid('Anna123')).toBe(false);
    expect(nameIsValid('A')).toBe(false);
  });
  test("it's not string", () => {
    expect(nameIsValid(123)).toBe(false);
    expect(nameIsValid(false)).toBe(false);
    expect(nameIsValid('')).toBe(false);
    expect(nameIsValid(null)).toBe(false);
  });
});

describe('fullTrim', () => {
  test('no spaces', () => {
    expect(fullTrim('Anna')).toBe('Anna');
  });
  test('delete spaces, tabs and newlines', () => {
    expect(fullTrim('Anna and Joe')).toBe('AnnaandJoe');
    expect(fullTrim('Anna\t123')).toBe('Anna123');
    expect(fullTrim('Anna\nJoe')).toBe('AnnaJoe');
  });
  test('return empty line', () => {
    expect(fullTrim(null)).toBe('');
    expect(fullTrim(undefined)).toBe('');
    expect(fullTrim('       ')).toBe('');
  });
});

test.each(arrTest)('total price', ({ items, expected, discount, error }) => {
  if (!error) {
    expect(getTotal(items, discount)).toBe(expected);
  }
  if (error) {
    expect(() => getTotal(items, discount)).toThrow(error);
  }
});

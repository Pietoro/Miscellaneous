import {add, sub} from './complex.js';
import each from 'jest-each';

describe('Testing add', () => {
  each([
    [{re: 1, im: 2}, {re: 3, im: -1}, {re:4, im: 1}],
    [{re: -3, im: 4}, {re: 2, im: 0}, {re: -1, im: 4}],
    [{re: 0, im: 0}, {re: 5, im: 4}, {re: 5, im: 4}]
  ]).test('Should return the sum', (z1, z2, expected) => {
    expect(add(z1,z2)).toEqual(expected);
    expect(add(z2,z1)).toEqual(add(z1,z2));
  });
});

describe('Testing sub', () => {
  each([
    [{re: 1, im: 2}, {re: 3, im: -1}, {re:-2, im: 3}],
    [{re: -3, im: 4}, {re: 2, im: 0}, {re: -5, im: 4}],
    [{re: 0, im: 0}, {re: 5, im: 4}, {re: -5, im: -4}],
    [{re: 5, im: 4}, {re: 0, im: 0}, {re: 5, im: 4}]
  ]).test('Should return the difference', (z1, z2, expected) => {
    expect(sub(z1,z2)).toEqual(expected);
  });
});

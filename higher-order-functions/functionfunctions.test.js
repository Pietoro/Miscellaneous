import each from "jest-each";
import {constFunc} from './functionfunctions';

describe('Testing constFunc',() => {
  each([
    [{c: 3, xs: [2, 'a', true]}],
    [{c: true, xs: ['abbc',[1,2],false]}]
  ]).test('Should return a constant function', (input) => {
    const func = constFunc(input.c);
    input.xs.forEach(x => {
      expect(func(x)).toBe(input.c);
    });
  });
});

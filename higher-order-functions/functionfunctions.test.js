import each from "jest-each";
import {constFunc, composeTwo, iterateIt} from './functionfunctions';

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

describe('Testing composeTwo', () => {
  each([
    [(x) => (2*x-1),(y) => (y>0), [7,1,0,0.5],[true,true,false,false]],
    [(x) => (2 * x),(y) => (y * 3), [0,1,4],[0,6,24]]
  ]).test('Should return a composition of two functions', 
    (first,second, input,expected) => {
      const composed = composeTwo(first,second);
      input.forEach((x, index) => {
        expect(composed(x)).toBe(expected[index]);
      });
    });
});

describe('Testing iterateIt', () => {
  each([
    [(x) => 2 * x, 2, [2,5,12],[8,20,48]],
    [(x) => x - 2, 0, [1,6,44],[1,6,44]],
    [(x) => x - 3, 3,[0,-4,100],[-9,-13,91]]
  ]).test('Should iterate a function a given number of times', 
    (func, times, input, expected) => {
      const iterated = iterateIt(func,times);
      input.forEach((x, index) => expect(iterated(x)).toBe(expected[index]));
  });
  
  each([
    [(x) => x * 2, -5],
    [(x) => x * x + 2, -100]
  ]).test('Should return undefined', (func, times) => {
    expect(iterateIt(func,times)).toBeUndefined()
  });
});



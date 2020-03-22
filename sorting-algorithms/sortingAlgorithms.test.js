import sortingAlgorithms from './sortingAlorithms';
import each from 'jest-each';

for (const key in sortingAlgorithms) {
  describe(`Testing ${key}`, () => {
    each([
      [[2,5,1,3,4],[1,2,3,4,5]],
      [[-2,-6,1,7,-1],[-6,-2,-1,1,7]],
      [[5],[5]],
      [[],[]]
    ]).test(`Should return sorted array`, (input, expected) => {
      const algorithm = sortingAlgorithms[key];
      expect(algorithm(input)).toEqual(expected);
    });
  });
}

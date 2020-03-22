import sortingAlgorithms, {swapElements, mergeTwoSorted} from './sortingAlgorithms';
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

describe('Testing swapElements', () => {
  each([
    [1,3,[7,2,4,1,5],[7,1,4,2,5]],
    [0,0,[3],[3]],
    [3,6,[4,1,5,2,6,4,8,9],[4,1,5,8,6,4,2,9]]
  ]).test('Should swap elements in an array', (i,j,input,expected) => {
    const array = input;
    swapElements(array,i,j);
    expect(array).toEqual(expected);
  });
});

describe('Testing mergeTwoSorted', () => {
  each([
    [[1,2,3],[4,5,6],[1,2,3,4,5,6]],
    [[-3,1,5],[-1,7],[-3,-1,1,5,7]],
    [[],[2,6],[2,6]],
    [[5],[2],[2,5]]
  ]).test('Should return a merge of two arrays', (input1,input2,expected) => {
    expect(mergeTwoSorted(input1,input2)).toEqual(expected);
  });
});

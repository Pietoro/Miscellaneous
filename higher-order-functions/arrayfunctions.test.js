const arrayFunctions = require('./arrayfunctions');
const arraySum = arrayFunctions.arraySum; // const { arraySum } = arrayFunctions;

test('Should return sum of all array elements', () => {
  const array1 = [1,2,3];
  expect(arraySum(array1)).toBe(6);

  const array2 = [1,-2,0];
  expect(arraySum(array2)).toBe(-1);
  
  const array3 = [];
  expect(arraySum(array3)).toBe(0);
});

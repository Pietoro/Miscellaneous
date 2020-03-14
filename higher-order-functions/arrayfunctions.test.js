const arrayFunctions = require('./arrayfunctions');
//const arraySum = arrayFunctions.arraySum; // const { arraySum } = arrayFunctions;
const {arraySum, arrayProduct, arrayAllNegative} = arrayFunctions;

test('Should return sum of all array elements', () => {
  const array1 = [1,2,3];
  expect(arraySum(array1)).toBe(6);

  const array2 = [1,-2,0];
  expect(arraySum(array2)).toBe(-1);
  
  const array3 = [];
  expect(arraySum(array3)).toBe(0);
});

test('Should return product of all array elements', () =>{
  const array1 = [2,2,3];
  expect(arrayProduct(array1)).toBe(12);

  const array2 = [-1,2,2];
  expect(arrayProduct(array2)).toBe(-4);

  const array3 = [2,3,0];
  expect(arrayProduct(array3)).toBe(0);

  const array4 = [];
  expect(arrayProduct(array4)).toBe(1);
});

test('Should return true when all elements of an array are negative or an array is empty', () => {
  const array1 = [-1,-2,-3];
  expect(arrayAllNegative(array1)).toBeTruthy();

  const array2 = [1,-2,-3];
  expect(arrayAllNegative(array2)).toBeFalsy();

  const array3 = [0,-2,-3];
  expect(arrayAllNegative(array3)).toBeFalsy();

  const array4 = [];
  expect(arrayAllNegative(array4)).toBeTruthy();
})
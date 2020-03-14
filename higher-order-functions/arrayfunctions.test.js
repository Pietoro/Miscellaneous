const arrayFunctions = require('./arrayfunctions');
//const arraySum = arrayFunctions.arraySum; // const { arraySum } = arrayFunctions;
const {arraySum, arrayProduct, arrayAllNegative, 
  arraySumOfSquaresOfPositive, arrayProgressiveSum, 
  arrayProductOfFractions} = arrayFunctions;

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

test('Should return true when all elements of an array are negative or an array is empty', 
  () => {
    const array1 = [-1,-2,-3];
    expect(arrayAllNegative(array1)).toBeTruthy();

    const array2 = [1,-2,-3];
    expect(arrayAllNegative(array2)).toBeFalsy();

    const array3 = [0,-2,-3];
    expect(arrayAllNegative(array3)).toBeFalsy();

    const array4 = [];
    expect(arrayAllNegative(array4)).toBeTruthy();
});

test('Should return sum of squares of all positive numbers in the array and 0 for empty array', 
  () => {
    const array1 = [2,2,-2];
    expect(arraySumOfSquaresOfPositive(array1)).toBe(8);
    const array2 = [];
    expect(arraySumOfSquaresOfPositive(array2)).toBe(0);
    const array3 = [2,0];
    expect(arraySumOfSquaresOfPositive(array3)).toBe(4);
    const array4 = [-3,-2,-1];
    expect(arraySumOfSquaresOfPositive(array4)).toBe(0);
    const array5 = [4,3,2,1];
    expect(arraySumOfSquaresOfPositive(array5)).toBe(30);
});

test('Should return an array of the consecutive sums', () => {
  const array1 = [1,2,3,4];
  const result1 = arrayProgressiveSum(array1);
  expect(result1).toEqual([0,1,3,6,10]);
  expect(result1.length).toBe(array1.length + 1);

  const array2 = [-1,2,-3,0,1];
  const result2 = arrayProgressiveSum(array2);
  expect(result2).toEqual([0,-1,1,-2,-2,-1]);
  expect(result2.length).toBe(array2.length + 1);

  const array3 = [];
  expect(arrayProgressiveSum(array3)).toEqual([0]);
});

test('Should return product of values of fractions', () => {
  const array1 = [
    {nom: 1, denom: 2},
    {nom: 2, denom: 3},
    {nom: 3, denom: 4},
  ];
  expect(arrayProductOfFractions(array1)).toBeCloseTo(0.25);

  const array2 = [
    {nom: 1, denom: 2},
    {nom: 2, denom: 0},
    {nom: 3, denom: 4},
  ];
  expect(arrayProductOfFractions(array2)).toBe(Infinity);
 

  const array3 = [];
  expect(arrayProductOfFractions(array3)).toBe(1);
});

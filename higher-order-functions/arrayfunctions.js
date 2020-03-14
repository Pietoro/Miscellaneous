// Task
// arraySum: (arr: number[]) => number
// returns sum of all elements of the array and 0 if the array is empty

/*function arraySum(arr) {
  let sum = 0;
  arr.forEach((el) => sum += el);
  return sum;
}*/

/* function arraySum(arr) {
  return arr.reduce((total, el) => total + el, 0);
} */

const arraySum = (arr) => arr.reduce((total, el) => total + el, 0);

// Task
// arrayProduct: (arr: number[]) => number
// return product of all elements of the array and 1 if the array is empty

/*function arrayProduct(arr) {
  let product = 1;
  for (const el of arr) {
    product *= el;
  }
  return product;
} */

const arrayProduct = (arr) => arr.reduce((total, el) => total * el, 1);

// Task
// arrayAllNegative: (arr: number[]) => boolean
// returns true when all elements of the array are negative and false otherwise
// if array is empty returns true

const arrayAllNegative = (arr) => arr
  .map((el) => el < 0)
  .reduce((total, el) => total && el, true);

// Task
// arraySumOfSquaresOfPositive; (arr: number[]) => number
// return sum of squares of all positive numbers in the array and 0 for empty array

const arraySumOfSquaresOfPositive = (arr) => arr
  .filter((el) => el > 0)
  .map((el) => el * el)
  .reduce((total, el) => total + el, 0);

const arrayFunctions = {
  arraySum, // ~~ arraySum: arraySum
  arrayProduct,
  arrayAllNegative,
  arraySumOfSquaresOfPositive
};

module.exports = arrayFunctions;

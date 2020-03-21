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
// arrayMax: (arr: number[]) => number | undefined
// returns the bigest element in the array
// if the array is empty returns undefined



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

// Task
// arrayProgressiveSum: (arr: number[]) => number[]
// returns the array [0, arr[0], arr[0] + arr[1], ...]

/*const arrayProgressiveSum = (arr) => arr
  .reduce((total, el) => total.concat([el+total[total.length-1]]), [0]);*/

const arrayProgressiveSum = (arr) => arr
  .reduce((total, el) => [...total, el+total[total.length-1]], [0]);

// Task
// arrayProductOfFractions: (arr: Fraction[]) => number
// where: interface Fraction { nom: number; denom: number; }
// return product of values of fractions

const arrayProductOfFractions = (arr) => arr
  .map((el) => el.nom / el.denom)
  .reduce((total,el) => total * el, 1);

// Task
// arrayMap<T1, T2>: (arr: T1[], fun: (x: T1) => T2) => T2[]
// And
// arrayFilter<T>: (arr: T[], fun: (x: T) => boolean) => T[]
// use only reduce

const arrayMap = (arr,fun) => arr
  .reduce((total, el) => [...total,fun(el)], []);

const arrayFilter = (arr, fun) => arr
  .reduce((total, el) => fun(el) ? [...total,el] : total, []);

export default {
  arraySum, // ~~ arraySum: arraySum
  arrayProduct,
  arrayAllNegative,
  arraySumOfSquaresOfPositive,
  arrayProgressiveSum,
  arrayProductOfFractions
};

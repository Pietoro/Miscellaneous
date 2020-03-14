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

function arrayProduct(arr) {
  return 0;
}

const arrayFunctions = {
  arraySum, // ~~ arraySum: arraySum
  arrayProduct
};

module.exports = arrayFunctions;

// swapElements: (arr: number[], i: number, j: number) => void
// moidifies given array by swapping ith element with jth element

export const swapElements = (arr, i, j) => {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
};

// bubbleSort
// implements bubble sort algorithm

const bubbleSort = (arr) => {
  const result = [...arr]; // clone array
  for (let limit = result.length - 2; limit >= 0; limit--) {
    for(let i = 0; i <= limit; i++) {
      if (result[i] > result[i+1]) {
        swapElements(result, i, i+1);
      }
    }
  }
  return result;
};

// insertionSort
// implements insertion sort algorithm

const insertionSort = (arr) => {
  const result = [...arr]; // clone array
  for (let limit = 1; limit < result.length; limit++) {
    for(let i = limit; i > 0; i--) {
      if(result[i] < result[i-1]) {
        swapElements(result,i,i-1);
      }
    }
  }
  return result;
};

export default {
  bubbleSort,
  insertionSort
};

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

// selectionSort
// implements selection sort algorithm

const selectionSort = (arr) => {
  const result = [...arr]; 
  for(let limit = 0; limit < result.length; limit++) {
    const argMin = result.slice(limit,result.length)
      .reduce((total,el,index) => result[total] > el ? index+limit : total, limit);
    swapElements(result,argMin,limit);
  }
  return result;
}

// quickSort
// implements quick sort algorithm

const quickSort = (arr) => {
  if(arr.length === 0 || arr.length === 1) return arr;
  const head = arr[0];
  const tail = arr.slice(1,arr.length);
  const smaller = tail.filter((x) => x <= head);
  const greater = tail.filter((x) => x > head);
  return [...quickSort(smaller),head,...quickSort(greater)];
};

// mergeTwoSorted
// returns a merge of two sorted arrays preserving elements order
// is allowed to modify arguments

export const mergeTwoSorted = (arr1,arr2) => {
  const result = [];
  while(arr1.length !== 0 && arr2.length !== 0) {
    if(arr1[0] < arr2[0]) {
      result.push(arr1[0]);
      arr1.splice(0,1); // removes first element from arr1
    } else {
      result.push(arr2[0]);
      arr2.splice(0,1);
    }
  }
  return [...result,...arr1,...arr2];
};

// mergeSort
// implements merge sort algorithm

const mergeSort = (arr) => {
  if(arr.length === 0 || arr.length === 1) return arr;
  const alfa = arr.slice(0, arr.length/2);
  const omega = arr.slice(arr.length/2, arr.length);
  return mergeTwoSorted(mergeSort(alfa),mergeSort(omega));
};

export default {
  bubbleSort,
  insertionSort,
  selectionSort,
  quickSort,
  mergeSort
};

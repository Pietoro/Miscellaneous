// swapElements: (arr: number[], i: number, j: number) => void
// moidifies given array by swapping ith element with jth element

export const swapElements = (arr, i, j) => {
  const temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;
}

export default {};

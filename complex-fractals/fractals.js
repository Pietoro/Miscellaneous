import { abs, add, mul } from "./complex";

// implemented and tested in higher-order-functions
const iterateIt = (func, times) => {
  if(times < 0) return undefined;
  return (x) => {
    let result = x;
    for (let i = 0; i < times; i++) {
      result = func(result); 
    }
    return result;
  };
};

// generateGrid: (xMin, xMax, xCount, yMin, yMax, yCount) => complex[][]

const generateGrid = (xMin, xMax, xCount, yMin, yMax, yCount) => {
  const result = Array.from({length: yCount})
    .map((el) => Array.from({length: xCount}));
  
  const xStep = (xMax - xMin)/(xCount - 1);
  const yStep = (yMax - yMin)/(yCount - 1);

  for(let i = 0; i < yCount; i++) {
    for(let j = 0; j < xCount; j++) {
      result[i][j] = {re: xMin + j * xStep, im: yMin + i * yStep};
    }
  }
};

const transform = (c) => (
  (z) => add(mul(z,z),c)
);

// julia: (c: complex, z: complex, times: number) => boolean
// returns true if
// after times iterations
// transform(c) for argument z returns
// a complex number with
// absolute value not greater than 2
// and false otherwise

const julia = (c,z,times) => {
  const iterated = iterateIt(transform(c),times);
  if(abs(iterated(z)) <= 2) return true;
  return false;
};

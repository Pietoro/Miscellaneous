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

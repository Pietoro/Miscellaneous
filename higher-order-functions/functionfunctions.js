// Task
// constFunc: (c: any) => ((x: any) => any)
// returns a function that returns always c, no matter what argument it is given

/*export const constFunc = (c) => function(x) {
    return c;
};*/

export const constFunc = (c) => ((x) => c);

// Task
// composeTwo<T1,T2,T3>: (first: (x: T1) => T2, second: (y: T2) => T3) => ((x: T1) => T3)
// returns a functions that:
// - takes the argument and gives it to the first
// - takes the output of the first and gives it to the second
// - returns the output of the second

/*export const composeTwo = (first, second) => function(x) {
  const y = first(x);
  return second(y);
};*/

export const composeTwo = (first, second) => 
  ((x) => second(first(x)));

const identity = (x) => x;

export const composeThem = (...funcs) => funcs
  .reduce((total, func) => composeTwo(total,func), identity);

// Task
// iterateIt<T>: (func: (x: T) => T, times: number)
// returns a function that for `times` times
// takes the argument and gives it back to itself as an argument
// for `times` = 0, returns identity function
// for `times` < 0, returns undefined

export const iterateIt = (func, times) => {
  if(times < 0) return undefined;
  return (x) => {
    let result = x;
    for (let i = 0; i < times; i++) {
      result = func(result); 
    }
    return result;
  };
};

// Task
// timeIt<T1,T2>: (func: (x: T1) => T2) => ((x: T1) => { time: number, result: T2 })
// decorates the function with time measurement



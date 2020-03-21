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

export const composeTwo = (first, second) => function(x) {
  const y = first(x);
  return second(y);
};

// Task
// constFunc: (c: any) => ((x: any) => any)
// returns a function that returns always c, no matter what argument it is given

export const constFunc = (c) => function(x) {
    return c;
};

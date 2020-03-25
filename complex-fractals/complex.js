// interface complex { re: number, im: number }

// add: (z1: complex, z2: complex) => complex

export const add = (z1, z2) => 
  ({re: (z1.re + z2.re), im: (z1.im + z2.im)});

// sub: (z1: complex, z2: complex) => complex

export const sub = (z1, z2) => 
  ({re: (z1.re - z2.re), im: (z1.im - z2.im)});

// mul: (z1: complex, z2: complex) => complex


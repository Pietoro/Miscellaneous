const randomArray = (length, range = 500) => 
  Array.from({length: length})
    .map((x) => Math.random() * 2 * range - range);


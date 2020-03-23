import sortingAlgorithms from './sortingAlgorithms.js'

// originally implemented and tested in higher-order-functions/functionfunctions
const timeIt = (func) => ((x) => {
  const start = new Date().getTime();
  const result = func(x); 
  const finish = new Date().getTime();
  const time = finish - start;
  return {result, time};
});

const randomArray = (length, range = 500) => 
  Array.from({length: length})
    .map((x) => Math.random() * 2 * range - range);

const testSortingAlgorithm = (algorithm,length,times = 1,range = 500) => {
  const timedAlgorithm = timeIt(algorithm);
  let time = 0;
  for(let i = 1;i <= times;i++) {
    time += timedAlgorithm(randomArray(length,range)).time;
  }
  return time/times;
};

const chartSortingAlgorithm = (algorithm,step,samples,times = 1,range = 500) =>
  Array.from({length: samples})
    .map((x,index) => index + 1)
    .map((x) => x * step)
    .map((length) => testSortingAlgorithm(algorithm,length,times,range));


export default chartSortingAlgorithm;

import sortingAlgorithms from './sortingAlgorithms.js';
import chartSortingAlgorithms from './measurements.js';

document.getElementById("btn-draw").onclick = draw;

const CHART_SIZE = 500;
const CHART_SCALE = 50;
const CHART_PADDING = 50;
const SAMPLES = 15;
const STEP = 300;
const TIMES = 10;
const RANGE = 500;
const ALGORITHMS = [
  { name: 'bubbleSort', label: 'Bubble Sort', hue: 0 },
  { name: 'quickSort', label: 'Quick Sort', hue: 200},
  { name: 'mergeSort', label: 'Merge Sort', hue: 300},
  { name: 'selectionSort', label: 'Selection Sort', hue: 40},
  { name: 'insertionSort', label: 'Insertion Sort', hue: 120}
];
const ARROW_SIZE = 10;

function draw() {

  const canvas = document.getElementById('chart');
  const context = canvas.getContext('2d');

  context.clearRect(0,0,600,600);

  generateLabels();
  drawAxes(context);

  ALGORITHMS.forEach((algorithmData) => {
    const chartData = chartSortingAlgorithms(sortingAlgorithms[algorithmData.name],STEP,SAMPLES,TIMES,RANGE);
    plotLineChartForAlgorithm(context, chartData, algorithmData.hue);
    plotPointChartForAlgorithm(context, chartData, algorithmData.hue);
  });
}

function plotLineChartForAlgorithm(context, chartData, hue = 0) {
  
  context.beginPath();
  context.strokeStyle = `hsl(${hue},100%,50%)`;
  context.lineWidth = 3;
  context.moveTo(
    CHART_PADDING + CHART_SIZE/SAMPLES,
    CHART_SIZE + CHART_PADDING - chartData[0]/CHART_SCALE * CHART_SIZE);
  
  chartData.forEach((el,index) => {
    context.lineTo(
      CHART_PADDING + (CHART_SIZE/SAMPLES) * (index+1),
      CHART_SIZE + CHART_PADDING - el/CHART_SCALE * CHART_SIZE);
  });
  context.stroke();
  context.lineWidth = 1;
}

function plotPointChartForAlgorithm(context, chartData, hue = 0) {

  context.fillStyle = `hsl(${hue},100%,40%)`;
  chartData.forEach((el,index) => {
    context.beginPath();
    context.arc(
      CHART_PADDING + (CHART_SIZE/SAMPLES) * (index+1),
      CHART_SIZE + CHART_PADDING - el/CHART_SCALE * CHART_SIZE,
      ARROW_SIZE/2,
      0,
      2 * Math.PI
      );
    context.fill();
  });

}

function drawAxes(context) {
  
  context.beginPath();
  context.strokeStyle = 'hsl(0,0%,0%)';
  context.lineWidth = 2;
  context.moveTo(CHART_PADDING, CHART_PADDING);
  context.lineTo(CHART_PADDING, CHART_SIZE + CHART_PADDING + ARROW_SIZE);
  context.moveTo(CHART_PADDING - ARROW_SIZE, CHART_SIZE + CHART_PADDING);
  context.lineTo(CHART_SIZE + CHART_PADDING, CHART_SIZE + CHART_PADDING);

  context.moveTo(CHART_PADDING - ARROW_SIZE/2, CHART_PADDING + ARROW_SIZE);
  context.lineTo(CHART_PADDING, CHART_PADDING);
  context.lineTo(CHART_PADDING + ARROW_SIZE/2, CHART_PADDING + ARROW_SIZE);
  
  context.moveTo(CHART_SIZE + CHART_PADDING - ARROW_SIZE, CHART_SIZE + CHART_PADDING - ARROW_SIZE/2);
  context.lineTo(CHART_SIZE + CHART_PADDING, CHART_SIZE + CHART_PADDING);
  context.lineTo(CHART_SIZE + CHART_PADDING - ARROW_SIZE, CHART_SIZE + CHART_PADDING + ARROW_SIZE/2);

  for(let i = 1;i < SAMPLES; i++) {
    context.moveTo(
      CHART_PADDING + (CHART_SIZE/SAMPLES) * i,
      CHART_SIZE + CHART_PADDING - ARROW_SIZE/3
    );
    context.lineTo(
      CHART_PADDING + (CHART_SIZE/SAMPLES) * i,
      CHART_SIZE + CHART_PADDING + ARROW_SIZE/3
    );

  }

  context.stroke();
  context.lineWidth = 1;

}

function generateLabels() {

  //document.getElementById('labels').innerHTML = `<li style="color: hsl(${ALGORITHMS[0].hue}, 100%, 50%)">${ALGORITHMS[0].label}</li>`;
  document.getElementById('labels').innerHTML = ALGORITHMS
    .map((el) => `<li style="color: hsl(${el.hue}, 100%, 50%)">${el.label}</li>`)
    .reduce((total, el) => total.concat(el),'');

}
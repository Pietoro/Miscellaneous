import sortingAlgorithms from './sortingAlgorithms.js';
import chartSortingAlgorithms from './measurements.js';

document.getElementById("btn-draw").onclick = draw;

const CHART_SIZE = 500;
const CHART_SCALE = 30;
const CHART_PADDING = 50;
const SAMPLES = 15;
const STEP = 300;
const TIMES = 10;
const RANGE = 500;
const ALGORITHMS = [
  { name: 'bubbleSort', label: 'Bubble Sort', hue: 0 },
  { name: 'quickSort', label: 'Quick Sort', hue: 200}
];
const ARROW_SIZE = 10;

function draw() {

  const canvas = document.getElementById('chart');
  const context = canvas.getContext('2d');

  context.clearRect(0,0,600,600);

  drawAxes(context);

  ALGORITHMS.forEach((algorithmData) => 
    plotLineChartForAlgorithm(context, sortingAlgorithms[algorithmData.name],algorithmData.hue)
  );
}

function plotLineChartForAlgorithm(context, algorithm, hue = 0) {
  const chart = chartSortingAlgorithms(algorithm,STEP,SAMPLES,TIMES,RANGE);

  
  context.beginPath();
  context.strokeStyle = `hsl(${hue},100%,50%)`;
  context.moveTo(
    CHART_PADDING + CHART_SIZE/SAMPLES,
    CHART_SIZE + CHART_PADDING - chart[0]/CHART_SCALE * CHART_SIZE);
  
  chart.forEach((el,index) => {
    context.lineTo(
      CHART_PADDING + (CHART_SIZE/SAMPLES) * (index+1),
      CHART_SIZE + CHART_PADDING - el/CHART_SCALE * CHART_SIZE);
  });
  context.stroke();
}

function drawAxes(context) {
  
  context.beginPath();
  context.strokeStyle = 'hsl(0,0%,0%)';
  context.moveTo(CHART_PADDING, CHART_PADDING);
  context.lineTo(CHART_PADDING, CHART_SIZE + CHART_PADDING + ARROW_SIZE);
  context.moveTo(CHART_PADDING - ARROW_SIZE, CHART_SIZE + CHART_PADDING);
  context.lineTo(CHART_SIZE + CHART_PADDING, CHART_SIZE + CHART_PADDING);

  context.moveTo(CHART_PADDING - ARROW_SIZE/2, CHART_PADDING + ARROW_SIZE);
  context.lineTo(CHART_PADDING, CHART_PADDING);
  context.lineTo(CHART_PADDING + ARROW_SIZE/2, CHART_PADDING + ARROW_SIZE);
  
  context.moveTo(CHART_SIZE + CHART_PADDING - ARROW_SIZE, CHART_SIZE + CHART_PADDING - ARROW_SIZE/2)
  context.lineTo(CHART_SIZE + CHART_PADDING, CHART_SIZE + CHART_PADDING);
  context.lineTo(CHART_SIZE + CHART_PADDING - ARROW_SIZE, CHART_SIZE + CHART_PADDING + ARROW_SIZE/2)

  context.stroke();

}

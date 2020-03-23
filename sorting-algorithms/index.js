import sortingAlgorithms from './sortingAlgorithms.js';
import chartSortingAlgorithms from './measurements.js';

document.getElementById("btn-draw").onclick = draw;

const chartSize = 500;
const chartScale = 6;

function draw() {

  const canvas = document.getElementById('chart');
  const context = canvas.getContext('2d');

  context.clearRect(0,0,600,600);

  const bubbleChart = chartSortingAlgorithms(sortingAlgorithms.bubbleSort,100,20,100,500);
  const samples = 20;
  
  context.beginPath();
  context.strokeStyle = 'hsl(0,0%,0%)';
  context.moveTo(50 + chartSize/samples,550 - bubbleChart[0]/chartScale * chartSize);
  bubbleChart.forEach((el,index) => {
    context.lineTo(50 + (chartSize/samples) * (index+1),550 - el/chartScale * chartSize);
  });
  context.stroke();
}
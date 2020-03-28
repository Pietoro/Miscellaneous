import {juliaGrid} from './fractals.js';

const ROUTES = ['julia'];
const BORDER_SIZE = 3;

let route = 'julia';
let c = {re: 0, im: 0};
let hue = 185;
document.getElementById("btn-draw").onclick = draw;
document.getElementById("point-picker").onclick = (ev) => setPoint(ev);
drawPointPicker();

function draw() {
  console.log('start');
  const canvas = document.getElementById('fractal');
  const context = canvas.getContext('2d');
  const w = canvas.getAttribute('width');
  const h = canvas.getAttribute('height');

  context.clearRect(0,0,w,h);
  drawJulia(context, w, h);
  console.log('finish');
}

function drawJulia(context, w, h) {

  const grid = juliaGrid(c, 50, -2, 2, w, -2, 2, h);

  for(let i = 0; i < h; i++) {
    for(let j = 0; j < w; j++) {
      if(grid[i][j] === true) fillPoint(context, j, h-i-1, `hsl(${hue},100%,40%)`);
    }
  }
}

function fillPoint(context, x, y, fillStyle) {
  context.fillStyle = fillStyle;
  context.fillRect(x,y,1,1);
}

function drawPointPicker() {
  const canvas = document.getElementById('point-picker');
  const context = canvas.getContext('2d');
  const w = canvas.getAttribute('width');
  const h = canvas.getAttribute('height');
  
  context.clearRect(0,0,w,h);
  context.strokeStyle = 'hsl(0,0%,40%)';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0,h/2);
  context.lineTo(w,h/2);
  context.moveTo(w/2,0);
  context.lineTo(w/2,h);
  context.stroke();

  context.lineWidth = 1;
  context.fillStyle = 'hsl(0,70%,50%)';
  context.beginPath();
  
  context.arc(w/2 + (w/2) * c.re, h/2 - (h/2) * c.im, 4, 0, 2 * Math.PI);
  context.fill();
}

function setPoint(ev) {
  const rect = ev.target.getBoundingClientRect();
  const x = ev.clientX - rect.left - BORDER_SIZE;
  const y = ev.clientY - rect.top - BORDER_SIZE;
  const w = ev.target.getAttribute('width');
  const h = ev.target.getAttribute('height');
  if(x >= 0 && x <= w && y >= 0 && y <= h) {
    c = {re: (2 * x - w)/w, im: -(2 * y - h)/h};
    drawPointPicker();
    
    draw();
  }
}

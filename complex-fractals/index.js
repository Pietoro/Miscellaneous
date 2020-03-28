import {juliaGrid, juliaLightnessGrid} from './fractals.js';

const ROUTES = ['julia', 'mandelbrot'];
const BORDER_SIZE = 3;
const TIMES = 50;

let route = 'julia';
let c = {re: 0, im: 0};
let hue = 185;
document.getElementById("btn-draw").onclick = draw;
document.getElementById("point-picker").onclick = setPoint;
document.getElementById("color-picker").onclick = setColor;
document.getElementById("cbx-fluid-colors").onchange = draw;
document.getElementById("link-julia").onclick = () => setRoute('julia');
document.getElementById("link-mandelbrot").onclick = () => setRoute('mandelbrot');

drawPointPicker();
initColorPicker();

// draw();

function draw() {
  console.log('start');
  const canvas = document.getElementById('fractal');
  const context = canvas.getContext('2d');
  const w = canvas.getAttribute('width');
  const h = canvas.getAttribute('height');

  context.clearRect(0,0,w,h);

  switch(route) {
    case 'julia':
      drawJulia(context, w, h);
      break;
    case 'mandelbrot':
     
      break;
  }

  
  console.log('finish');
}

function drawJulia(context, w, h) {

  const fluidColors = document.getElementById("cbx-fluid-colors").checked;
  console.log(fluidColors);

  if(fluidColors) {
    const grid = juliaLightnessGrid(c, TIMES, -2, 2, w, -2, 2, h);

    for(let i = 0; i < h; i++) {
      for(let j = 0; j < w; j++) {
        fillPoint(context, j, h-i-1, `hsl(${hue},100%,${grid[i][j]}%)`);
      }
    }
  } else {
    const grid = juliaGrid(c, TIMES, -2, 2, w, -2, 2, h);

    for(let i = 0; i < h; i++) {
      for(let j = 0; j < w; j++) {
        if(grid[i][j] === true) fillPoint(context, j, h-i-1, `hsl(${hue},100%,50%)`);
      }
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

function initColorPicker() {
  const canvas = document.getElementById('color-picker');
  const context = canvas.getContext('2d');
  const w = canvas.getAttribute('width');
  const h = canvas.getAttribute('height');
  document.getElementById("color-sample").style.backgroundColor = `hsl(${hue},100%,50%)`;

  context.clearRect(0,0,w,h);

  for(let x = 0; x < w; x++) {
    context.fillStyle = `hsl(${x*360/w}, 100%, 50%)`;
    context.fillRect(x, 0, 1, h);
  }
}

function setColor(ev) {
  const rect = ev.target.getBoundingClientRect();
  const x = ev.clientX - rect.left - BORDER_SIZE;
  // const y = ev.clientY - rect.top - BORDER_SIZE; 
  const w = ev.target.getAttribute('width');
  // const h = ev.target.getAttribute('height');
  if(x >= 0 && x <= w) {
    hue = x * 360/w;
    document.getElementById("color-sample").style.backgroundColor = `hsl(${hue},100%,50%)`;
    draw();
  }
}

function setRoute(newRoute) {
  if(route === newRoute) {
    return;
  }
  document.getElementById(`link-${route}`).classList.remove('btn-nav-link-active');
  route = newRoute;
  // ROUTES
  //   .map((r) => 'link-' + r)
  //   .map((id) => document.getElementById(id))
  //   .forEach((link) => link.classList.remove('btn-nav-link-active'));
  
  document.getElementById(`link-${route}`).classList.add('btn-nav-link-active');

  switch(newRoute) {
    case 'julia':
      document.querySelector('.point-picker-container').style.display = 'block';
      console.log('julia');
      break;
    case 'mandelbrot':
      document.querySelector('.point-picker-container').style.display = 'none';
      console.log('mandelbrot');
      break;
  }
  draw();
}

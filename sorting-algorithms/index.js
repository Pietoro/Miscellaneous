document.getElementById("btn-draw").onclick = draw;

function draw() {

  const canvas = document.getElementById('chart');
  const context = canvas.getContext('2d');

  context.clearRect(0,0,600,600);

  context.fillStyle = 'hsl(140,50%,50%)';
  context.fillRect(10,10,100,100);

  context.fillStyle = 'hsla(30,50%,50%,40%)';
  context.fillRect(10,50,50,100);

  context.beginPath();
  context.strokeStyle = 'hsl(200,50%,50%)';
  context.moveTo(20,40);
  context.lineTo(250,300);
  context.lineTo(450,200);
  context.lineTo(250,350);
  context.closePath();
  context.fill();

  context.beginPath();
  context.strokeStyle = 'hsl(100,50%,50%)';
  context.arc(300,300,200,0.5 * Math.PI,2*Math.PI);
  context.fill();
}
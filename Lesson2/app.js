console.log("test...");

var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
ctx.moveTo(0,10);
ctx.lineTo(100,50);
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;

ctx.fillStyle = 'rgb(200,50,10)';
ctx.fillRect(75, 125, 150, 100);

ctx.strokeStyle = 'green';
ctx.strokeRect(50, 100, 200, 150);

ctx.clearRect(125, 150, 50, 50);
ctx.stroke();
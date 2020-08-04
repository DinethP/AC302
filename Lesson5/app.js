console.log("test...");

var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

//width and height of canvas
var WIDTH = 600;
var HEIGHT = 400;

//ball x-y coordinates
// and magnitude of movements

var x, y;
var mx, my;
var circleColor = "rgb(255, 0, 0)"

//Initialise animation

function init(){
	x = 300;
	y = 200;
	mx = 3;
	my = 4;
	return setInterval(draw, 10);
}

function circle(x, y, r, color){
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 6.28);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = color;
	ctx.fill();
}

// Generate random color

function randomColor() {
	var r = Math.floor(Math.random()*255);
	var g = Math.floor(Math.random()*255);
	var b = Math.floor(Math.random()*255);
	return "rgb(" + r +"," + g + "," + b + ")";
}

//clear trail
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draw Frames
function draw(){
	clear();
	circle(x, y, 30, circleColor);

	if(x + mx < 0 || x + mx > WIDTH){
		mx = -mx;
		circleColor = randomColor();
	}
	if(y + my < 0 || y + my > HEIGHT){
		my = -my;
		circleColor = randomColor();
	}

	//move the shape
	x += mx;    //x = x + mx
	y += my;
}

init();
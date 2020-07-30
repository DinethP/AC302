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

//Initialise animation

function init(){
	x = 300;
	y = 200;
	mx = 3;
	my = 4;
	return setInterval(draw, 5);
}

function circle(x, y, r){
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 6.28);
	ctx.closePath();
	ctx.stroke();
	ctx.fillStyle = 'red';
	ctx.fill();
}

//clear trail
function clear(){
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//draw Frames
function draw(){
	clear();
	circle(x, y, 30);

	if(x + mx < 0 || x + mx > WIDTH){
		mx = -mx;
	}
	if(y + my < 0 || y + my > HEIGHT){
		my = -my;
	}

	//move the shape
	x += mx;    //x = x + mx
	y += my;
}

init();
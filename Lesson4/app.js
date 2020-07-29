console.log("test...");

var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');

var ironMan = new Image();
var spiderMan = new Image();
var thor = new Image();

ironMan.src = './ironman.jpg';
spiderMan.src = './spiderman.jpg';
thor.src = './thor.jpg';

ironMan.onload = function() {
	ctx.drawImage(ironMan, 650, 200, 150, 200);
}

spiderMan.onload = function() {
	ctx.drawImage(spiderMan, 470, 110, 200, 200);
}

thor.onload = function() {
	ctx.drawImage(thor, 300, 200, 200, 200);
}

//Sky and Land
ctx.fillStyle = 'sandybrown';
ctx.fillRect(0, 380, 800, 150);
ctx.fillStyle = 'midnightblue';
ctx.fillRect(0, 0, 800, 380);

//Moon
ctx.beginPath();
ctx.arc(100, 100, 50, 0, 6.28);
ctx.closePath();
ctx.fillStyle = 'ivory';
ctx.fill();

//Title
ctx.font = '55px Bangers';
ctx.fillStyle = 'ivory';
ctx.fillText('Avangers Assemble !', 210, 80);

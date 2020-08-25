$(document).ready(function(){
	//setting up the game
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext("2d");
	var gameOver = true;
	
	//Setting up constants
	const PI = Math.PI;
	const HEIGHT = canvas.height;
	const WIDTH = canvas.width;
	const upKey = 38, downKey = 40;

	// User input
	var keyPressed = null;

	// Setting up game object
	var player = {
		x: null,
		y: null,
		width: 20,
		height: 100,
		update: function(){
			//Move the paddle according to key pressed
			if(keyPressed == upKey) this.y -= 10;
			if(keyPressed == downKey) this.y += 10;
		},
		draw: function(){
			ctx.fillRect(this.x, this.y, this.wdith, this.height);
		}
	}

	var ai = {
		x: null,
		y: null,
		width: 20,
		height: 100,
		update: function(){
			let target = ball.y - (this.height - ball.size) / 2;
			this.y += (target - this.y) * 0.1;
		},
		draw: function(){
			ctx.fillRect(this.x, this.y, this.wdith, this.height);
		}
	}

	var ball = {
		x: null,
		y: null,
		size: 20,
		speedx: null,
		speedy: null,
		speed: 10,
		update: function(){
			// Move the ball
			this.x += this.speedx;
			this.y += this.speedy;

			// Bounce from to and bottom edge
			if(this.y + this.size >= HEIGHT || this.y <= 0){
				this.speedy *= -1;
			}

		},
		draw: function(){
			ctx.fillRect(this.x, this.y, this.size, this.size);
		}
	}

	// Collision checking
	function checkCollision(a ,b){
		// return true if ball collides with others]
		return(a.x < b.x + b.wdith && a.y < b.y + b.height && b.x < a.x + a.size && b.y < a.y + a.size);
	}

	// Movement direction determines which objecth the ball will collide with
	let other;

	if(ball.speedx < 0){
		other = player;
	}
	else {
		other = ai;
	}

	// check for collision
	let collided = checkCollision(ball, other);

	// Control ball direction after hitting paddle
	if(collided) {
		let n = (this.y + this.size - other.y) / (other.height + this.size);
		let phi = 0.25 * PI * (2 * n -1);
		this.speedx = this.speed * Math.cos(phi);
		this.speedy = this.speed * Math.sin(phi);
		if(other == ai) this.speedx *= -1;
	}

	if(this.x + this.size < 0 || this.sx > WIDTH) {
		gameOver = true;
		$("button").fadeIn();
		if(this.x + this.size < 0){
			$("h1").html("You Lose!");
		}
		else {
			$("h1").html("You Won!");
		}
	}

	// restartinmg the game on button click
	$("button").on("click", function(){
		$(this).hide();
		init();
	})

	//Setting up game functions
	
	function main(){
		//Initialise the game
		init();

		var loop = function(){
			update();
			draw();
			window.requestAnimationFrame(loop, canvas);
		}
		window.requestAnimationFrame(loop, canvas);

	}

	function init(){
		gameOver = false;

		$("h1").html("Pong");


		//Move the player and the AI to the middle of the screen
		player.x = 20;
		player.y=(HEIGHT - player.height) / 2;


		ai.x = (WIDTH - ai.width - 20);
		ai.y = (HEIGHT - player.height) / 2;

		//Put ball in the middle
		ball.x = (WIDTH - ball.size) / 2;
		ball.y = (HEIGHT - ball.size) / 2;

		//Serving the ball
		ball.speedx = ball.speed;
		// This gives either 0 or 1 to serve in random direction
		if(Math.round(Math.random())){
			ball.speedx *= -1;
		}
		ball.speedy = 0;

	}

	function update(){
		if(!gameOver){
			ball.update();
		}
		ai.update();
		player.update();

	}

	function draw(){
		ctx.fillRect(0, 0, WIDTH, HEIGHT); //Draw a rectangle in black
		ctx.save();

		// Draw the objects in white
		ctx.fillStyle = "white";
		ball.draw();
		ai.draw();
		player.draw();
	}

	//Sensing user's key inputs
	$(document).on("keyup", function(){
		keyPressed = null;
	});

	$(document).on("keydown", function(e){
		keyPressed = e.which;
	})

	//call the main function

	main();
})
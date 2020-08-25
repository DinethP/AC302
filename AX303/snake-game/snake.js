$(document).ready(function(){
	//Setting up canvas
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	//Setting up our grids
	var gridNum = 20;
	var gridSize  = canvas.width / gridNum;

	//Setting up Candy and player objects
	var candy = {
		x: 0,
		y: 0,
		alive: false 
	};

	var player = {
		x: 7,
		y: 7,
		// direction: Right - 0, Left - 1, Up - 2, Down - 3, Stopped - 5
		direction: 5,
		alive: true,
		tail: 1
	};

	//Snake coordinates of body parts
	var snakeBody = [[7, 7]];

	// Setting up keys
	var keyPressed = null;
	var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

	//Custom insert() for array
	Array.prototype.insert = function(index, item){
		this.splice(index, 0, item);
	}

	function update(){
		// Changing snake's movement
		if(keyPressed){
			if(keyPressed == rightKey && player.direction != 1) player.direction = 0;
			if(keyPressed == leftKey && player.direction != 0) player.direction = 1;
			if(keyPressed == upKey && player.direction != 3) player.direction = 2;
			if(keyPressed == downKey && player.direction != 2) player.direction = 3;
		}
		if(!candy.alive){
			//Generate random number from 0-19
			candy.x = Math.floor(Math.random() * gridNum);
			candy.y = Math.floor(Math.random() * gridNum);

			//Check if spawning on snake
			var collided;

			do{
				collided = false;
				for(var i = 0; i < player.tail; i++){
					if(candy.x == snakeBody[i][0] && candy.y == snakeBody[i][1]){
						collided = true;
						candy.x = Math.floor(Math.random() * gridNum);
						candy.y = Math.floor(Math.random() * gridNum);
						break;
					}
				}
			} while(collided);

			//Now candy is alive again!
			candy.alive = true;
		}
		//Check if player eats the candy
		if(player.x == candy.x && player.y == candy.y){
			candy.alive = false;
			player.tail++;
		}

		//Check if player eats itself
		if(player.tail > 1){
			for(var i = 1; i < player.tail; i++){
				if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
					player.alive = false;
					clearInterval(updates);
				}
			}
		}

		//Check if player hits border
		if(player.x >= gridNum || player.x <0 || player.y >= gridNum || player.y < 0){
			player.alive = false;
			clearInterval(updates);
		}

		//Move the player
		snakeBody.insert(0, [player.x, player.y]);
		while(snakeBody.length > player.tail + 1){
			snakeBody.pop();
		}

		switch(player.direction){
			//Right
			case 0:
			player.x += 1; break;
			//Left
			case 1:
			player.x -= 1; break;
			//Up
			case 2:
			player.y -= 1; break;
			//down
			case 3:
			player.y += 1; break;
		}

		//call the draw function after updating
		if(player.alive){
			draw();
		}
	}
	//Draw the outcome
	function draw(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		//Draw the candy
		context.fillstyle = "red";
		context.fillRect(candy.x *gridSize, candy.y * gridSize, gridSize, gridSize);
		//Draw snake
		for(var i = 0; i < player.tail; i++){
			context.fillStyle = "black";
			context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize);
		}
	}

	//Keydown events
	$(window).on("keydown", function(event){
		keyPressed = event.which;
	})
	//start updates
	update();
	var updates = setInterval(update, 100);
});
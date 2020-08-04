var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});

var score = 0;
var life = 3;

function preload(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//sky
	game.add.sprite(0, 0, 'sky');
	//platforms
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;
	//ground
	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	//Legdes
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;

	//set text style
	var style = {font:"bold 32px Arial", fill: "#fff"}

	//position the score
	scorelabel = game.add.text(300, 560, "Score: ", style);
	scoretext = game.add.text(420, 560, score, style);
	scorelabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	scoretext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	//Position the lives
	lifelabel = game.add.text(10, 5, "Lives: ", style);
	lifetext = game.add.text(120, 5, life, style);
	lifelabel.setShadow(3,3,'rgba(0,0,0,0.5)', 2);
	lifetext.setShadow(3,3,'rgba(0,0,0,0.5)', 2);

	//Create the player sprite
	player = game.add.sprite(32, 400, 'dude');
	//Animations for player
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	game.physics.arcade.enable(player)
	player.body.bounce.y = 0.2;
	player.bodu.gravity.y = 300;
	player.body.collideWorldBounds = true;

	//Create enemy
	enemy1 = game.add.sprite(760, 20, 'baddie');
	//Animations for enemy
	enemy1.animations.add('left', [0, 1], 10, true);
	enemy1.animations.add('right', [2, 3], 10, true);
	game.physics.arcade.enable(enemy1);
	enemy1.body.bounce.y = 0.2;
	enemy.body.gravity.y = 500;
	enemy1.body.collideWorldBounds = true;

	//Create the stars
	stars = game.add.physicsGroup();
	stars.enableBody = true;
	//Create 12 evenly space stars
	for (var i = 0; i < 12; i++) {
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	//Create keyboard entries
	cursors = game.input.keyboard.createCursorKeys();
}

function update(){
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(enemy1, platforms);

	//reset the player's velocity if nothing happens
	player.body.velocity.x = 0

	//player movement by keys
	if(cursors.left.isDown){
		//move left
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if(cursors.right.isDown){
		//Move right
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -300;
	}

}
var game = new Phaser.Game(1080, 720, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var gameOver;
var score;
var player;
var lightRad;
var starXStart;
var starYStart;
var star;
var bullet;


function preload() {
    game.load.image('bullet', "assets/bullet.png");
    game.load.image('player', "assets/player.png");
    game.load.image('star', "assets/star.png");
    game.load.physics('pData', "assets/player.json");
    game.load.audio('crash', "assets/crash.mp3");
    game.load.audio('bulletFire', "assets/bulletFire.mp3");
    game.load.audio('explode', "assets/explode.mp3");
    
}

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    gameOver = false;
    score = 0;
    score_display = game.add.text(20, 90, "Score: " + score); 
    score_display.addColor("#FFFFFF", 0);
    go_display = game.add.text(540, 360, "Game Over!"); 
    go_display.addColor("#FFFFFF", 0);
    go_display.anchor.setTo(0.5, 0.5);
    go_display.kill();
    crashSound = game.add.audio('crash');
    bulletSound = game.add.audio('bulletFire');
    explosion = game.add.audio('explode');
    player = game.add.sprite(30, 360,'player');
    player.anchor.setTo(0.5,0.5);
    game.physics.p2.enable(player);
    player.body.rotation = (Math.PI / 2)
    player.body.clearShapes();
    player.body.loadPolygon('pData', "player");
    lightRad = 50;
    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFFFFFF, 0.2);
    graphics.drawCircle(30, 360, 2*lightRad);
    graphics.endFill();
    lightAreaPlayer = game.add.sprite(30, 360, graphics.generateTexture());
    lightAreaPlayer.anchor.setTo(0.5, 0.5);
    lightAreaMouse = game.add.sprite(0, 0, graphics.generateTexture());
    lightAreaMouse.anchor.setTo(0.5,0.5);
    graphics.destroy();
    starXStart = 800 + Math.round(Math.random() * 280);
    starYStart = 120 + Math.round(Math.random() * 360);
    star = game.add.sprite(starXStart, starYStart, 'star');
    star.anchor.setTo(0.5,0.5);
    game.physics.p2.enable(star);
    star.visible = false;
    star.body.createBodyCallback(player, crash, this);
    bullet = game.add.sprite(0, 0, 'bullet');
    bullet.anchor.setTo(0.5,0.5);
    game.physics.p2.enable(bullet);
    bullet.kill();
    bulletActive = false;
    game.physics.p2.setImpactEvents(true);


}

function update() {

	score_display.setText("Score: " + score);
	if (!gameOver){
		var playerAngle = Math.atan2(game.input.mousePointer.y - player.y, game.input.mousePointer.x - player.x)
		lightAreaMouse.x = game.input.mousePointer.x;
		lightAreaMouse.y = game.input.mousePointer.y;
		lightAreaPlayer.x = player.x;
		lightAreaPlayer.y = player.y;
		if ((Math.PI / 2) + playerAngle > 0 && (Math.PI / 2) + playerAngle < Math.PI)
		player.body.rotation = (Math.PI / 2) + playerAngle;
		accelerateToObject(star, player, 100);
		if (Math.abs(game.input.mousePointer.x - star.x) < lightRad && Math.abs(game.input.mousePointer.y - star.y) < lightRad) star.visible = true;
		else if (Math.abs(player.x - star.x) < 50 && Math.abs(player.y - star.y) < 50) star.visible = true;
		else star.visible = false;

		if(game.input.activePointer.leftButton.isDown && !bulletActive){
			bullet = game.add.sprite(player.x + 20, player.y , 'bullet');
    		bullet.anchor.setTo(0.5,0.5);
    		game.physics.p2.enable(bullet);
    		bullet.body.createBodyCallback(star, bulletHit, this);
    		bullet.body.velocity.x = Math.cos(playerAngle) * 1000;
    		bullet.body.velocity.y = Math.sin(playerAngle) * 1000;
    		bulletActive = true;
    		if (lightRad > 0) lightRad -= 5;
    		var graphics = game.add.graphics(0, 0);
    		graphics.beginFill(0xFFFFFF, 0.2);
    		graphics.drawCircle(30, 360, 2*lightRad);
    		graphics.endFill();
    		lightAreaMouse.loadTexture(graphics.generateTexture());
    		graphics.destroy();
    		bulletSound.play();
		}

		if (bulletActive && (bullet.x > 1075 || bullet.y < 5 || bullet.y > 715)){
			bullet.destroy();
			bulletActive = false;
		}
	}
	else{

		go_display.revive();

	}


}

// Adapted from http://phaser.io/examples/v2/p2-physics/accelerate-to-object
function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  
    obj1.body.force.x = Math.cos(angle) * speed;
    obj1.body.force.y = Math.sin(angle) * speed;
}

// End adapted code

function crash() {
	player.kill();
	star.kill();
	lightAreaPlayer.kill();
	lightAreaMouse.kill();
	gameOver = true;
	crashSound.play();
}

function bulletHit() {
	bullet.destroy();
	star.destroy();
	starXStart = 800 + Math.round(Math.random() * 280);
    starYStart = 120 + Math.round(Math.random() * 360);
	star = game.add.sprite(starXStart, starYStart, 'star');
    star.anchor.setTo(0.5,0.5);
    game.physics.p2.enable(star);
    star.visible = false;
    star.body.createBodyCallback(player, crash, this);
	bulletActive = false;
	explosion.play();
	score++;
}

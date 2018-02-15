var game = new Phaser.Game(1080, 720, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var player;
var goal;
var goalPosition;
var score;
var thrust;
var percentThere;
var gameOver;
var bmd;

function preload() {
    game.load.image('player', "assets/player.png");
    game.load.image('stars', "assets/stars.png");
    game.load.physics('pData', "assets/player.json");
    game.load.audio('crash', "assets/crash.mp3")
    
}

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.setBounds(0, 0, 63200, 720);
    score = 0;
    thrust = 100;
    percentThere = 0;
    gameOver = false;
    goalPosition = 31600 + Math.round(Math.random() * 31570);
    game.stage.backgroundColor = '#000000';
    score_display = game.add.text(20, 90, "Score: " + score); //Sets up Score display
    score_display.fixedToCamera = true;
    score_display.addColor("#FFFFFF", 0);
    score_display.kill();
    speed_display = game.add.text(20, 90, "Speed: 0"); //Sets up Speed display
    speed_display.fixedToCamera = true;
    speed_display.addColor("#FFFFFF", 0);
    time_display = game.add.text(20, 150, Number(game.time.now/1000).toFixed(2) + "s");
    time_display.addColor("#FFFFFF", 0);
    time_display.fixedToCamera = true;
    percent_display = game.add.text(540, 90, percentThere + "%"); //Sets up progress display
    percent_display.anchor.setTo(0.5, 0.5);
    percent_display.fixedToCamera = true;
    percent_display.addColor("#FFFFFF", 0);
    percent_display.kill();
    crashSound = game.add.audio('crash');
    game.physics.startSystem(Phaser.Physics.P2JS);
    player = game.add.sprite(30, 360,'player');
    player.anchor.setTo(0.5,0.5);
    game.physics.p2.enable(player);
    player.body.rotation = (Math.PI / 2)
    player.body.clearShapes();
    player.body.loadPolygon('pData', "player");
    goal = game.add.sprite(goalPosition, 360, 'player');
    goal.anchor.setTo(0.5, 0.5);
    game.physics.p2.enable(goal);
    goal.body.rotation = (3 * Math.PI / 2)
    goal.body.clearShapes();
    goal.body.loadPolygon('pData', "player");
    game.camera.follow(player);





}

function update() {

    score_display.setText("Score: " + score);
    speed_display.setText("Speed: " + Math.round(player.body.velocity.x));
    percent_display.setText(Number((percentThere * 100)).toFixed(2) + "%");

    if(gameOver){ 
        score_display.revive();
        speed_display.kill();
        percent_display.revive();
    }


    if(!gameOver){
        time_display.setText(Number(game.time.now/1000).toFixed(2) + "s")
        percentThere = ( 1 - (((goal.x - 15) - (player.x + 15)) / (goalPosition - 60)));
        score += Math.round(percentThere * player.body.velocity.x / 10 * 63110 / (goalPosition - 30)); //Calculates score based on relative distance to goal
        if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && player.body.velocity.x < 3000){  //Caps the speed at 3000
            player.body.velocity.x += 10;
        }

    }

    if(player.x + 15 >= goal.x - 15 && !gameOver){
        score = 0;
        crashSound.play();
        gameOver = true;
    }

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        player.body.velocity.x = 0;
        gameOver = true;
    }

    if(game.time.now >= 30000 && !gameOver){
        score = 0;
        gameOver = true;
    }



}

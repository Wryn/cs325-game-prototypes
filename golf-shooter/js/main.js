var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;

function preload() {
    game.load.image('player', "assets/player.png");
    game.load.image('bullet', "assets/bullet.png");
    game.load.image('hole', "assets/hole.png");
    game.load.audio('hit', "assets/hit.ogg");
    
}

function create() {

    game.stage.backgroundColor = '#22AA22';
    gameWon = false;
    score = 0;
    score_display = game.add.text(20, 90, "Score: " + score);
    player = game.add.sprite(320, 400,'player');
    player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(player);
    player.body.immovable = true;
    enemy = game.add.sprite(320, 80, 'hole');
    enemy.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(enemy);
    enemy.body.immovable = true;
    enemy.body.velocity.x = 250;
    hit_sound = game.add.audio('hit');
    hit_sound.play();
    //The following code is adapted from https://gamemechanicexplorer.com/#bullets-2
    SHOT_DELAY = 100; // milliseconds (10 bullets/second)
    BULLET_SPEED = 100; // pixels/second
    NUMBER_OF_BULLETS = 1;
    lastBulletShotAt = 0;
    bulletPool = game.add.group();
    for(var i = 0; i < NUMBER_OF_BULLETS; i++){
        var bullet = game.add.sprite(0, 0, 'bullet');
        bulletPool.add(bullet);
        bullet.anchor.setTo(0.5, 0.5);
        game.physics.enable(bullet, Phaser.Physics.ARCADE);
        bullet.kill();
    }
    //end adapted code
    game.world.bringToTop(player);

}

function update() {

    //The followinng code is adapted from https://gamemechanicexplorer.com/#bullets-4
    game.physics.arcade.collide(enemy, bulletPool, function(enemy, bullet) {
        score += 1;
        score_display.setText("Score: " + score);
        bullet.kill();
    }, null, this);
    //end adapted code

    if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
        if(player.x - 15 > 0) player.x -= 3;
    }
    else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
        if(player.x + 15 < 640) player.x += 3;
    }
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        shootBullet();
    }

    if(enemy.x - 15 < 0) enemy.body.velocity.x = 250;
    if(enemy.x + 15 > 640) enemy.body.velocity.x = -250;

    if (score >= 10 && !gameWon) {
        winText = game.add.text(320, 240, "You Win!");
        winText.anchor.setTo(0.5, 0.5);
        timeText = game.add.text(320, 270, (game.time.now / 1000) + "s");
        timeText.anchor.setTo(0.5, 0.5);
        gameWon = true;
    }


}

//The following code is adapted from https://gamemechanicexplorer.com/#bullets-2
function shootBullet(){
    game.world.bringToTop(player);
    if (game.time.now - lastBulletShotAt < SHOT_DELAY) return;
    lastBulletShotAt = game.time.now;
    var bullet = bulletPool.getFirstDead();
    if (bullet === null || bullet === undefined) return;
    hit_sound.restart();
    bullet.revive();
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;
    bullet.reset(player.x, player.y);
    bullet.body.velocity.y = (-1) * BULLET_SPEED;
    bullet.body.velocity.x = 0;
}
//end adapted code
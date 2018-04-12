var game = new Phaser.Game(1080, 720, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

var p1_select;
var p1_selected;
var p1_count;
var p1_health;
var p2_select;
var p2_selected;
var p2_count;
var p2_health;
var turn;
var round;
var game_over;
var i;
var play;

function preload() {
	game.load.image('sword', "assets/sword.png");
	game.load.image('axe', "assets/axe.png");
	game.load.image('bow', "assets/bow.png");
	game.load.image('block', "assets/block.png");
	game.load.image('dodge', "assets/dodge.png");
	game.load.image('select', "assets/select.png");
    
}

function create() {

	sword_icon = game.add.sprite(540, 240, 'sword');
	sword_icon.anchor.setTo(0.5,0.5);
	sword_icon.inputEnabled = true;
	sword_icon.events.onInputDown.add(sword, this);
	num_swords = game.add.text(540, 360, '');
	num_swords.addColor("#FFFFFF", 0);
	num_swords.anchor.setTo(0.5,0.5);

	axe_icon = game.add.sprite(270, 240, 'axe');
	axe_icon.anchor.setTo(0.5,0.5);
	axe_icon.inputEnabled = true;
	axe_icon.events.onInputDown.add(axe, this);
	num_axes = game.add.text(270, 360, '');
	num_axes.addColor("#FFFFFF", 0);
	num_axes.anchor.setTo(0.5,0.5);

	bow_icon = game.add.sprite(810, 240, 'bow');
	bow_icon.anchor.setTo(0.5,0.5);
	bow_icon.inputEnabled = true;
	bow_icon.events.onInputDown.add(bow, this);
	num_bows = game.add.text(810, 360, '');
	num_bows.addColor("#FFFFFF", 0);
	num_bows.anchor.setTo(0.5,0.5);

	block_icon = game.add.sprite(405, 360, 'block');
	block_icon.anchor.setTo(0.5, 0.5);
	block_icon.inputEnabled = true;
	block_icon.events.onInputDown.add(block, this);
	num_blocks = game.add.text(405, 240, '');
	num_blocks.addColor("#FFFFFF", 0);
	num_blocks.anchor.setTo(0.5,0.5);

	dodge_icon = game.add.sprite(675, 360, 'dodge');
	dodge_icon.anchor.setTo(0.5, 0.5);
	dodge_icon.inputEnabled = true;
	dodge_icon.events.onInputDown.add(dodge, this);
	num_dodges = game.add.text(675, 240, '');
	num_dodges.addColor("#FFFFFF", 0);
	num_dodges.anchor.setTo(0.5,0.5);

	select_1 = game.add.sprite(270, 480, 'select');
	select_1.anchor.setTo(0.5, 0.5);
	select_1.inputEnabled = true;

	select_2 = game.add.sprite(540, 480, 'select');
	select_2.anchor.setTo(0.5, 0.5);
	select_2.inputEnabled = true;

	select_3 = game.add.sprite(810, 480, 'select');
	select_3.anchor.setTo(0.5, 0.5);
	select_3.inputEnabled = true;

	p1_health = 10;
	p1_health_display = game.add.text(20, 60, "P1 Health: " + p1_health);
	p1_health_display.addColor("#FFFFFF", 0);

	p2_health = 10;
    p2_health_display = game.add.text(890, 60, "P2 Health: " + p2_health);
	p2_health_display.addColor("#FFFFFF", 0);

	turn = 1;
	turn_display = game.add.text(540, 120, "Player " + turn + "'s Turn");
	turn_display.anchor.setTo(0.5,0.5);
	turn_display.addColor("#FFFFFF", 0);

	p1_select = 0;
	p1_selected = [0, 0, 0];
	p1_count = [2, 2, 2, 3, 3];

	p2_select = 0;
	p2_selected = [0, 0, 0];
	p2_count = [2, 2, 2, 3, 3];

	round = 1;
	round_display = game.add.text(540, 60, "Round " + round);
	round_display.anchor.setTo(0.5,0.5);
	round_display.addColor("#FFFFFF", 0);

	game_over = false;
	go_display = game.add.text(540, 330, "Game Over!"); 
    go_display.addColor("#FFFFFF", 0);
    go_display.anchor.setTo(0.5, 0.5);
    go_display.kill();

	i = 0;
	play = true;


}

function update() {
	if(!game_over){
		var selected = [0, 0, 0];
		turn_display.setText("Player " + turn + "'s Turn");
		round_display.setText("Round (" + round + "/3)");

		if(round == 4) round_display.setText("Tiebreaker Round");

		if(turn == 1){

			sword_icon.revive();
			axe_icon.revive();
			bow_icon.revive();
			block_icon.revive();
			dodge_icon.revive();
			num_swords.revive();
			num_axes.revive();
			num_bows.revive();
			num_blocks.revive();
			num_dodges.revive();
			select_1.revive();
			select_2.revive();
			select_3.revive();
			turn_display.revive();

			num_swords.setText("Swords: " + p1_count[0]);
			num_axes.setText("Axes: " + p1_count[1]);
			num_bows.setText("Bows: " + p1_count[2]);
			num_blocks.setText("Blocks: " + p1_count[3]);
			num_dodges.setText("Dodges: " + p1_count[4]);
			selected = p1_selected;

		}

		else if(turn == 2){

			num_swords.setText("Swords: " + p2_count[0]);
			num_axes.setText("Axes: " + p2_count[1]);
			num_bows.setText("Bows: " + p2_count[2]);
			num_blocks.setText("Blocks: " + p2_count[3]);
			num_dodges.setText("Dodges: " + p2_count[4]);
			selected = p2_selected;

		}

		else if (play){

			sword_icon.kill();
			axe_icon.kill();
			bow_icon.kill();
			block_icon.kill();
			dodge_icon.kill();
			num_swords.kill();
			num_axes.kill();
			num_bows.kill();
			num_blocks.kill();
			num_dodges.kill();
			select_1.kill();
			select_2.kill();
			select_3.kill();
			turn_display.kill();

			var p1_damage = 0;
			var p1_block = false;
			var p1_dodge = false;
			var p1_unblockable = false;
			var p1_undodgable = false;

			var p2_damage = 0;
			var p2_block = false;
			var p2_dodge = false;
			var p2_unblockable = false;
			var p2_undodgable = false;

			p1_selection = game.add.sprite(270, 360, 'select');
			p1_selection.anchor.setTo(0.5,0.5);
			p1_selection_text = game.add.text(270, 440, '');
			p1_selection_text.anchor.setTo(0.5,0.5);
			p1_selection_text.addColor("#FFFFFF", 0);
			p2_selection = game.add.sprite(810, 360, 'select');
			p2_selection.anchor.setTo(0.5,0.5);
			p2_selection_text = game.add.text(810, 440, '');
			p2_selection_text.anchor.setTo(0.5,0.5);
			p2_selection_text.addColor("#FFFFFF", 0);
			move_text = game.add.text(540, 300, "Move: " + (i + 1));
			move_text.anchor.setTo(0.5, 0.5);
			move_text.addColor("#FFFFFF", 0);
			vs_text = game.add.text(540, 360, "vs.");
			vs_text.anchor.setTo(0.5, 0.5);
			vs_text.addColor("#FFFFFF", 0);


			switch(p1_selected[i]){

				case 1: p1_damage = 4; p1_selection.loadTexture('sword'); p1_selection_text.setText("Deal 4 Damage"); break;
				case 2: p1_damage = 2; p1_selection.loadTexture('axe'); p1_unblockable = true; p1_selection_text.setText("Deal 2 Damage, Unblockable"); break;
				case 3: p1_damage = 3; p1_selection.loadTexture('bow'); p1_undodgable = true; p1_selection_text.setText("Deal 3 Damage, Undodgeable"); break;
				case 4: p1_block = true; p1_selection.loadTexture('block'); p1_selection_text.setText("Reduce Incoming Damage by 3"); break;
				case 5: p1_dodge = true; p1_selection.loadTexture('dodge'); p1_selection_text.setText("Reduce Incoming Damage to 0"); break;
				default: break;

			}

			switch(p2_selected[i]){

				case 1: p2_damage = 4; p2_selection.loadTexture('sword'); p2_selection_text.setText("Deal 4 Damage"); break;
				case 2: p2_damage = 2; p2_selection.loadTexture('axe'); p2_unblockable = true; p2_selection_text.setText("Deal 2 Damage, Unblockable"); break;
				case 3: p2_damage = 3; p2_selection.loadTexture('bow'); p2_undodgable = true; p2_selection_text.setText("Deal 3 Damage, Undodgeable"); break;
				case 4: p2_block = true; p2_selection.loadTexture('block'); p2_selection_text.setText("Reduce Incoming Damage by 3"); break;
				case 5: p2_dodge = true; p2_selection.loadTexture('dodge'); p2_selection_text.setText("Reduce Incoming Damage to 0"); break;
				default: break;

			}

			if((!p1_dodge || p2_undodgable) && p2_damage > 0){

				if(!p1_block || p2_unblockable) p1_health -= p2_damage;
				else p1_health -= (p2_damage - 3);
				if (p1_health < 0) p1_health = 0;
				p1_health_display.setText("P1 Health: " + p1_health);

			}

			if((!p2_dodge || p1_undodgable) && p1_damage > 0){

				if(!p2_block || p1_unblockable) p2_health -= p1_damage;
				else p2_health -= (p1_damage - 3);
				if (p2_health < 0) p2_health = 0;
				p2_health_display.setText("P2 Health: " + p2_health);

			}

			play = false;
			setTimeout(playTurn, 2500);


		}

		switch(selected[0]){

			case 1: select_1.loadTexture('sword'); break;
			case 2: select_1.loadTexture('axe'); break;
			case 3: select_1.loadTexture('bow'); break;
			case 4: select_1.loadTexture('block'); break;
			case 5: select_1.loadTexture('dodge'); break;
			default: select_1.loadTexture('select'); break;

		}

		switch(selected[1]){

			case 1: select_2.loadTexture('sword'); break;
			case 2: select_2.loadTexture('axe'); break;
			case 3: select_2.loadTexture('bow'); break;
			case 4: select_2.loadTexture('block'); break;
			case 5: select_2.loadTexture('dodge'); break;
			default: select_2.loadTexture('select'); break;

		}

		switch(selected[2]){

			case 1: select_3.loadTexture('sword'); break;
			case 2: select_3.loadTexture('axe'); break;
			case 3: select_3.loadTexture('bow'); break;
			case 4: select_3.loadTexture('block'); break;
			case 5: select_3.loadTexture('dodge'); break;
			default: select_3.loadTexture('select'); break;

		}
	}
	else{
		go_display.revive();
		determineWinner();
	}

}

function sword() {

	if (turn == 1){

		if(p1_count[0] > 0){
			p1_selected[p1_select] = 1;
			if(p1_select == 2) endTurn();
			p1_select = (p1_select + 1) % 3;
			p1_count[0]--;
		}

	}
	else if (turn == 2){

		if(p2_count[0] > 0){
			p2_selected[p2_select] = 1;
			if(p2_select == 2) endTurn();
			p2_select = (p2_select + 1) % 3;
			p2_count[0]--;
		}

	}

}

function axe() {

	if (turn == 1){

		if(p1_count[1] > 0){
			p1_selected[p1_select] = 2;
			if(p1_select == 2) endTurn();
			p1_select = (p1_select + 1) % 3;
			p1_count[1]--;
		}

	}
	else if (turn == 2){

		if(p2_count[1] > 0){
			p2_selected[p2_select] = 2;
			if(p2_select == 2) endTurn();
			p2_select = (p2_select + 1) % 3;
			p2_count[1]--;
		}

	}

}

function bow() {

	if (turn == 1){

		if(p1_count[2] > 0){
			p1_selected[p1_select] = 3;
			if(p1_select == 2) endTurn();
			p1_select = (p1_select + 1) % 3;
			p1_count[2]--;
		}

	}
	else if (turn == 2){

		if(p2_count[2] > 0){
			p2_selected[p2_select] = 3;
			if(p2_select == 2) endTurn();
			p2_select = (p2_select + 1) % 3;
			p2_count[2]--;
		}

	}

}

function block() {

	if (turn == 1){

		if(p1_count[3] > 0){
			p1_selected[p1_select] = 4;
			if(p1_select == 2) endTurn();
			p1_select = (p1_select + 1) % 3;
			p1_count[3]--;
		}

	}
	else if (turn == 2){

		if(p2_count[3] > 0){
			p2_selected[p2_select] = 4;
			if(p2_select == 2) endTurn();
			p2_select = (p2_select + 1) % 3;
			p2_count[3]--;
		}

	}

}

function dodge() {

	if (turn == 1){

		if(p1_count[4] > 0){
			p1_selected[p1_select] = 5;
			if(p1_select == 2) endTurn();
			p1_select = (p1_select + 1) % 3;
			p1_count[4]--;
		}

	}
	else if (turn == 2){

		if(p2_count[4] > 0){
			p2_selected[p2_select] = 5;
			if(p2_select == 2) endTurn();
			p2_select = (p2_select + 1) % 3;
			p2_count[4]--;
		}

	}

}

function clearSelect(){

	p1_selected = [0, 0, 0];
	p2_selected = [0, 0, 0];

}

function endTurn(){

	turn = (turn + 1) % 3

}

function determineWinner(){

	winner = game.add.text(540, 390, '');
	winner.anchor.setTo(0.5,0.5);
	winner.addColor("#FFFFFF", 0);
	var p1_win = (p2_health == 0 || p2_health < p1_health);
	var p2_win = (p1_health == 0 || p1_health < p2_health);
	if (p1_win && p2_win) winner.setText("Draw!");
	else if (p1_win) winner.setText("P1 Wins!");
	else if (p2_win) winner.setText("P2 Wins!");
	else winner.setText("Draw!");

}

function playTurn(){

  	p1_selection.destroy();
	p2_selection.destroy();
	p1_selection_text.destroy();
	p2_selection_text.destroy();
	move_text.destroy();
	vs_text.destroy();
	i = (i + 1) % 4;

	if(p1_health == 0 || p2_health == 0) game_over = true;
			
	if (i == 3){
		i = (i + 1) % 4;
		clearSelect();
		turn++;
		round++;
		if(round == 4 && p1_health != p2_health) game_over = true;
		if(round > 4) game_over = true;
	}

	play = true;

}
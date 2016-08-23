var game = {
	state: 'running',
	active: 'player',
	turn: 0,
	latest: {
		day: 1,
		month: 1
	},
	history: []
};


/* Game Logic */

function botTurn(){

	//if 31. or Dec -> choose 12/31 and win
	if(game.latest.day == 31 || game.latest.month == 12){
		day = 31;
		month = 12;
	}else{
		var day = getRandomInt(game.latest.day + 1, monthDays[game.latest.month]);
		var month = getRandomInt(game.latest.month + 1, 12);
		
			// 50% chance to change day, 50% for month
			if(Math.round(Math.random())){
				day = game.latest.day;
			}else{
				month = game.latest.month;
			}
	}

	//modify the select options
	modifyControls(day, month);
	//do regular turn logic
	gameTurn(day, month, 'bot');
}

/**/

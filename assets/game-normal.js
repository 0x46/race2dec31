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

if(Math.round(Math.random())) botTurn();

function botTurn(){

	//if 31. or Dec -> choose 12/31 and win
	if(game.latest.day == 31 || game.latest.month == 12){
		day = 31;
		month = 12;
	}else{
		var day = getRandomInt(game.latest.day + 1, monthDays[game.latest.month]);
		var month = getRandomInt(game.latest.month + 1, 12);
		
		//if random day = 31 or lastest day = maxDays -> dont use this day
		if(game.latest.day == monthDays[game.latest.month] || day == 31){
			day = game.latest.day;
		//if random month = 12 -> dont use this month
		}else if(month == 12){
			month = game.latest.month;
		}else{
			// 50% chance to change day, 50% for month
			if(Math.round(Math.random())){
				day = game.latest.day;
			}else{
				month = game.latest.month;
			}
		}
	}

	//modify the select options
	modifyControls(day, month);
	//do regular turn logic
	gameTurn(day, month, 'bot');
}

/**/

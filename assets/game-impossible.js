var game = {
	state: 'running',
	active: 'bot',
	turn: 0,
	latest: {
		day: 1,
		month: 1
	},
	history: []
};

/* Game Logic */
botTurn();

function botTurn(){

	//if 31. or Dec -> choose 12/31 and win
	if(game.latest.day == 31 || game.latest.month == 12){
		day = 31;
		month = 12;
	}else{
		
		if(game.latest.day >= (game.latest.month + 19)){
			
			day = game.latest.day;
			month = strategyMonths[game.latest.day];
			
		}else{
			day = game.latest.month + 19;
			month = game.latest.month;
		}
		
	}

	//modify the select options
	modifyControls(day, month);
	//do regular turn logic
	gameTurn(day, month, 'bot');
}

//        
strategyMonths = new Array(31);
strategyMonths[20] = 1;
strategyMonths[21] = 2;
strategyMonths[22] = 3;
strategyMonths[23] = 4;
strategyMonths[24] = 5;
strategyMonths[25] = 6;
strategyMonths[26] = 7;
strategyMonths[27] = 8;
strategyMonths[28] = 9;
strategyMonths[29] = 10;
strategyMonths[30] = 11;
strategyMonths[31] = 12;

/**/

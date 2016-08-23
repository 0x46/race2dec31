/* Game Turn Logic */

function gameTurn(day, month, type){

	//check if the game is over
	var winning = (day == 31 && month == 12);
	if(winning) game.state = 'finished';
	
	//add state to history array
	game.turn++;
	game.history.push({
		turn: game.turn,
		type: type,
		input: {
			day: day,
			month: month
		},
		winning: winning
	});
	//modify game object
	game.latest = {
		day: day,
		month: month
	}
	
	//trigger next turn
	if(!winning){
		
		if(type == 'player'){
			game.active = 'bot';
			$('#controls').fadeOut();
			setTimeout(botTurn, 750);
		}else{
			game.active = 'player';
			$('#controls').fadeIn();
		}
	}
	
	//visuals
	addToFeed(game.history[game.history.length-1]);
	
}

/**/


/* Helpers */

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//           X Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**/

/* Visual Presenation */

function addToFeed(turn){
	$('#history').stop();
	
	$('#history').append(
		'<div class="turn turn-' + turn.type + '">' + 
		'<span class="glyphicon glyphicon-' + ( (turn.type == 'bot') ? 'console' : 'user' ) + '"></span>' + 
		'<p><strong>' + ( (turn.type == 'bot') ? 'RaceBot' : 'You' ) + '</strong>' +
		'<span class="label label-' + ( (turn.type == 'bot') ? 'danger' : 'primary' ) + '">' + turn.input.day + '. ' + monthNames[turn.input.month] + '</span></p>'
	);
	if(turn.winning){
		$('#history').append(
			'<hr>' +
			'<div class="msg">' + 
			'<strong>' + ( (turn.type == 'bot') ? 'RaceBot' : 'You' ) + '</strong>' +
			' won the race! <small>(<samp>' + turn.turn + '</samp> turns)</small>' +
			'</div>'
		);
		$('#history').append(
			'<hr>' +
			'<div class="msg">' + 
			'<button class="btn btn-default" type="button" id="restart">Play Another Round</button>' +
			'</div>'
		);
	}
	
	$('#history').animate({ scrollTop: $('#history').prop('scrollHeight') }, 1000, 'swing');
}

function modifyControls(day, month){		
	$('[data-label="month"]').text(monthNames[month]);
	$('[data-label="day"]').text(day+'.');

	switch(month){
		case 4:
		case 6:
		case 9:
		case 11:
			$('select[data-value="day"] option[value="31"]').hide();
		break;
		case 2:
			$('select[data-value="day"] option[value="31"], select[data-value="day"] option[value="30"], select[data-value="day"] option[value="29"]').hide();
		break;
		default: 
			$('select[data-value="day"] option').show();
	}
	
	$.each($('select[data-value="month"] option'), function(i, elem){
		if($(elem).val() <= month){
			$(elem).remove();
		}
	});
	
	$.each($('select[data-value="day"] option'), function(i, elem){
		if($(elem).val() <= day){
			$(elem).remove();
		}
	});
	
	if($('select[data-value="month"] option').length == 0){
		$('select[data-value="month"]').val('');
		$('select[data-value="month"]').attr('disabled', 'disabled');
		$('select[data-value="month"]').parent().find('button').attr('disabled', 'disabled').addClass('disabled');
	}
	if(day == monthDays[month]){
		$('select[data-value="day"]').val('');
		$('select[data-value="day"]').attr('disabled', 'disabled');
		$('select[data-value="day"]').parent().find('button').attr('disabled', 'disabled').addClass('disabled');
	}else{
		$('select[data-value="day"]').attr('disabled', false);
		$('select[data-value="day"]').parent().find('button').attr('disabled', false).removeClass('disabled');
		$('select option:eq(0)').attr('selected','selected');
	}
	
	$('select[data-value="month"] option:eq(0)').attr('selected','selected');
}

/**/


/* Interaction */
		
$('[data-confirm]').click(function(e){
	e.preventDefault();
	if(game.state == 'running' && game.active == 'player'){
		if($(this).data('confirm') == 'day'){
			gameTurn(parseInt($('[data-value="day"]').val()), game.latest.month, 'player');
		}else{
			gameTurn(game.latest.day, parseInt($('[data-value="month"]').val()), 'player');
		}
	}
});

$(document).on('click', '#restart', function(e){
	e.preventDefault();
	window.location.reload(0);
});

/**/


/* Helpers */

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//           X Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

$('#currDiff').html(difficulty);

/**/

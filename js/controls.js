var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

function checkKey(e){

	switch(e.keyCode){
		case RIGHT:
			e.preventDefault();
			game.board.moveRight()
			console.log('right');
			break;
		case LEFT:
			e.preventDefault();
			game.board.moveLeft()
			console.log('left');
			break;
		case DOWN:
			e.preventDefault();
			break;
		case UP:
			e.preventDefault();
			break;
		
	}
}


if ($.browser.mozilla) {
    $(window).keypress (checkKey);
} else {
    $(document).keydown (checkKey);
}
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;

function checkKey(e){

	switch(e.keyCode){
		case RIGHT:
			e.preventDefault();
			game.board.moveRight()
			break;
		case LEFT:
			e.preventDefault();
			game.board.moveLeft();
			break;
		case DOWN:
			e.preventDefault();
			game.board.moveDown();
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
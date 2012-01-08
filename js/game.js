function Game()
{
	this.board = new Board();
	
};

Game.prototype.init = function(){
	setInterval("game.board.draw()", 30);
}



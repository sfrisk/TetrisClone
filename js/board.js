function Board(){
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.width = 320;
	this.height = 576;
	this.cellwidth = 32;
	this.running = true;
	this.cycle = 0;
	this.move = false;
	this.completedRows = 0;
	this.currentTile = [4,-1];
	this.tile = 	[[0,1,0,0],
					[0,1,0,0],
					[0,1,1,0],
					[0,0,0,0]];
	this.map = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[1,1,1,1,1,1,1,1,1,1]	
	];
	
	
}
Board.prototype.draw = function(){
	if(this.running)
	{
		this.clear();
		this.generateGrid();
		this.drawActive();
		this.cycle ++;
		if (this.cycle == 10){
			this.cycle = 0;
			if(this.move == false){
				this.moveActiveDown();
			}
			
		}
		this.move = false;
	}
	
}
Board.prototype.clear = function(){
	this.ctx.clearRect(0,0, this.width, this.height);
}
Board.prototype.generateGrid = function(){
	for (var y = 0; y < 18; y++){
		for (var x = 0; x < 10; x++){
			tile = this.map[y][x];
			switch(tile){		
				case 1:
					this.drawRect(x*32,y*32, 32, 32, [139,137,137]);
					break;
				case 2:
					this.drawRect(x*32,y*32, 32, 32, [49,79,79]);
					break;
				case 3: 
					this.drawRect(x*32,y*32, 32, 32, [255,105,180]);
					break;
				default:
					this.drawRect(x*32,y*32, 32, 32, [255,250,250]);		
			}		
		}
	}
}
Board.prototype.drawRect = function(x,y,w,h,color){
	this.ctx.beginPath();
	this.ctx.fillStyle = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')';
	this.ctx.rect(x,y,32,32);
	this.ctx.closePath();
	this.ctx.fill();
}

Board.prototype.moveActiveDown = function(){
	//if(this.map[this.currentTile[1] + 1][this.currentTile[0]] == 0){
	if(this.checkCollision() == false){
		this.currentTile[1] +=1;
	}
	else{
		if(this.currentTile[1] == 0)
		{
			alert("Game Over");
			this.running = false;
		}
		else{
			//this.map[this.currentTile[1]][this.currentTile[0]] = 2;
			for(var i=0; i < this.tile[0].length; i++){
				for(var j=this.tile.length-1; j>=0; j--){
					if(this.tile[i][j] == 1){
						this.map[this.currentTile[1] +i ][this.currentTile[0] + j] = 2;
					}
				}
			}
					
			this.currentTile = [4,-1];
			this.checkForRow();

		}
	}
	this.move = true;
}

Board.prototype.checkCollision = function(){
	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			if(this.tile[i][j] == 1 && this.map[this.currentTile[1]+i + 1][this.currentTile[0]+j] != 0){
				return true;
			}
		}
	}
	
	return false;
}

Board.prototype.checkForRow = function(){
	for (var y = 0; y < 17; y++){
		var isRow = true;
		var x = 0;
		while (x < 10){
			if(this.map[y][x] == 0){
				isRow = false;	
				x = 10;
			}
			else{
				x++;
			}
		}
		if(isRow == true){
			for (var x = 0; x < 10; x++){
				this.map[y][x] = 3;
			}
			this.completedRows += 1;		
		}
		
	}
	for(var y = 17; y > -1; y--){
		if(this.map[y][0] != 3){
			//Neeeeeext
		}
		else{
			for(var i = y; i > 0; i--){
				for (var x = 0; x < 10; x++){
					this.map[i][x] = this.map[i-1][x];
				}
			}
			for (var x = 0; x < 10; x++){
				this.map[i][x] = 0;
			}
		}
		
	}
}

Board.prototype.drawActive = function(){	
	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			if(this.tile[i][j] == 1){
				this.drawRect(this.currentTile[0]*32 + (j*32),this.currentTile[1]*32 + (i*32), 32, 32, [218,112,214]);
			}
		}
	}
}

Board.prototype.moveRight = function(){
	var moveRight = true;
	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			if(this.tile[i][j] == 1){
				if(this.currentTile[1] + i < 11 && this.map[this.currentTile[1]+i ][this.currentTile[0]+j - 1] == 0){
					
				}
				else{
					moveRight = false;
				}
			}
		}
	}
	if(moveRight == true){
		this.currentTile[0] +=1;
	}
	
}
Board.prototype.moveLeft = function(){	
	if(this.map[this.currentTile[1]][this.currentTile[0] - 1] == 0){
		this.currentTile[0] -=1;
	}
	else{
		
	}
}

Board.prototype.rotate = function(){
	var newTile = 	[[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]];

	for(var i=0; i < this.tile[0].length; i++){
		for(var j=this.tile.length-1; j>=0; j--){
			newTile[i][j] = this.tile[4-j-1][i];
		}
	}
	this.tile = newTile;


}
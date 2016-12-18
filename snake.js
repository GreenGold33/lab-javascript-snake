function Snake(options) {
	this.direction = 1;
	this.body = ;
	this.startPosition = {
		row: 1,
		column: 1
	}
	this.body.push(this.startPosition);
}

Snake.prototype.moveForward = function(food) {
	for(var i = this.body.length-1; i > 0; i--){
		this.body[i].column = this.body[i-1].column;
		this.body[i].row = this.body[i-1].row;
	}
	switch(this.direction){
		// Up
		case 0:
			this.body[0].row--;
			if (this.body[0].row < 0){
				this.body[0].row = 49;
			}
			break;
		// Right
		case 1:
			this.body[0].column++;
			if (this.body[0].column > 50){
				this.body[0].column = 0;
			}
			break;
		// Down
		case 2:
			this.body[0].row++;
			if (this.body[0].row > 50 ){
				this.body[0].row = 0;
			}
			break;
		case 3:
			this.body[0].column--;
			if (this.body[0].column < 0) {
				this.body[0].column = 49;
			}
			break;
	}

	if (this.body.some(function (position, index, array) {
		return (position.row === array[0].row && position.column === array[0].column && index != 0)
	})) {
		console.log('Game Over');
		clearInterval(intervalSnake);
	}
	if (this.body[0].row === food.row && this.body[0].column === food.column){
		this.body.unshift(food);
		var selector = '[data-row=' + food.row + '][data-col=' + food.column + ']';
		$(selector).removeClass('food');
		$(selector).addClass('active');
	}
};

Snake.prototype.goLeft = function() {
	switch(this.direction){
			// Up and Down
			case 0:
			case 2:
				this.direction = 3;
				break;
		}
};

Snake.prototype.goRight = function() {
	switch(this.direction){
		// Up and Down
		case 0:
		case 2:
			this.direction = 1;
			break;
	}
};

Snake.prototype.goUp = function() {
	switch(this.direction){
		// Right and Left
		case 1:
		case 3:
			this.direction = 0;
			break;
	}
};

Snake.prototype.goDown = function() {
	switch(this.direction){
		// Right and Left
		case 1:
		case 3:
			this.direction = 2;
			break;
	}
};

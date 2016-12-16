var rows = 50;
var cols = 50;
var board = [];
var cells = [];
var food = {
	row: Math.floor(Math.random() * 50),
	column: Math.floor(Math.random() * 50)
}


function generateBoard(){
	for (var i = 0; i< 50; i++){
		board.push([]);
		for (var j = 0; j < 50; j++){
			board[i][j] = null;
		}
	}
}

function createGrid(root) {
	board.forEach(function(row, indexRow) {
		row.forEach(function(column, indexColumn) {
			var cell = $('<div>').addClass('cell board');
      cell.attr('data-row', indexRow).attr('data-col', indexColumn);
      cells.push(cell);
      root.append(cell);
		})
	})
};

function printSnake(){
	resetBoard();
	s.body.forEach( function(position, index) {
		var selector = '[data-row=' + position.row + '][data-col=' + position.column + ']';
		$(selector).addClass('active');
	})

}

function resetBoard(){
	var selector = '.active';
	$(selector).removeClass('active')
}

function generateFood(snakeBody) {
	food = {
		row: Math.floor(Math.random() * 50),
		column: Math.floor(Math.random() * 50)
	}
	if (!snakeBody.some(function (position) {
		return (position.row === food.row && position.column === food.column)
	})) {
		// board[food.row][food.column] = 'f';
		var selector = '[data-row=' + food.row + '][data-col=' + food.column + ']';
		$(selector).addClass('food');
	} else {
		generateFood(snakeBody);
	}
	
}

class Snake {
	constructor(){
		// direction 0=up, 1=right, 2=down, 3=left
		this.direction = 1;
		this.body = [{row: 1, column: 7},{row: 1, column: 6},{row: 1, column: 5},{row:1, column: 4},{row:1, column: 3}, {row:1, column: 2}, {row:1, column: 1}];
	}

	moveFordward(){
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
			generateFood(this.body);
		}
	}

	goLeft(){
		switch(this.direction){
			// Up and Down
			case 0:
			case 2:
				this.direction = 3;
				break;
		}
	}

	goRight(){
		switch(this.direction){
			// Up and Down
			case 0:
			case 2:
				this.direction = 1;
				break;
		}
	}

	goUp(){
		switch(this.direction){
			// Right and Left
			case 1:
			case 3:
				this.direction = 0;
				break;
		}
	}

	goDown(){
		switch(this.direction){
			// Right and Left
			case 1:
			case 3:
				this.direction = 2;
				break;
		}
	}
}



$('body').on('keypress', function(e) {
  switch (e.keyCode) {
    case 119: // w
      s.goUp();
      break;
    case 115: // s
      s.goDown();
      break;
    case 97: // a
      s.goLeft();
      break;
    case 100: // d
      s.goRight();
      break;
    case 102: // f
    	clearInterval(intervalSnake);
    	break;
    default:
      break;
  }
});

generateBoard();
var $root = $('.container');
createGrid($root);
var s = new Snake();
printSnake();
var intervalSnake = setInterval( function(){ 
	if ($(".food").length <= 0) {
		generateFood(s.body);
	}
	s.moveFordward();
	printSnake();
}, 250);


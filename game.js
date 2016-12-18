var options = {
	rows: 50,
	columns: 50
}


function Game(options) {
	this.rows = options.rows;
	this.columns = options.columns;
	this.board = [];
	this.cells = [];
	this.food = {
		row: Math.floor(Math.random() * 50),
		column: Math.floor(Math.random() * 50)
	};
}

Game.prototype.generateBoard = function() {
	for (var i = 0; i< 50; i++){
		this.board.push([]);
		for (var j = 0; j < 50; j++){
			this.board[i][j] = null;
		}
	}
};

Game.prototype.createGrid = function() {
	this.board.forEach(function(row, indexRow) {
		row.forEach(function(column, indexColumn) {
			var cell = $('<div>').addClass('cell board');
      cell.attr('data-row', indexRow).attr('data-col', indexColumn);
      this.cells.push(cell);
      $('.container').append(cell);
		}.bind(this))
	}.bind(this))
};

Game.prototype.resetBoard = function() {
	var selector = '.active';
	$(selector).removeClass('active');
};

Game.prototype.printSnake = function(snakeBody) {
	this.resetBoard();
	snakeBody.forEach( function(position, index) {
		var selector = '[data-row=' + position.row + '][data-col=' + position.column + ']';
		$(selector).addClass('active');
	})
};

Game.prototype.generateFood = function(snakeBody) {
	this.food = {
		row: Math.floor(Math.random() * 50),
		column: Math.floor(Math.random() * 50)
	}
	if (!snakeBody.some(function (position) {
		return (position.row === this.food.row && position.column === this.food.column)
	}.bind(this))) {
		var selector = '[data-row=' + this.food.row + '][data-col=' + this.food.column + ']';
		$(selector).addClass('food');
	} else {
		this.generateFood(snakeBody);
	}
};

Game.prototype.controls = function(){
	$('body').on('keydown', function(e) {
	  switch (e.keyCode) {
	    case 38: // arrow up
	      snake.goUp();
	      break;
	    case 40: // arrow down
	      snake.goDown();
	      break;
	    case 37: // arrow left
	      snake.goLeft();
	      break;
	    case 39: // arrow right
	      snake.goRight();
	      break;
	    case 80: // p
	    	clearInterval(intervalSnake);
	    	break;
	    default:
	      break;
	  }
	});
}

var snake = new Snake();
var game = new Game(options);
game.generateBoard();
game.createGrid();
game.controls();
game.printSnake(snake.body);
var intervalSnake = setInterval( function(){ 
	if ($(".food").length <= 0) {
		game.generateFood(snake.body);
	}
	snake.moveForward(game.food);
	game.printSnake(snake.body);
}, 100);



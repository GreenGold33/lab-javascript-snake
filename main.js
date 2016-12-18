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

function createGrid() {
	board.forEach(function(row, indexRow) {
		row.forEach(function(column, indexColumn) {
			var cell = $('<div>').addClass('cell board');
      cell.attr('data-row', indexRow).attr('data-col', indexColumn);
      cells.push(cell);
      $('.container').append(cell);
		})
	})
};

function resetBoard(){
	var selector = '.active';
	$(selector).removeClass('active')
}

function printSnake(snakeBody){
	resetBoard();
	snakeBody.forEach( function(position, index) {
		var selector = '[data-row=' + position.row + '][data-col=' + position.column + ']';
		$(selector).addClass('active');
	})

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

$('body').on('keypress', function(e) {
  switch (e.keyCode) {
    case 119: // w
      snake.goUp();
      break;
    case 115: // s
      snake.goDown();
      break;
    case 97: // a
      snake.goLeft();
      break;
    case 100: // d
      snake.goRight();
      break;
    case 102: // f
    	clearInterval(intervalSnake);
    	break;
    default:
      break;
  }
});

var snake = new Snake();
generateBoard();
createGrid();
printSnake(snake.body);
var intervalSnake = setInterval( function(){ 
	if ($(".food").length <= 0) {
		generateFood(snake.body);
	}
	snake.moveForward();
	printSnake(snake.body);
}, 100);


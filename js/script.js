$(document).ready(function() {

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height; 
	var cellWidth = 15; 
	var direction = "right";
	var food; 
	var score = 0; 
	var speed = 130; 
	var snake; 
	var cellColor = "green";

	init(); 



	function init () {
		snake = new Snake(); 
		food = new Food(); 
		direction = "right";
		updateScore();

		if ( typeof gameLoop != "undefined") {
			clearInterval(gameLoop); 
		} 

		gameLoop = setInterval(paint, speed);
	}

	function Snake() {
		var len = 5; 
		var snake = new Array();

		for (var i = len-1; i >= 0; i--) {
			snake.push({x: i, y: 0});
		}

		return snake; 
	}

	function Food() {
		var food = {
			x:Math.round(Math.random() * (canvasWidth- cellWidth)/cellWidth), 
			y:Math.round(Math.random() * (canvasHeight- cellWidth)/cellWidth)
		}
		return food;
	}

	function paint () {

		//Paint the canvas
		context.fillStyle = "black";
		context.fillRect(0, 0, canvasWidth, canvasHeight);
		context.strokeStyle = "white";
		context.strokeRect(0, 0, canvasWidth, canvasHeight); 

		var newSnakeHead = new SnakeHead(direction, snake[0]); 

		// Check for collision and out of bound
		if (isOutOfBound(newSnakeHead) || isSelfCollision(newSnakeHead)) {
			
			 $("#final-score").html(score);
			 $("#overlay").fadeIn(300);
			return; 
		}

		showSnake(snake); 
		showFood(food);

		// Check to see if eaing the food
		snake.unshift(newSnakeHead); // Move the snake to the new position
		if (newSnakeHead.x == food.x &&  newSnakeHead.y == food.y) {
			food = new Food();
			score++;
			updateScore(score); 
		} else {
			snake.pop(); // pop one cell off the tail 
		}
	}

	function showSnake(s) {

		var len = s.length; 

		for (var i = 0; i < len; i++) {
			showCell(s[i]); 
		}
	}

	function showFood(food) {
		showCell(food); 
	}

	function showCell (cell) {
		context.fillStyle = "green"; 
		context.fillRect(cell.x * cellWidth, 
						 cell.y * cellWidth, 
						 cellWidth, 
						 cellWidth);
		context.strokeStyle = "white"; 
		context.strokeRect(cell.x * cellWidth, 
						 cell.y * cellWidth, 
						 cellWidth, 
						 cellWidth);
	}

	function SnakeHead (direction, oldSnakeHead) {

		var newSnakeHead = {};

		// Update Snake location update
		if (direction == "right") {
			newSnakeHead.x = oldSnakeHead.x + 1;
			newSnakeHead.y = oldSnakeHead.y;
		} else if (direction == "left") {
			newSnakeHead.x = oldSnakeHead.x - 1;			
			newSnakeHead.y = oldSnakeHead.y;
		} else if (direction == "up") {
			newSnakeHead.y = oldSnakeHead.y - 1;			
			newSnakeHead.x = oldSnakeHead.x;			
		} else if (direction == "down") {
			newSnakeHead.y = oldSnakeHead.y + 1;			
			newSnakeHead.x = oldSnakeHead.x;			
		}

		return newSnakeHead; 
	}

	function isOutOfBound (nextSnakeHeadPos) {
		var x = nextSnakeHeadPos.x; 
		var y = nextSnakeHeadPos.y;
		if ((x <= -1) || 
			(x >= canvasWidth/cellWidth) || 
			(y <= -1) || 
			(y >= canvasHeight/cellWidth)) {
			return true; 
		} else {
			return false;
		}
	}

	function isSelfCollision(snake, nextSnakeHeadPos) {



		for (var i=0; i<=snake.lenght; i++) {
			if ((snake[i].x == nextSnakeHeadPos.x) &&
				(snake[i].y == nextSnakeHeadPos.y)) {
				return true; 
			}
		}

		return false; 
	}

	function updateScore() {

		var highScore = localStorage.getItem("highScore"); 

		if (highScore == null) {
			highScore = 0;
		}

		if (score > highScore) {
			highScore = score; 
			localStorage.setItem("highScore", highScore);
		}

		$("#score").html("Your score: " + score);
		$("#high-score").html("High score: " + highScore);

	}

	$(document).keydown(function(e) {

		key = e.which; 

		switch (Number(key)) {
			case 37: 
				if (direction != "right")
					direction = "left";
				break; 
			case 38: 
				if (direction != "down")
					direction = "up";
				break;
			case 39: 
				if (direction != "left")
					direction = "right";
				break;
			case 40: 
				if (direction != "up")
					direction = "down";
				break;
			default:
			;
		}
	});
}); 

function resetScore() {
	localStorage.highScore = 0; 
	document.getElementById("high-score").innerHTML = "High score: 0";
}
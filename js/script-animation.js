

var canvas;
var context; 

function init() {
	canvas = document.getElementById("canvas-animation");
	context = canvas.getContext("2d");
	draw(); 
}

function draw () {

	var x = 0; 
	var y = 0; 

	setInterval(function () {

 		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height); 

		context.fillStyle="white"; 
		context.beginPath();
		context.arc(x, 120, 18, 0, Math.PI*2);
		context.fill();
 
		context.fillStyle="red"; 
		context.beginPath();
		context.arc(100, y, 25, 0, Math.PI*2);
		context.fill();
 
		context.fillStyle="green"; 
		context.beginPath();
		context.arc(x, y, 30, 0, Math.PI*2);
		context.fill();
 
 		x++;
		y++;

	}, 80);
}
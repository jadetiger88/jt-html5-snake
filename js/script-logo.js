var canvas; 
var context; 


function init() {

	canvas = document.getElementById("canvas-logo");
	context = canvas.getContext("2d"); 
	draw();
}

function draw() {

	//red square
	context.fillStyle = "#ff0000";
	context.fillRect(30,30,50,50);
	context.strokeStyle = "#000000";
	context.lineWidth = "3";
	context.strokeRect(30,30,50,50);

	//Black Square
	context.fillStyle = "green";
	context.fillRect(45,45,50,50);

	//Draw text
 	context.font = "30pt Arial";
	var gradient = context.createLinearGradient(0,0,canvas.width, 0);
	gradient.addColorStop("0", "green");
	gradient.addColorStop("1", "black");
	context.fillStyle = gradient;
	context.fillText("Jade Tiger", 100, 80);

	// Draw Line
	context.strokeStyle = "black";
	context.fillStyle = gradient;
	context.lineWidth = 2; 

	context.beginPath();
	context.moveTo(100, 95); 
	context.lineTo(300, 95);
	context.stroke(); 
	context.closePath();


}
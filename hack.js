var path = new Path.Rectangle(new Point(50, 50), new Size(100, 50));
path.style = {
	fillColor: 'white',
	strokeColor: 'black'
};

// Create a copy of the path and set its stroke color to red:
var copy = path.clone();
copy.strokeColor = 'red';

function onFrame(event) {
	// Each frame, rotate the copy by 1 degree:
	copy.rotate(1);
}
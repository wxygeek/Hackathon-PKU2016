var canvasHeight = paper.view.viewSize.height;
var canvasWidth = paper.view.viewSize.width;
// var midPoint = new Point(canvasHeight, canvasWidth);
var midPoint = new Point(500, 500);


var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;

myCircle.removeSegment(2);
myCircle.add(new Point(200, 20));
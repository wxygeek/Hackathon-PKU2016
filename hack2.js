var canvasHeight = paper.view.viewSize.height;
var canvasWidth = paper.view.viewSize.width;
// var midPoint = new Point(canvasHeight, canvasWidth);
var midPoint = new Point(500, 500);


var myCircle = new Path.Circle(new Point(100, 70), 50);
myCircle.strokeColor = 'black';
myCircle.selected = true;


var touchGlow = null;

var currentMousePosition = null;

function onMouseDown(event) {
  console.log('mouse down');
  if (touchGlow) {
    touchGlow.remove();
  }
  touchGlow = new Raster('red');
  touchGlow.position = event.point;
}

function onMouseDrag(event) {
  console.log('mouse drag');
  touchGlow.position = event.point;
}

function onMouseUp(event) {
  console.log('mouse up');
  touchGlow.remove();
}

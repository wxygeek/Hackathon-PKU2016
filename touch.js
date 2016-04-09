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
var touchGlow = null;

var feedbackIcons = null;

function onMouseDown(event) {
  console.log('mouse down');
  if (touchGlow) {
    touchGlow.remove();
  }
  touchGlow = new Raster(window.user.color);
  touchGlow.position = event.point;
}

function onMouseDrag(event) {
  console.log('mouse drag');
  touchGlow.position = event.point;
}

function onMouseUp(event) {
  console.log('mouse up');
  touchGlow.remove();

  feedbackIcons = new Raster('good');
  feedbackIcons.position = window.user.feedbackPosition;

  setTimeout(function() {
    if(feedbackIcons) {
      feedbackIcons.remove();
    }
  }, 300);
}
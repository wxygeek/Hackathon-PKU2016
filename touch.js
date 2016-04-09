var touchGlow = null;

var feedbackIcons = null;

function onMouseDown(event) {
  console.log('mouse down');
  if (touchGlow) {
    touchGlow.remove();
  }
  touchGlow = new Raster(window.user.color);
  touchGlow.position = event.point;

  if(!feedbackIcons) {

    var deltaTime = Math.abs((new Date()).getTime() - window.currentRhythmTime * 1000 - window.startTime.getTime());

    var status = 'perfect';
    if(deltaTime < 200) {
      status = 'perfect';
    } else if(deltaTime < 300) {
      status = 'good';
    } else if(deltaTime < 700) {
      status = 'bad';
    } else {
      status = 'miss';
    }

    feedbackIcons = new Raster(status);
    feedbackIcons.position = window.user.feedbackPosition;
    setTimeout(function() {
      feedbackIcons.remove();
      feedbackIcons = null;
    }, 300);
  }
}

function onMouseDrag(event) {
  console.log('mouse drag');
  touchGlow.position = event.point;
}

function onMouseUp(event) {
  console.log('mouse up');
  touchGlow.remove();
}
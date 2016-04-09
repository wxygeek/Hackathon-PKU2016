var touchGlow = null;

var feedbackIcons = null;

var isGameStart = false;

function startPlaying() {
    socket.emit("startPlay", {status: 'OK'});
    var timeout = (parseInt((new Date()).getTime() / 3000) + 1) * 3000 - (new Date()).getTime();
    setTimeout(function() {
      var audio = document.getElementById("music");
      audio.play();
    }, timeout);
}

function onMouseDown(event) {

  if(window.isFullScreen && !isGameStart) {
    isGameStart = true;
    startPlaying();
    window.startPlay();
  }

  // console.log('mouse down');
  if (touchGlow) {
    touchGlow.remove();
  }
  touchGlow = new Raster(window.user.color);
  touchGlow.position = event.point;

  if(!feedbackIcons) {

    var deltaTime = Math.abs((new Date()).getTime() - window.currentRhythmTime * 1000 - window.startTime.getTime());

    var status = 'perfect';
    if(deltaTime < 100) {
      status = 'perfect';
      window.scoreToAdd += 100;
    } else if(deltaTime < 200) {
      status = 'good';
      window.scoreToAdd += 50;
    } else if(deltaTime < 300) {
      status = 'bad';
      window.scoreToAdd += 30;
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
  // console.log('mouse drag');
  touchGlow.position = event.point;
}

function onMouseUp(event) {
  // console.log('mouse up');
  touchGlow.remove();
}
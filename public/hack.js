function init() {
 timeout = (parseInt((new Date()).getTime() / 3000) + 1) * 3000 - (new Date()).getTime();
 setTimeout(function() {
  //  var audio = document.getElementById("music");
  //  audio.play();
   window.startTime = new Date();
   window.Points.push(new Point());
   setTimeout(function () {
     window.Points.push(new Point());
   }, 2000);
   setTimeout(function () {
     window.Points.push(new Point());
   }, 4000);
 }, timeout);
}

window.Points = [];
window.startTime = null;

// init();
window.startPlay = init;

var aheadTime = 1088;

function inTime(time) {
  //提前触发时间
  var deltaTime = Math.abs((new Date()).getTime() - (window.startTime.getTime() + time * 1000 - aheadTime));
  return (deltaTime < 50);
}

function Point() {
  var pointRadius = 15;
  var ballRadius = 80;
  var speed = 800;

  speed = window.baseLength * speed / 256;

  var point = new Path.Circle(relativePoint(0, 0), pointRadius);
  point.strokeColor = 'white';
  point.style = {
    strokeColor : 'cyan',
    fillColor : 'cyan',
    shadowBlur : 80,
    shadowColor : 'cyan',
    spread: 200
  };

  this.point = point;

  var startOffset = 0;
  var offset = 0;
  var frames = 0;
  var totalFrames = 0;

  this.getFrames = function () {
    return frames;
  };
  // 0 - time_1 汇聚 time_1 - time_2 爆炸效果 time_2 - time_3 效果持续时间
  //每秒60帧

  var time_1 = 60;
  var time_2 = 63;
  var time_3 = 65;

  var inAnimate = false;
  var light = new Raster('light');
  light.scale(5);
  light.visible = false;

  //提示用小球
  var ball = new Path.Circle(relativePoint(0, 0), ballRadius);
  ball.strokeColor = 'cyan';
  ball.visible = false;
  ball.strokeWidth = 3;
  ball.bringToFront();

  // var time = new Date();

  point.onFrame = function (event) {
    totalFrames++;

    if(window.scoreToAdd && totalFrames % 4 === 0) {
      window.score += scoreToAdd < 10 ? scoreToAdd : parseInt(scoreToAdd / 4);
      scoreToAdd -= scoreToAdd < 10 ? scoreToAdd : parseInt(scoreToAdd / 4);
      window.scoreIcon.content = window.user.username + "  " + window.score;
    }

    // if(frames === 0) {
    //   time = new Date();
    // } else if (frames === 65) {
    //   console.log((new Date()) - time);
    // }

    frames = inAnimate ? (frames <= time_3 ? frames + 1 : 0) : 0;

    //随轨道移动
    if (offset < entryPath.length - startOffset) {
      point.position = entryPath.getPointAt(offset);
      offset += event.delta * speed;
    } else {
      offset = 0;
    }

    //删除未触发节奏点
    while((new Date()).getTime() - (window.startTime.getTime() + window.rhythm[0] * 1000 - aheadTime) > 200) {
      console.log('remove rhythm.');
      window.rhythm.shift();
    }

    //启动动画
    if (!inAnimate && inTime(window.rhythm[0])) {
      console.log('begin new animation');

      //检查是否进入自己的屏幕
      // var hitPosition = entryPath.getPointAt((offset + speed) % entryPath.length);
      // if(window.user.minx < hitPosition.x && hitPosition.x < window.user.maxx) {
      //   window.currentRhythmTime = window.rhythm.shift();
      // } else {
      //   window.rhythm.shift();
      // }

      window.rhythm.shift();

      inAnimate = true;
    }

    //动画显示
    if(inAnimate) {
      if(frames <= time_1) {

        ball.position = point.position;

        if(ball.bounds.height > 10) {
          ball.scale(0.97);
        }

        ball.visible = true;

        light.visible = false;

      } else if(time_1 < frames && frames <= time_2) {

        light.visible = true;
        light.position = point.position;

        ball.visible = false;

      } else if(time_2 < frames && frames <= time_3) {

        light.visible = false;

        ball.visible = false;

      } else if(time_3 < frames) {

        inAnimate = false;

        ball = new Path.Circle(relativePoint(0, 0), ballRadius);
        ball.strokeColor = 'cyan';
        ball.visible = false;
        ball.strokeWidth = 3;
        ball.bringToFront();

      }
    }

  };
}

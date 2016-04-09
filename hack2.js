function init() {
 setBackgroundColor('black');
 timeout = (parseInt((new Date()).getTime() / 3000) + 1) * 3000 - (new Date()).getTime();
 setTimeout(function() {
   var audio = document.getElementById("music");
   audio.play();
   startTime = new Date();
   Points.push(initPoint());
 }, timeout);
}

var Points = [];
var startTime = null;

init();

function inTime(time) {
  return (Math.abs((new Date()).getTime() - startTime.getTime() - time * 1000) < 10);
}

function initPoint() {
  var pointRadius = 20;
  var point = new Path.Circle(relativePoint(0, 0), pointRadius);
  point.strokeColor = 'white';
  point.style = {
    strokeColor : 'cyan',
    fillColor : 'cyan',
    shadowBlur : 80,
    shadowColor : 'cyan',
    spread: 200
  };

  var startOffset = 0;
  var offset = 0;
  var frames = 0;

  // 0 - time_1 小球汇聚 time_1 - time_2 爆炸效果 time_2 - time_3 缩小效果
  //每秒60帧

  var time_1 = 20;
  var time_2 = 40;
  var time_3 = 45;

  var inAnimate = false;
  var deltaLen = 0;
  var light = new Raster('blue');
  light.visible = false;
  point.onFrame = function (event) {
    frames = frames < time_3 ? frames + 1 : 0;

    //随轨道移动
    if (offset < entryPath.length - startOffset) {
      point.position = entryPath.getPointAt(offset);
      offset += event.delta * 200; // speed - 150px/second
    } else {
      offset = 0;
    }

    //启动动画
    if (!inAnimate && inTime(window.rhythm[0])) {
      console.log('begin new animation');
      window.rhythm.shift();
      inAnimate = true;
      point.balls.forEach(resetBall);
    }

    //动画显示
    if(inAnimate) {
      if(time_1 <= frames && frames <= time_2) {
        light.visible = true;
        light.position = point.position;
        // point.bounds.height += 20;
        // point.bounds.width += 20;
        // deltaLen += 20;
      } else if(time_2 < frames && frames < time_3) {
        light.visible = false;
        // point.bounds.height -= deltaLen / (time_3 - time_2);
        // point.bounds.width -= deltaLen / (time_3 - time_2);
      } else if(frames === time_3) {
        // deltaLen = 0;
        // point.bounds.height = 20;
        // point.bounds.width = 20;
        inAnimate = false;
      }
    }

  };

  point.balls = [];

  function ballOnFrameFun(event) {
    if(time_1 <= frames && frames < time_3) {
      this.position = point.position;
      return;
    } else if(frames === time_3) {
      point.balls.forEach(function (ball) {
        ball.visible = false;
      });
      return;
    }

    this.position = point.position + this.vector * ((30 - frames) / 30);

    if(this.bounds.width < 4) {
      this.bounds.height ++;
      this.bounds.width ++;
    }
  }

  function resetBall(ball) {
    ball.visible = true;
    ball.position = point.position + ball.vector;
    ball.bounds.height = 1;
    ball.bounds.width = 1;
    ball.fillColor = point.fillColor;
  }

  //init: create balls
  for(var i = 0; i < 50; i++) {
    var vector = new Point();
    vector.length = 20 + 100 * Math.random();
    vector.angle = 360 * Math.random();
    var ball = new Path.Circle(point.position + vector, 1);
    ball.vector = vector;
    ball.fillColor = point.fillColor;
    ball.onFrame = ballOnFrameFun.bind(ball);
    //初始不显示
    ball.visible = false;
    point.balls.push(ball);

  }

  return point;
}

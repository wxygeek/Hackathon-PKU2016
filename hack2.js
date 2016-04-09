function init() {
 setBackgroundColor('black');
 timeout = (parseInt((new Date()).getTime() / 3000) + 1) * 3000 - (new Date()).getTime();
 setTimeout(function() {
   Points.push(initPoint());
  //  setInterval(function () {
  //    Points.push(initPoint());
  //  }, 2000);
 }, timeout);
}

var Points = [];
var smallBalls = [];

init();

function initPoint() {
  var pointRadius = 20;
  var point = new Path.Circle(relativePoint(0, 0), pointRadius);
  point.strokeColor = 'white';
  point.style = {
    strokeColor : 'cyan',
    fillColor : 'cyan',
    shadowBlur : 80,
    shadowColor : 'cyan',
  };

  var startOffset = 0;
  var offset = 0;
  var frames = 0;

  // 0 - 29 小球汇聚  30 - 33 爆炸效果 34 - 100 缩小效果

  var time_1 = 30;
  var time_2 = 33;
  var time_3 = 100;

  var deltaLen = 0;
  point.onFrame = function (event) {
    frames = frames < time_3 ? frames + 1 : 0;

    if (offset < entryPath.length - startOffset) {
      point.position = entryPath.getPointAt(offset);
      offset += event.delta * 200; // speed - 150px/second
    } else {
      offset = 0;
    }

    if(time_1 <= frames && frames <= time_2) {
      point.bounds.height += 20;
      point.bounds.width += 20;
      deltaLen += 20;
    } else if(time_2 < frames && frames < time_3) {
       point.bounds.height -= deltaLen / (time_3 - time_2);
       point.bounds.width -= deltaLen / (time_3 - time_2);
    } else if(frames === time_3) {
      deltaLen = 0;
      point.bounds.height = 20;
      point.bounds.width = 20;
    }
  };

  point.balls = [];

  function ballOnFrameFun(event) {
    if(time_1 <= frames && frames < time_3) {
      this.position = point.position;
      return;
    } else if(frames === time_3) {
      resetBall(this);
      return;
    }

    this.position = point.position + this.vector * ((30 - frames) / 30);

    if(this.bounds.width < 4) {
      this.bounds.height ++;
      this.bounds.width ++;
    }
  }

  function resetBall(ball) {
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
    point.balls.push(ball);
  }

  return point;
}

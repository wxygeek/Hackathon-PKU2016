function init() {
 setBackgroundColor('black');
}

var Points = [];
var smallBalls = [];

init();
Points.push(initPoint());

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
  var dis = new Point(0, 0); // 每帧的相对位移
  point.onFrame = function (event) {
    if (offset < entryPath.length - startOffset) {
      dis = entryPath.getPointAt(offset) - point.position;
      point.position = entryPath.getPointAt(offset);
      offset += event.delta * 100; // speed - 150px/second
    } else {
      offset=0;
    }
  };

  point.balls = [];

  function ballOnFrameFun(event) {
    if((this.position - point.position).length < 0.5 * pointRadius) {
      resetBall(this);
      return;
    }
    this.position += (- this.vector / 30);
    this.position += dis;
    if(this.bounds.width < 5) {
      this.bounds.height ++;
      this.bounds.width ++;
    }
  }

  function resetBall(ball) {
    ball.vector.length = 20 + 100 * Math.random();
    ball.vector.angle = 360 * Math.random();
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

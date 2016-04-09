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
  point.frames = 0;

  var startOffset = 0;
  var offset = 0;
  var frames = 0;
  point.onFrame = function (event) {
    if (offset < entryPath.length - startOffset) {
      point.position = entryPath.getPointAt(offset);
      offset += event.delta * 300; // speed - 150px/second
    } else {
      offset = 0;
    }
    frames = frames < 29 ? frames + 1 : 0;
  };

  point.balls = [];

  function ballOnFrameFun(event) {
    if(point.frames > 29) {
      resetBall(this);
      return;
    }
    // console.log(point.frames);
    // console.log(this.vector);

    this.position = point.position + this.vector;
    // this.position = point.position + ((30 - frames) / 30) * this.vector;
    // this.position.x = point.position.x + ((30 - frames) / 30) * this.vector.x;
    // this.position.y = point.position.y + ((30 - frames) / 30) * this.vector.y;

    console.log(this.position);
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

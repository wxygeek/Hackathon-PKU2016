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



// function initBalls(ballColor) {
//   var vector;
//   for(var i = 0; i < ballsCount; i++) {
//     vector = new Point(50, 50);
//     vector.length = 100 + 300 * Math.random();
//     vector.angle = 360 * Math.random();
//     var ball = new Path.Circle(bigBall.position + vector, 1);
//     ball.gap = vector;
//     ball.fillColor = ballColor;
//     balls.push(ball);
//   }
// }

// function resetBalls(ballColor) {
//   console.log("set balls color: " + ballColor);
//   for(var i = 0; i < ballsCount; i++) {
//     balls[i].gap.length = 100 + 300 * Math.random();
//     balls[i].gap.angle = 360 * Math.random();
//     balls[i].position = bigBall.position  + balls[i].gap;
//     balls[i].bounds.height = 1;
//     balls[i].bounds.width = 1;
//     balls[i].fillColor = ballColor;
//   }
// }

// function bigBallOnFrame() {
//   bigBall.bounds.height += 250;
//   bigBall.bounds.width += 250;
//   bigBall.position = midPoint;
// }


// function init(backgroundColor, ballColor) {
//   cases = 1;
//   frameCount = 0;

//   initBigBall(ballColor);
//   initBalls(ballColor);
//   setBackgroundColor(backgroundColor);
// }

// function reset(backgroundColor, ballColor) {
//   console.log('reset fun.');
//   cases ++;
//   frameCount = 0;

//   resetBigBall(ballColor);
//   resetBalls(ballColor);
//   setBackgroundColor(backgroundColor);
// }

// init('white' ,'black');

// function onFrame(event) {
//   frameCount++;

//   ballsOnFrame();

//   if(29 < frameCount && frameCount < 42) {
//     bigBallOnFrame();
//   } else if(frameCount == 42) {
//     if(cases % 4 === 1) {
//       console.log(1);
//       reset('black', 'cyan');
//     } else if(cases % 4 === 2) {
//       console.log(2);
//       reset('cyan', 'blue');
//     } else if(cases % 4 === 3) {
//       console.log(3);
//       reset('blue', 'yellow');
//     } else if(cases % 4 === 0) {
//       console.log(0);
//       reset('yellow', 'black');
//     }
//   }
// }
var canvasHeight = paper.view.viewSize.height;
var canvasWidth = paper.view.viewSize.width;
// var midPoint = new Point(canvasHeight, canvasWidth);
var midPoint = new Point(500, 500);

// function onResize(event) {
//   var canvasHeight = paper.view.viewSize.height;
//   var canvasWidth = paper.view.viewSize.width;
//   midPoint = new Point(canvasHeight, canvasWidth);
// }

var bigBall;
var balls = [];
var frameCount;
var cases;
var ballsCount = 300;

var backgroundRect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    strokeColor: 'white',
    selected: true
  });
backgroundRect.sendToBack();

function setBackgroundColor(backgroundColor) {
  console.log("set background color: " + backgroundColor);
  backgroundRect.fillColor = backgroundColor;
}

function initBigBall(ballColor) {
  bigBall  = new Path.Circle(midPoint, 20);
  bigBall.style = {
    strokeColor: ballColor,
    fillColor: ballColor,
    shadowBlur: 80,
    shadowColor: ballColor
  };
}

function resetBigBall(ballColor) {
  console.log("set bigBall color: " + ballColor);
  bigBall.style = {
    strokeColor: ballColor,
    fillColor: ballColor,
    shadowBlur: 80,
    shadowColor: ballColor
  };
  bigBall.bounds.height = 40;
  bigBall.bounds.width = 40;
  bigBall.position = midPoint;
}

function initBalls(ballColor) {
  var vector;
  for(var i = 0; i < ballsCount; i++) {
    vector = new Point(50, 50);
    vector.length = 100 + 300 * Math.random();
    vector.angle = 360 * Math.random();
    var ball = new Path.Circle(bigBall.position + vector, 1);
    ball.gap = vector;
    ball.fillColor = ballColor;
    balls.push(ball);
  }
}

function resetBalls(ballColor) {
  console.log("set balls color: " + ballColor);
  for(var i = 0; i < ballsCount; i++) {
    balls[i].gap.length = 100 + 300 * Math.random();
    balls[i].gap.angle = 360 * Math.random();
    balls[i].position = bigBall.position  + balls[i].gap;
    balls[i].bounds.height = 1;
    balls[i].bounds.width = 1;
    balls[i].fillColor = ballColor;
  }
}

function bigBallOnFrame() {
  bigBall.bounds.height += 250;
  bigBall.bounds.width += 250;
  bigBall.position = midPoint;
}

function ballsOnFrame() {
  balls.forEach(function (item) {
    item.position += (- item.gap / 30);
    if(item.bounds.width < 4) {
      item.bounds.height ++;
      item.bounds.width ++;
    }
  });
}

function init(backgroundColor, ballColor) {
  cases = 1;
  frameCount = 0;

  initBigBall(ballColor);
  initBalls(ballColor);
  setBackgroundColor(backgroundColor);
}

function reset(backgroundColor, ballColor) {
  console.log('reset fun.');
  cases ++;
  frameCount = 0;

  resetBigBall(ballColor);
  resetBalls(ballColor);
  setBackgroundColor(backgroundColor);
}

init('white' ,'black');

function onFrame(event) {
  frameCount++;

  ballsOnFrame();

  if(29 < frameCount && frameCount < 42) {
    bigBallOnFrame();
  } else if(frameCount == 42) {
    if(cases % 4 === 1) {
      console.log(1);
      reset('black', 'cyan');
    } else if(cases % 4 === 2) {
      console.log(2);
      reset('cyan', 'blue');
    } else if(cases % 4 === 3) {
      console.log(3);
      reset('blue', 'yellow');
    } else if(cases % 4 === 0) {
      console.log(0);
      reset('yellow', 'black');
    }
  }
}
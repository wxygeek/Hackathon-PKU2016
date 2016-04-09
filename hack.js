function init() {
 setBackgroundColor('black');
 timeout = (parseInt((new Date()).getTime() / 3000) + 1) * 3000 - (new Date()).getTime();
 setTimeout(function() {
   var audio = document.getElementById("music");
   audio.play();
   window.startTime = new Date();
   Points.push(new Point());
   setTimeout(function () {
     Points.push(new Point());
   }, 3000);
   setTimeout(function () {
     Points.push(new Point());
   }, 6000);
 }, timeout);
}

var Points = [];
window.startTime = null;

init();

function inTime(time) {
  //提前触发时间
  var deltaTime = Math.abs((new Date()).getTime() - (window.startTime.getTime() + time * 1000 - 500));
  return (deltaTime < 25);
}

function Point() {
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

  var time_1 = 30;
  var time_2 = 50;
  var time_3 = 53;

  var inAnimate = false;
  var deltaLen = 0;
  var light = new Raster('light');
  light.visible = false;

  point.onFrame = function (event) {
    frames = frames < time_3 ? frames + 1 : 0;

    //随轨道移动
    if (offset < entryPath.length - startOffset) {
      point.position = entryPath.getPointAt(offset);
      offset += event.delta * 800; // speed - 150px/second
    } else {
      offset = 0;
    }

    //删除未触发节奏点
    while((new Date()).getTime() - (window.startTime.getTime() + window.rhythm[0] * 1000 - 100) > 0) {
      console.log('remove rhythm.');
      window.rhythm.shift();
    }

    //启动动画
    if (!inAnimate && inTime(window.rhythm[0])) {
      console.log('begin new animation');

      //检查是否进入自己的屏幕
      if(window.user.minx < point.position.x && point.position.x < window.user.maxx) {
        window.currentRhythmTime = window.rhythm.shift();
      } else {
        window.rhythm.shift();
      }

      // console.log(window.rhythm.length);
      inAnimate = true;
      // point.balls.forEach(resetBall);
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
        // inAnimate = false;
        // point.bounds.height -= deltaLen / (time_3 - time_2);
        // point.bounds.width -= deltaLen / (time_3 - time_2);
      } else if(time_3 <= frames) {
        // deltaLen = 0;
        // point.bounds.height = 20;
        // point.bounds.width = 20;
        inAnimate = false;
      }
    }

  };

  // point.balls = [];

  // function ballOnFrameFun(event) {
  //   if(time_1 <= frames && frames < time_3) {
  //     this.position = point.position;
  //     return;
  //   } else if(frames === time_3) {
  //     this.visible = false;
  //     return;
  //   }

  //   this.position = point.position + this.vector * ((30 - frames) / 30);

  //   if(this.bounds.width < 4) {
  //     this.bounds.height ++;
  //     this.bounds.width ++;
  //   }
  // }

  // function resetBall(ball) {
  //   ball.visible = true;
  //   ball.position = point.position + ball.vector;
  //   ball.bounds.height = 1;
  //   ball.bounds.width = 1;
  //   ball.fillColor = point.fillColor;
  // }

  //init: create balls
  // for(var i = 0; i < 50; i++) {
  //   var vector = new Point();
  //   vector.length = 20 + 100 * Math.random();
  //   vector.angle = 360 * Math.random();
  //   var ball = new Path.Circle(point.position + vector, 1);
  //   ball.vector = vector;
  //   ball.fillColor = point.fillColor;
  //   ball.onFrame = ballOnFrameFun.bind(ball);
  //   //初始不显示
  //   ball.visible = false;
  //   point.balls.push(ball);
  // }

}

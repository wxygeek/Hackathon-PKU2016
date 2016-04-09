function init() {
 setBackgroundColor('black');
 timeout = (parseInt((new Date()).getTime() / 3000) + 1) * 3000 - (new Date()).getTime();
 setTimeout(function() {
   var audio = document.getElementById("music");
   audio.play();
   window.startTime = new Date();
   Points.push(new Point());
  //  setTimeout(function () {
  //    Points.push(new Point());
  //  }, 2000);
  //  setTimeout(function () {
  //    Points.push(new Point());
  //  }, 4000);
  //  setTimeout(function () {
  //    Points.push(new Point());
  //  }, 8000);
 }, timeout);
}

var Points = [];
window.startTime = null;

init();

function inTime(time) {
  //提前触发时间
  var deltaTime = Math.abs((new Date()).getTime() - (window.startTime.getTime() + time * 1000 - 500));
  return (deltaTime < 50);
}

function Point() {
  this.pointRadius = 10;
  this.point = new Path.Circle(relativePoint(0, 0), this.pointRadius);
  this.point.strokeColor = 'white';
  this.point.style = {
    strokeColor : 'cyan',
    fillColor : 'cyan',
    shadowBlur : 80,
    shadowColor : 'cyan',
    spread: 200
  };

  this.startOffset = 0;
  this.offset = 0;
  this.frames = 0;

  // 0 - time_1 汇聚 time_1 - time_2 爆炸效果 time_2 - time_3 效果持续时间
  //每秒60帧

  this.time_1 = 60;
  this.time_2 = 65;
  this.time_3 = 90;

  this.inAnimate = false;
  this.light = new Raster('light');
  this.light.visible = false;

  //提示用小球
  this.ball = new Path.Circle(relativePoint(0, 0), 100);
  this.ball.strokeColor = 'cyan';
  this.ball.visible = false;
  this.ball.strokeWidth = 3;
  this.ball.bringToFront();

  var _this = this;

  this.point.onFrame = function (event) {
    _this.frames = _this.inAnimate ? (_this.frames < _this.time_3 ? _this.frames + 1 : 0) : 0;

    //随轨道移动
    if (_this.offset < entryPath.length - _this.startOffset) {
      _this.point.position = entryPath.getPointAt(_this.offset);
      _this.offset += event.delta * 600; // speed - 150px/second
    } else {
      _this.offset = 0;
    }

    //删除未触发节奏点
    while((new Date()).getTime() - (window.startTime.getTime() + window.rhythm[0] * 1000 - 500) > 200) {
      // console.log(new Date(window.startTime.getTime() + window.rhythm[0] * 1000 - 500));
      console.log('remove rhythm.');
      window.rhythm.shift();
    }

    //启动动画
    if (!_this.inAnimate && inTime(window.rhythm[0])) {
      console.log('begin new animation');

      //检查是否进入自己的屏幕
      if(window.user.minx < _this.point.position.x && _this.point.position.x < window.user.maxx) {
        window.currentRhythmTime = window.rhythm.shift();
      } else {
        window.rhythm.shift();
      }

      _this.inAnimate = true;
    }

    //动画显示
    if(_this.inAnimate) {
      if(_this.frames <= _this.time_1) {

        _this.ball.position = _this.point.position;
        _this.ball.bounds.height -= (200 / 50);
        _this.ball.bounds.width -= (200 / 50);
        _this.ball.visible = true;

        _this.light.visible = false;

      } else if(_this.time_1 < _this.frames && _this.frames <= _this.time_2) {

        _this.light.visible = true;
        _this.light.position = _this.point.position;
        _this.ball.visible = false;

      } else if(_this.time_2 < _this.frames && _this.frames <= _this.time_3) {

        _this.light.visible = false;

      } else if(_this.time_3 < _this.frames) {

        _this.inAnimate = false;
        _this.ball.bounds.height = 200;
        _this.ball.bounds.width = 200;

      }
    } else {
      _this.ball.visible = false;
      _this.ball.bounds.height = 200;
      _this.ball.bounds.width = 200;
    }

  };
}

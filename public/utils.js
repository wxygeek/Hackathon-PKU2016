var backgroundRect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    strokeColor: 'black',
    selected: false
  });
backgroundRect.sendToBack();

window.setBackgroundColor =  function (backgroundColor) {
  console.log("set background color: " + backgroundColor);
  backgroundRect.fillColor = backgroundColor;
};

window.setBackgroundColor('black');

window.itemToDraw = new Set();


//获取url参数
window.getParam = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]); return null;
};

window.canvasHeight = paper.view.viewSize.height;
window.canvasWidth = paper.view.viewSize.width;

window.device = window.getParam('device') ? window.getParam('device') : 'mini';
window.isFullScreen = window.getParam('isFullScreen') === 'true';

// window.canvasHeight = 960;
// window.canvasWidth = 768;

window.baseLength = window.isFullScreen ? 150 : window.canvasWidth / 3;
// window.baseLength = window.device === 'air' ? 768 / 3 * 0.8144 : window.canvasWidth / 3;

window.midPoint = new Point(window.canvasWidth / 2, window.canvasHeight / 2 + 100);

window.relativePoint = function (x, y) {
  return (new Point(x * window.baseLength, y * window.baseLength) + window.midPoint);
};

var order = window.getParam('order') ? window.getParam('order') : '2';
switch(window.getParam('order')) {
  case '1':
    window.midPoint = window.relativePoint(3, 0);
    window.user = {
      id: 1,
      username: 'Mary',
      color: 'red',
      feedbackPosition: window.relativePoint(-3, -1.5),
      minx: window.relativePoint(-4.5, 0).x,
      maxx: window.relativePoint(-1.5, 0).x
    };
    break;
  default:
    window.midPoint = window.relativePoint(0, 0);
    window.user = {
      id: 2,
      username: 'Xander',
      color: 'green',
      feedbackPosition: window.relativePoint(0, -1.5),
      minx: window.relativePoint(-1.5, 0).x,
      maxx: window.relativePoint(1.5, 0).x
    };
    break;
  case '3':
    window.midPoint = window.relativePoint(-3, 0);
    window.user = {
      id: 3,
      username: 'Peter',
      color: 'blue',
      feedbackPosition: window.relativePoint(3, -1.5),
      minx: window.relativePoint(1.5, 0).x,
      maxx: window.relativePoint(4.5, 0).x
    };
    break;
}

window.score = 0;
window.scoreToAdd = 0;
window.scoreIcon = new PointText(window.user.feedbackPosition + new Point(-80, - 0.5 * window.baseLength));
window.scoreIcon.content = window.user.username + "  " + window.score;
window.scoreIcon.characterStyle = {
  fontSize:36,
  fillColor: 'white',
  font:"Arial",
  shadowBlur : 80,
  shadowColor : 'cyan',
};

if(window.isFullScreen) {
  window.scoreIcon.visible = false;
  var title = new PointText(window.user.feedbackPosition + new Point(-150, - 0.5 * window.baseLength));
  title.content = 'AVIATE';
  title.characterStyle = {
    fontSize:100,
    fillColor: 'cyan',
    font:"Arial",
    shadowBlur : 80,
  };
}

var devices = {
  macBook: {
    width: 1436,
    height: 782
  },
  ipad: {
    width: 768,
    height: 960
  },
  iphone5s: {
    width: 320,
    height: 460
  },
  mi4c: {
    width: 360,
    height: 564
  }
};
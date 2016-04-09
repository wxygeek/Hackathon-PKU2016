var backgroundRect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width, view.size.height],
    strokeColor: 'white',
    selected: true
  });
backgroundRect.sendToBack();

window.setBackgroundColor =  function (backgroundColor) {
  console.log("set background color: " + backgroundColor);
  backgroundRect.fillColor = backgroundColor;
};

window.itemToDraw = new Set();


//获取url参数
window.getParam = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return unescape(r[2]); return null;
};

window.canvasHeight = paper.view.viewSize.height;
window.canvasWidth = paper.view.viewSize.width;

// window.baseLength = paper.view.viewSize.width / 3;
window.baseLength = 200;

window.midPoint = new Point(window.canvasWidth / 2, window.canvasHeight / 2);

window.relativePoint = function (x, y) {
  return (new Point(x * window.baseLength, y * window.baseLength) + midPoint);
};

var order = window.getParam('order') ? window.getParam('order') : '2';
switch(window.getParam('order')) {
  case '1':
    window.midPoint = window.relativePoint(3, 0);
    window.user = {
      id: 1,
      username: '小王',
      color: 'red',
      feedbackPosition: window.relativePoint(-3, -1.5)
    };
    break;
  default:
    window.midPoint = window.relativePoint(0, 0);
    window.user = {
      id: 2,
      username: '小刘',
      color: 'green',
      feedbackPosition: window.relativePoint(0, -1.5)
    };
    break;
  case '3':
    window.midPoint = window.relativePoint(-3, 0);
    window.user = {
      id: 3,
      username: '小李',
      color: 'blue',
      feedbackPosition: window.relativePoint(3, -1.5)
    };
    break;
}

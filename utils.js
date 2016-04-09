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

window.user = {
  id: 1,
  username: 'ABC',
  color: 'red',
};

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

if(window.getParam('order')) {
  switch(window.getParam('order')) {
    case '1': window.midPoint = new Point(window.relativePoint(3, 0)); break;
    case '3': window.midPoint = new Point(window.relativePoint(-3, 0)); break;
  }
}

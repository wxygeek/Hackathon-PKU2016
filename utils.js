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

window.canvasHeight = paper.view.viewSize.height;
window.canvasWidth = paper.view.viewSize.width;
window.midPoint = new Point(700, 300);

window.baseLength = 150;

window.relativePoint = function (x, y) {
  return (new Point(x * window.baseLength, y * window.baseLength) + midPoint);
};
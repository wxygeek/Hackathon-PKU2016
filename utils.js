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
var blink = new Raster('yellow');
blink.scale(5);
blink.position = relativePoint(0, 0);
blink.visible = false;
blink.frames = 0;

blink.onFrame = function () {
  blink.frames ++;
  if(blink.frames > 30) {
    blink.visible = false;
    blink.frames = 0;
  }
};

window.showBlink = function () {
  blink.visible = true;
};

window.entryPath = new Path();

entryPath.add(relativePoint(1, 1));
entryPath.lineTo(relativePoint(1.5, 1));
entryPath.lineTo(relativePoint(2.5, 1));
entryPath.arcTo(relativePoint(3.5, 0), relativePoint(2.5, -1));
entryPath.lineTo(relativePoint(1.5, -1));
entryPath.lineTo(relativePoint(1, -1));
entryPath.lineTo(relativePoint(-1, 1));
entryPath.lineTo(relativePoint(-1.5, 1));
entryPath.lineTo(relativePoint(-2.5, 1));
entryPath.arcTo(relativePoint(-3.5, 0), relativePoint(-2.5, -1));
entryPath.lineTo(relativePoint(-1.5, -1));
entryPath.lineTo(relativePoint(-1, -1));
entryPath.add(relativePoint(1, 1));

// entryPath.strokeColor = 'white';
entryPath.style = {
  strokeColor : 'white',
  shadowBlur : 80,
  shadowColor : 'white',
};
entryPath.strokeWidth = 10;

//标识点

// set4Point();

function set4Point() {
  var point1 = new Path.Circle(relativePoint(1.5, 1), 10);
  point1.fillColor = 'yellow';
  point1.strokeColor = 'white';
  var point2 = new Path.Circle(relativePoint(1.5, -1), 10);
  point2.fillColor = 'yellow';
  point2.strokeColor = 'white';
  var point3 = new Path.Circle(relativePoint(-1.5, -1), 10);
  point3.fillColor = 'yellow';
  point3.strokeColor = 'white';
  var point4 = new Path.Circle(relativePoint(-1.5, 1), 10);
  point4.fillColor = 'yellow';
  point4.strokeColor = 'white';
}

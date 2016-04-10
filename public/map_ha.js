var blink = new Raster('yellow');
blink.scale(8);
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
  if(window.isFullScreen) {
    blink.visible = true;
  }
};

window.entryPath = new Path();

entryPath.add(relativePoint(0.3, -1.1));
entryPath.lineTo(relativePoint(0.3, 0));
entryPath.lineTo(relativePoint(1, 1));
entryPath.lineTo(relativePoint(3, 1));
entryPath.lineTo(relativePoint(3.5, -2));
entryPath.lineTo(relativePoint(0.6, -2));
entryPath.lineTo(relativePoint(0.3, -1.4));

entryPath.lineTo(relativePoint(-0.3, -1.4));
entryPath.lineTo(relativePoint(-0.6, -2));
entryPath.lineTo(relativePoint(-3.5, -2));
entryPath.lineTo(relativePoint(-3, 1));
entryPath.lineTo(relativePoint(-1, 1));
entryPath.lineTo(relativePoint(-0.3, 0));
entryPath.lineTo(relativePoint(-0.3, -1.1));
entryPath.lineTo(relativePoint(0.3, -1.1));

var point_1 = new Path.Circle(relativePoint(0.3, 1.3), 15);
point_1.fillColor = 'white';
point_1.strokeColor = 'white';

var point_2 = new Path.Circle(relativePoint(-0.3, 1.3), 15);
point_2.fillColor = 'white';
point_2.strokeColor = 'white';

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

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

entryPath.strokeColor = 'white';
entryPath.strokeWidth = 10;

//标识点

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


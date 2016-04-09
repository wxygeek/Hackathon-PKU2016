window.entryPath = new Path();

entryPath.add(relativePoint(0.5, 1));
entryPath.lineTo(relativePoint(1, 1));
entryPath.lineTo(relativePoint(2, 1));
entryPath.arcTo(relativePoint(3, 0), relativePoint(2, -1));
entryPath.lineTo(relativePoint(1, -1));
entryPath.lineTo(relativePoint(0.5, -1));
entryPath.lineTo(relativePoint(-0.5, 1));
entryPath.lineTo(relativePoint(-1, 1));
entryPath.lineTo(relativePoint(-2, 1));
entryPath.arcTo(relativePoint(-3, 0), relativePoint(-2, -1));
entryPath.lineTo(relativePoint(-1, -1));
entryPath.lineTo(relativePoint(-0.5, -1));
entryPath.add(relativePoint(0.5, 1));

entryPath.strokeColor = 'white';
entryPath.strokeWidth = 10;
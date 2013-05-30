var cv = require("opencv");

var minArea = 2000;
var maxArea = 100000;

module.exports = function quad(im) {
  // Convert image to B&W based on color threshold; mostly "red"
  // [B, G, R]
  im.inRange([50, 50, 225], [200, 200, 255]);
  console.log(im);

  var contours = im.findContours();

  for (var i = 0; i < contours.size(); i++) {
    var area = contours.area(i);
    if(area < minArea || area > maxArea) continue;

    var arcLength = contours.arcLength(i, true);
    contours.approxPolyDP(i, 0.01 * arcLength, true);

    if(contours.cornerCount(i) != 4) continue;

    var points = [
      contours.point(i, 0),
      contours.point(i, 1),
      contours.point(i, 2),
      contours.point(i, 3)
    ]

    return points;

    //out.line([points[0].x,points[0].y], [points[2].x, points[2].y], RED);
    //out.line([points[1].x,points[1].y], [points[3].x, points[3].y], RED);
  }

  return null;
};

var arDrone = require('ar-drone');
var client = arDrone.createClient();
var cv = require('opencv');
var quad = require('./quad');
//var fs = require('fs');
//client.config('video:video_channel', 3);

//require('ar-drone-png-stream')(client, { port: 8000 });

var count = 1;

client.takeoff();

client.after(500, function() {
  this.calibrate(0);
});

//var s = new cv.ImageStream();


//s.on('data', function(matrix){
  //console.log(quad(matrix));
//  matrix = quad(matrix);
//  //console.log(matrix);
//  if (matrix) {
//
//    client.forward(0.2);
//    console.log('go forward');
//  }
//  else {
//    count++;
//    if (count === 30) {
//      console.log('hallo');
//      client.stop();
//      count = 1;
//    }
//  }
//});

//client.getPngStream().pipe(s);

//client.after(12000, function() {
//  this.land();
//});

client.after(8000, function() {
  this.on('navdata', function(data) {
    console.log(data.demo.rotation.clockwise);
    var bearing = -90;
    
    var cw = data.demo.rotation.clockwise; 
    if ( Math.abs(cw)  < 88 ) {
      console.log('counter clockwise');
      client.counterClockwise(0.5);
    }
    
    if ( Math.abs(cw)  > 92 ) {
      client.clockwise(0.5);
      console.log('clockwise');
    }

    if (Math.abs(bearing - cw) < 2 ){ 
      client.stop();
      //client.front(0.1);
      client.after(4000, function() {
        //this.land();
      });
    }

  });
});

  

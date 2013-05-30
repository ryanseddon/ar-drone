var arDrone = require('ar-drone');
var client = arDrone.createClient();
var cv = require("opencv");
var quad = require("./quad"); 
var fs = require("fs");
client.config('video:video_channel', 3);
require('ar-drone-png-stream')(client, { port: 8000 });


client.takeoff();

client.after(5000, function(){
  client.up(1);
})
.after(2000, function() {
  this.stop(); 
});


var s = new cv.ImageStream();

//client.takeoff();
//
//client
//  .after(5000, function() {
//    this.stop();
//    this.land();
//  });

s.on('data', function(matrix){
  console.log(quad(matrix));
})

client.getPngStream().pipe(s);

client.after(10000, function() {
  this.land();
});
  

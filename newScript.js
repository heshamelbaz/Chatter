var mongoose = require('mongoose');
var db = require('./config/db.js');
var Room =  require('./models/room.js');
mongoose.connect('mongodb://localhost/yaca');

console.log(Room);
Room.find(function (err, rooms) {
  if (err) return handleError(err);
  console.log(rooms);
  for(var i = 0; i < rooms.length; i++){
    console.log(rooms[i]);
  }
})

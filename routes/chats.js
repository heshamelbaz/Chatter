var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = require('../config/db.js');
mongoose.connect(db.url);


var socket_io = require( 'socket.io');

router.get('/chat', function(req, res){
  sender = req.query.sender;
  receiver = req.query.receiver;
  if(typeof sender === "undefined" || typeof receiver === "undefined"){
    res.render(path.join('pages/chat.ejs'), {error: true});
  }
  else{
    res.render('pages/chat', {sender: sender, receiver: receiver});
  }
  // console.log("sender from request: " + sender);
  // console.log("receiver from request: " + receiver);

});


var listen = function(){
  var io = socket_io();
  var i =1;
  var map = new Object();
  io.on('connection', function(client){
    map[i++]=client.id;
    console.log(i-1 + " " + client.id);
    client.send(map[1]);
    client.on("send", function(sender, receiver,  msg){
      console.log("send function:  " + sender + " "  + receiver + "  " + msg);
      if(!(typeof msg === "undefined" || msg ==="")){
        console.log(map);
        if (io.sockets.connected[map[sender]])
          io.to(map[sender]).emit('send', sender, msg);
        if (io.sockets.connected[map[receiver]])
          io.to(map[receiver]).emit('send', sender, msg);
        // io.emit('send', sender, msg);
      }
    });
    client.on("disconnect", function(){
      console.log('user disconnected');
    });
  });
  return io;
};

var apple = 5;
module.exports.apple = apple;
module.exports.listen = listen;
module.exports.router = router;

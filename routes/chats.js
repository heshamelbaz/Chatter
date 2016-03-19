var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var db = require('../config/db.js');
// mongoose.connect(db.url[app.settings.env]);


var socket_io = require( 'socket.io');

router.get('/', function(req, res){
  room_name = req.query.room;
  sender = req.query.sender;
  receiver = req.query.receiver;
  if(typeof room_name === "undefined"){
    res.render('../views/pages/chat.ejs', {error: true});
  }
  else{
    res.render('../views/pages/chat.ejs', {sender: sender, receiver: receiver, room_name: room_name});
  }
  // console.log("sender from request: " + sender);
  // console.log("receiver from request: " + receiver);

});


module.exports = router;

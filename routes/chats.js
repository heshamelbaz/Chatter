var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var db = require('../config/db.js');
mongoose.connect(db.url);


var socket_io = require( 'socket.io');

router.get('/', function(req, res){
  sender = req.query.sender;
  receiver = req.query.receiver;
  if(typeof sender === "undefined" || typeof receiver === "undefined"){
    res.render('../views/pages/chat.ejs', {error: true});
  }
  else{
    res.render('../views/pages/chat.ejs', {sender: sender, receiver: receiver});
  }
  // console.log("sender from request: " + sender);
  // console.log("receiver from request: " + receiver);

});


module.exports = router;

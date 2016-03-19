var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
  room_name = req.query.room;
  sender = req.query.sender;
  receiver = req.query.receiver;
  if(typeof sender === "undefined" || typeof receiver === "undefined"){
    res.render('../views/pages/chat.ejs', {error: true});
  }

});

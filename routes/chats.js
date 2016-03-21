var express = require('express');
var router = express.Router();

var Room = require('../models/room.js');
var Message = require('../models/message.js');

router.get('/', function(req, res){
  Room.findOne({_id: req.query.id },function(err, room){
	var limit = 5;
	if(err) return handleError(err);
	if(typeof room === "undefined"){
		res.render('layout', { page: 'pages/chat', title:'YACA', isLoggedIn: req.isAuthenticated(), user: req.user, error: true});
	}
	else{
		Message.find({ room: room._id }).sort({'timestamp': -1}).limit(limit).populate('sender').exec(function(err, messages){
			if(err) handleError(err);
			res.render('layout', { page: 'pages/chat', title:'YACA', isLoggedIn: req.isAuthenticated(), user: req.user, room:room, messages: messages, limit: limit }); 		
		});	
	}	
  });
});


module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Room =  require('../models/room.js');

router.get('/', function(req, res){
	Room.find(function (err, rooms) {
	  if (err) return handleError(err);
	  res.render('layout', { page: 'pages/rooms', title: 'YACA', isLoggedIn: req.isAuthenticated(), rooms: rooms, user: req.user});
	});
});


// modifiable to use react
router.post('/', function(req, res){
	var room = new Room({name: req.body.name});
	room.save(function (err, fluffy){
		if(err) return handleError(err);
		Room.find(function (err, rooms) {
		  	if (err) return handleError(err);
			res.render('layout', { page: 'pages/rooms', title: 'YACA', isLoggedIn: req.isAuthenticated(), rooms: rooms, user: req.user});
		});
	});
});

module.exports = router;

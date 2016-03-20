var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../config/db.js');
var Room =  require('../models/room.js');
// temporary static string as we can not reach the variables of the app.js here
mongoose.createConnection('mongodb://localhost/yaca');

router.get('/', function(req, res){
	Room.find(function (err, rooms) {
	  if (err) return handleError(err);
	  res.render('layout', { page: 'pages/rooms', title: 'YACA', isLoggedIn: req.isAuthenticated(), rooms: rooms, user: req.user});
	});
});

router.post('/', function(req, res){
	all_rooms.push({ name: req.body.room_name, id: all_rooms.length + 1 });
	var room = new Room({name: req.body.room_name});
	room.save(function (err, fluffy){
		Room.find(function (err, rooms) {
		  if (err) return handleError(err);
			res.render('layout', { page: 'pages/rooms', title: 'YACA', isLoggedIn: req.isAuthenticated(), rooms: rooms, user: req.user});
		});
	});
});

module.exports = router;

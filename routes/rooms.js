var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('layout', { page: 'pages/rooms', title: 'YACA', isLoggedIn: req.isAuthenticated(), rooms: all_rooms, user: req.user});
});

router.post('/', function(req, res){
	all_rooms.push({ name: req.body.room_name, id: all_rooms.length + 1 });
	res.render('layout', { page: 'pages/rooms', title: 'YACA', isLoggedIn: req.isAuthenticated(), rooms: all_rooms, user: req.user});	
});

module.exports = router;

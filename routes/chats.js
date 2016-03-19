var express = require('express');
var router = express.Router();

var db = require('../config/db.js');

router.get('/', function(req, res){
  var room = { name: req.query.name, id: req.query.id };

  if(typeof room === "undefined"){
    res.render('layout', { page: 'pages/chat', title:'YACA', isLoggedIn: req.isAuthenticated(), user: req.user, error: true});
  }
  else{
    res.render('layout', { page: 'pages/chat', title:'YACA', isLoggedIn: req.isAuthenticated(), user: req.user, room:room }); 
  }
});


module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if(!req.isAuthenticated()){
	  	res.render('layout', { 
			page: 'index', title: 'YACA', isLoggedIn: req.isAuthenticated(), message: req.flash('signupMessage') 
  		});
	} else {
		res.render('layout', {
			page: 'users/profile', title: 'YACA', isLoggedIn: req.isAuthenticated(), user: req.user
		});	
	}
});

module.exports = router;

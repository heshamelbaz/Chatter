var express = require('express');
var router = express.Router();

router.get('/chat', function(req, res){
	res.render('layout', { page: 'users/signup.ejs', title: 'YACA', isLoggedIn: req.isAuthenticated(), message: req.flash('signupMessage') });
});

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/signup', function(req, res){
	res.render('layout', { page: 'users/signup.ejs', title: 'YACA', isLoggedIn: req.isAuthenticated(), message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/users/profile',
	failureRedirect: '/users/signup'
}));

router.get('/login', function(req, res){
	res.render('layout', { page:'users/login.ejs', title: 'YACA', isLoggedIn: req.isAuthenticated(), message: req.flash('loginMessage') } );
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/users/profile',
	failureRedirect: '/users/login',
	failureFlash: true
}));

router.get('/profile', isLoggedIn, function(req, res){
	res.render('layout', { page: 'users/profile.ejs', title: 'YACA', isLoggedIn: req.isAuthenticated(), user: req.user} );
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
						successRedirect: '/users/profile',
						failureRedirect: '/'
					}
));

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}

module.exports = router;

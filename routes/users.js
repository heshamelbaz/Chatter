var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/signup', function(req, res){
	res.render('users/signup.ejs');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: 'users/signup'
}));

module.exports = router;

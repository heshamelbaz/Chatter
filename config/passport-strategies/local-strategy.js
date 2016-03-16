var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function(passport){	
	// Passport Local Signup
	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done){
			process.nextTick(function(){
				User.findOne({ 'local.email': email }, function(err, user){
					if(err)
						return done(err);

					if(user){
						return done(null, false, req.flash('signupMessage', 'The email is already taken.'));
					} else {
						var newUser = new User();
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);

						newUser.save(function(err){
							if(err) throw err;
							return done(null, newUser);
						});
					}
				});
			});
		}));

	// Passport Local Login
	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		User.findOne({ 'local.email': email }, function(err, user){
			if(err) return done(err);
			if(!user) return done(null, false, req.flash('loginMessage', 'This email is not registered'));

			if(!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Wrong password !'));
			return done(null,user);
		});
	}
	))
};

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},
	email: {
		type: String,
		required: [true, 'Email is required']
	},
	photo: {
		type: String,
		default: '/images/users/default.jpg'
	},
	
	password: String,
	facebook: {
		id: String,
		token: String	
	},

	login: {
		type: String,
		enum: ['Local', 'Facebook'],
		required: true
	}
});

userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);

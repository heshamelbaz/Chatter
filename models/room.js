var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	}
});

module.exports = mongoose.model('room', roomSchema);

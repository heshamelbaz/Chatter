var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required']
	},

	// for now, it's nullable
	creator: {
		type: mongoose.Schema.Types.ObjectId
	}
});

module.exports = mongoose.model('room', roomSchema);

var mongoose = require('mongoose');

// that's an error! How can we search something I sent to someone?
var messageSchema = mongoose.Schema({
	content: {
		type: String,
		required: [true, 'Message must have a content']
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
		required: true
	},
	timestamp: {
		type: Number,
		default: Date.now()
	}
});


module.exports = mongoose.model('Message', messageSchema);

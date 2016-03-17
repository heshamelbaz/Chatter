var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	sender: {
		type: Number,
		required: [true]
	},
	receiver: {
		type: Number,
		required: [true]
	},
	timestamp: {
		type: Number,
		default: Date.now();
	},
  deleted: {
    type: Boolean,
    default: false
  }
});


module.exports = mongoose.model('Message', messageSchema);

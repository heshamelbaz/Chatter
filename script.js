var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are inside the database.");
});
var im = mongoose.Schema({
    content: String,
    sender: Number,
    receiver: Number,
    timestamp: Number
});

var ims = mongoose.model('ims', im);
var example = new ims({ content: 'hello', sender: 1, receiver: 1, timestamp: Date.now()});
console.log(example); 


console.log("expect saving im.");

example.save(function (err, fluffy) {
  if (err) return console.error(err);
  console.log("saved im, successfuly");
});


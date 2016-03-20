module.exports = function(io, mongoose) {

  console.log("show me your mongoose: ");
  console.log(mongoose);

  var im = mongoose.Schema({
      content: String,
      sender: String,
      room: String,
      timestamp: Number
  });

  var ims = mongoose.model('ims', im);

  io.on('connection', function(client){
    client.on("send", function(sender, room,  msg){
      if(!(typeof msg === "undefined" || msg ==="")){
        console.log('room: '+ room);
        console.log(sender);
        var example = new ims({ content: msg, sender: sender._id, room: room, timestamp: Date.now()});
        example.save(function (err, fluffy) {
          if (err) return console.error(err);
          console.log("saved im, successfuly");
        });
        io.sockets.to(room._id).emit('send', sender, msg);
      }
    });


    client.on('join', function(room){
      console.log(room)
      // let's handle if the array doesn't contain the room later
      // and let's trivially bind with name just for now.
      //generally implement later
      client.join(room._id);

    });
  });
};

var Message = require('../models/message.js');

module.exports = function(io) {
  io.on('connection', function(client){
    client.on("send", function(sender, room,  msg){
      if(!(typeof msg === "undefined" || msg ==="")){ 
	var newMessage = new Message({
				content: msg,
				sender: sender._id,
				room: room._id,
				timestamp: Date.now()
			});	
        newMessage.save(function (err, message) {
          	if (err) return console.error(err); 
       	 	io.sockets.to(room._id).emit('send', sender, msg);	
	 });
      }
    });


    client.on('join', function(room){ 
      // let's handle if the array doesn't contain the room later
      // and let's trivially bind with name just for now.
      //generally implement later
      client.join(room._id);

    });
  });
};

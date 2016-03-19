module.exports = function(io, rooms) {
  io.on('connection', function(client){
    client.on("send", function(sender, room,  msg){
      if(!(typeof msg === "undefined" || msg ==="")){
        io.sockets.to(room).emit('send', sender, msg);
      }
    });

    client.on('join', function(room){
      // let's handle if the array doesn't contain the room later
      // and let's trivially bind with name just for now.
      //generally implement later 
      client.join(room);

    });
  });
};

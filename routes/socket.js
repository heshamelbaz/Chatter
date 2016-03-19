module.exports = function(io, rooms) {
  var i =1;
  var map = new Object();
  io.on('connection', function(client){
    client.join('1');
    client.on("send", function(sender, room_name,  msg){
      console.log("send function:  " + sender + " "  + room_name + "  " + msg);
      if(!(typeof msg === "undefined" || msg ==="")){
        io.sockets.to(room_name).emit('send', sender, msg);
      }
    });

    client.on('newroom', function (data){
      rooms.push(data);
      console.log(rooms);
    });


    client.on('join', function(room){
      // let's handle if the array doesn't contain the room later
      // and let's trivially bind with name just for now.
      client.join(room.name);
    });
    client.on("disconnect", function(){
      console.log('user disconnected');
    });
  });
};

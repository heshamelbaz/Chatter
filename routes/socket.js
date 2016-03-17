module.exports = function(io) {
  var i =1;
  var map = new Object();
  io.on('connection', function(client){
    map[i++]=client.id;
    console.log(i-1 + " " + client.id);
    client.send(map[1]);
    client.on("send", function(sender, receiver,  msg){
      console.log("send function:  " + sender + " "  + receiver + "  " + msg);
      if(!(typeof msg === "undefined" || msg ==="")){
        console.log(map);
        if (io.sockets.connected[map[sender]])
          io.to(map[sender]).emit('send', sender, msg);
        if (io.sockets.connected[map[receiver]])
          io.to(map[receiver]).emit('send', sender, msg);
        // io.emit('send', sender, msg);
      }
    });
    client.on("disconnect", function(){
      console.log('user disconnected');
    });
  });
};

var express = require('express');
var router = express.Router();

var i = 1;
router.get('/', function(req, res){
  console.log(all_rooms);

  var sender = i++;
  
  res.render('../views/pages/room.ejs', {data: all_rooms, user: sender});

});

module.exports = router;

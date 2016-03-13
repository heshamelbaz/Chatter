var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket_io    = require( "socket.io" );

var app = express();

var io           = socket_io();
app.io           = io;

var routes = require('./routes/index');
var users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/chat', function(req, res){
  sender = req.query.sender;
  receiver = req.query.receiver;
  if(typeof sender === "undefined" || typeof receiver === "undefined"){
    res.render(path.join('pages/chat.ejs'), {error: true});
    return;
  }
  console.log("sender from request: " + sender);
  console.log("receiver from request: " + receiver);
  res.render('pages/chat', {sender: sender, receiver: receiver});
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



io.on('connection', function(socket){

  socket.on("send", function(sender, msg){
    console.log("sender in connection, from send function: " + sender);
    console.log("msg in send, from request: " + msg);
    if(!(typeof msg === "undefined" || msg ==="")){
      io.emit('send', sender, msg);
    }
  });
  socket.on("disconnect", function(){
    console.log('user disconnected');
  });
});

module.exports = app;

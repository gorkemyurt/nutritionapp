
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , _ = require('underscore')
  , fs = require('fs')
  , path = require('path')
  , passport = require('passport')
   


  var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')

mongoose.connect(config.db)
// Bootstrap models
var models_path = __dirname + '/app/models'

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var app = require('express')()
  , server = require('http').createServer(app)

global = require('./global.js');
global.io = require('socket.io').listen(server);
global.io.configure(function () { 
  global.io.set("transports", ["xhr-polling"]); 
  global.io.set("polling duration", 10); 
});



// socket(io);

// io.sockets.on('connection', function (socket) {
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   // });
//   socket.on('postEvent', function (data) {
//     socket.broadcast.emit('newPost', data);
//   });

// });




// express settings
require('./config/express')(app, config, passport)

require('./config/passport')(passport, config, env)

// Bootstrap routes
require('./config/routes')(app,passport)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
server.listen(port)
console.log('Express app started on port '+port)

// Expose app
exports = module.exports = app
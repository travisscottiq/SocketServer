var http = require('http');
var config = require('./config');
// Create Express web app
var app = require('./webapp');
var server = http.createServer(app);
var io = require('socket.io').listen(server, {log: false,
        agent: false,
        origins: '*:*'});
var mongoose = require('mongoose');
var Conversation = require('./models/conversations');
var ObjectId = require('mongodb').ObjectID;



// Create an HTTP server and listen on the configured port
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  socket.on('client:sendMessage', function(msg){
    console.log('message: ' + msg.message);
  });

  socket.on('client:sendMessage', function(data){
    const message = { 
        message: data.message, 
        createdAt : Date.now(),
        user: {
          id: data.user.id,
          isCustomer: data.user.isCustomer
        }
    };

    Conversation.find({ _id: ObjectId(data.conversationId)}, (found, result) => {
    });
    
    Conversation.update({ _id: ObjectId(data.conversationId) }, 
      { 
        $addToSet: { 
          communicationHistory: message
        }
      }, (err, success) => {
        console.log('pre-send------');
        console.log(success);
        io.emit('server:sendMessage', {
          conversationId: data.conversationId,
          message: success,
        });
        console.log('post-send------');
      });


    
  });
});
  mongoose.connect('mongodb://iqmetrix:1234abcd@ds121622.mlab.com:21622/ekho');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
  // Use connect method to connect to the Server 
  server.listen(config.port, function() {
    console.log('Express server listening on *:' + config.port);
  });
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('chat message', 'you\'re connected');
  socket.on('new_user', function(nickname) {
  	console.log('nickname:' + nickname);
  	socket.nickname = nickname;
  	socket.broadcast.emit('chat message', nickname + ' is now connected');
  });
  
  socket.on('chat message', function(msg) {
  	console.log('message:' + msg);
  	// send to everyone
  	socket.broadcast.emit('chat message', socket.nickname + ': ' + msg);
  	// socket.emit only send to sender
  	//socket.emit('chat message', msg);
  });

  socket.on('tipping', function(tip) {
  	console.log()
  	socket.broadcast.emit('tipping', tip, socket.nickname);
  });

  socket.on('disconnect', function(){
	console.log('user disconnected');
	socket.broadcast.emit('chat message', 'someone juste came out');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
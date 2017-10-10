const five = require("johnny-five");
const express = require('express');
var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const board = new five.Board();

let led = null;

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

board.on("ready", function() {
	console.log('Arduino is ready');

	led = new five.Led(13);
	led.off();

	let ligthSwitch = () => {
		led.toggle();
	}

	io.on('connection', function(socket) {
		socket.on('switch', function() {
			console.log('msg');
			ligthSwitch();
		});
	});

});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
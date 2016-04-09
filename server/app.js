var http = require('http');
var fs = require('fs');
var net = require('net');
var ecstatic = require('ecstatic');

var app = http.createServer(
  ecstatic({ root: __dirname + '/public' })
).listen(8000);

console.log('HTTP Server listening on :8000');

var io = require('socket.io')(app);

// WebSocket
var clientCount = 0;

io.on('connection', function (socket) {
  socket.emit('connected', { status: 'OK' });
  clientCount += 1;
  console.log("Client count: " + clientCount);
});

// TCP
var HOST = '0.0.0.0';
var PORT = 5000;

var server = net.createServer();
server.listen(PORT, HOST);

server.on('connection', function(socket) {
  console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
  socket.on('data', function(data) {
      console.log('Recevied: ' + data.toString().trim());
      io.sockets.emit('play', clientCount);
  });
}).listen(PORT, HOST);



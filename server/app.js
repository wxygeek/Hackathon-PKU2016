var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var net = require('net');

app.listen(8080);

// HTTP
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

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



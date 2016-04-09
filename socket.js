  var socket = io('http://localhost:8080');
  socket.on('connected', function (data) {
    console.log("Connected To Server");
  });
  
  socket.on('play', function (data) {
    // windows.startPlay
    console.log("start playing");
  })
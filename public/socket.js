  var socket = io('http://' + window.location.hostname + ':8080');
  socket.on('connected', function (data) {
    console.log("Connected To Server");
  });

  socket.on('play', function (data) {
    window.startPlay();
    console.log("start playing");
  });
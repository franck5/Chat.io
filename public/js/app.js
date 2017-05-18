 $(function () {
 	var socket = io.connect('http://localhost:8080');
 	var pseudo = prompt('Quel est votre pseudo ?');
 	socket.emit('nouveau_client', pseudo);


    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(pseudo +':  ' + msg));

    });
 });
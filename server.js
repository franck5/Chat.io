var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
// Connexion et Déconnexion des utilisateur
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
//message du chat dans la	 console
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
//envoie des message a tous les utilisateur
io.emit('some event', { for: 'everyone' });    

/*io.on('connection', function(socket){
  socket.broadcast.emit('hi');
});*/
//message du chat a tous les utilisateur 
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg, {pseudo: socket.pseudo, message: msg});
  });
});
io.on('connection', function(socket){
	socket.on('nouveau_client', function(pseudo) {
		io.emit('nouveau_client', pseudo)
	})
})

http.listen(3000, function(){
  console.log('server Ok');
});
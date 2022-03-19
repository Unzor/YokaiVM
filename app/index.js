var http = require('http');
var express = require('express');
var svnc = require('../index.js');

/* serve your app */
var app = express();
app.use(require('express-all-allow')())
app.use(express.json())
var httpServer = http.createServer(app);

app.get('/vnc.js', function(req, res){
  res.sendFile(__dirname + '/vnc.js');
})

app.get('/credentials.js', function(req, res){
  res.sendFile(__dirname + '/credentials.js');
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})


app.get('/vm/windows_xp', function(req, res){
	res.sendFile(__dirname + "/xp.html");
})
httpServer.listen(8080);
console.log('Listening on port', 8080);

/* fire up simplevnc server */
var server = new svnc.Server(httpServer);
server.on('connect', function(client){
  console.log('svnc client connected');
})
server.on('disconnect', function(client){
  console.log('svnc client disconnected');
})
server.on('error', function(err){
  console.error('svnc error', err)
})

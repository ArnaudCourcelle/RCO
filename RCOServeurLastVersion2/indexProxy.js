//./redis-server redis.conf & haproxy -f haproxy.cfg & node indexProxy.js
var SERVER_PORT = 8090;
var cluster = require('cluster');
var workerNumber = require('os').cpus().length;
var numCPUs= require('os').cpus().length;
var compression=require('compression');
var serveStatic = require('serve-static');
var express = require('express');
var http = require('http');
var sio = require('socket.io')({ wsEngine: 'uws' });
var io;  // the io
var redis = require('redis');	
var redisAdapter = require('socket.io-redis');

var serverPort = process.env.PORT || SERVER_PORT;
var workers = process.env.WORKERS || workerNumber;
var redisUrl = process.env.REDISTOGO_URL || 'redis://127.0.0.1:6379';

var app = express();
app.use(compression());
app.use(serveStatic(__dirname+'/public'));

function dat(){
  return new Date()+' '+new Date().getHours()+' H '+new Date().getMinutes()+' M '+ new Date().getSeconds()+' S '+new Date().getMilliseconds()+' ms' ;
}
function start() {
	var processe=require('process');
	var httpServer = http.createServer( app );
	var server = httpServer.listen( process.env.port, function(err) {
		if (err) return cb(err);
		var uid = parseInt(process.env.SUDO_UID);	// Find out which user used sudo through the environment variable
		if (uid) process.setuid(uid);			// Set our server's uid to that user
	});

	io = sio.listen(server);
  	serverPort=process.env.port;
	io.adapter(redisAdapter({ host: 'localhost' , serverPort : 6379 }));		// Use redis to share socket.io info between workers
}

if(cluster.isMaster) {

 var pidToPort = {}; 
  var worker, port;
  for (var i = 0; i < 8; i++) {
    port = 8081 + i;
    worker = cluster.fork({port: port});
    pidToPort[worker.process.pid] = port;
   // console.log('worker : '+worker.process.pid)
  }
	cluster.on('death', function(worker) {
		//

    //console.log('worker %s died. restart...', worker.process.pid);
	});
	cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    var _port=pidToPort[worker.process.pid];
    worker=cluster.fork({port:_port });
    pidToPort[worker.process.pid] = _port;
  }); 

} else {
	start();
	var widgets;
	var sub = redis.createClient(), pub = redis.createClient();		// Our shared memory database -- stores everything in RAM.  

sub.subscribe('widgets', function (err, count) {
  return;
});
sub.on('message', function (channel, message) {	
	 widgets=JSON.parse(message);
})


function updateWidget(w){
    io.sockets.emit('update', w);
}
function updateUser(w){
    io.to(w[0]).emit('update', w.slice(1,w.length));
}

io.sockets.on('connection', function (socket) {
    console.log(socket.id+ ' Connect at Date : '+dat())

	//console.log(widgets);
	if(widgets!=undefined){		socket.emit('update', widgets);}
	//console.log('connect'+ process.env.port)
    socket.on('room',function(room){
        socket.room = room;
        socket.join(socket.room);
        
    });
    socket.on('msg', function(data) {
    console.log('User ' + data[0]+' Page '+ data.slice(1, data.length)+' '+dat())    
      
    if (data[0]=="all"){
    	//console.log('message'+ process.env.port)
    pub.publish('widgets', JSON.stringify(data.slice(1, data.length)));
    	widgets=data;
      updateWidget(data.slice(1, data.length));

    }
    else{
      updateUser(data);
      //widget[data[0]]=data.slice(1, data.length);
    } 
    });
        socket.on('log',function(data){
      console.log(socket.id+' Data : '+data+' Date : '+dat())
    })
      socket.on('disconnect', function() {
        console.log(socket.id+ ' Disonnect at Date : '+dat())

    });

  });
}



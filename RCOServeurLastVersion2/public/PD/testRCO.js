//console.info("Socket.io chat test client");
//var socket = require('socket.io-client')('https://rco.lri.fr');
//var socket = require('socket.io-client')('http://rco.fr');
var socket = require('socket.io-client')('http://127.0.0.1:8080/');
//var socket = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
var osc=require('node-osc');
var oscServer=new osc.Server(8091,'localhost');
var connected=false;
console.log('start')
oscServer.on('message', function(m, rinfo) {
	//console.log(m);
	//if(connected){
	if(m[0]=='/all')
	{socket.emit('msg',["all", m.slice(1,m.length).join(' ')]);}
	if(m[0]=='/user')
		{socket.emit('msg',[m[1], m.slice(2,m.length).join(' ')]);}
	//}
});
//console.log(socket);
//var j=2;
          socket.on('connect', function () {
                console.log("Connected");
                connected=true;
          });


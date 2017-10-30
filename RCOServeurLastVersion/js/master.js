
var socket = io.connect();

function sendpage(p){
	socket.emit('msg',["all","page('"+p+"')"]); 
}
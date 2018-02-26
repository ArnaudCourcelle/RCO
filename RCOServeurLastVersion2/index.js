var compression=require('compression');
var express = require('express');
var serveStatic = require('serve-static');
var app = express();
app.use(compression());
app.use(serveStatic(__dirname+'/public'));
var server=app.listen(80);
var io = require('socket.io').listen(server,{'pingInterval': 1000,"pingTimeout":100000});
function dat(){
  return new Date()+' '+new Date().getHours()+' H '+new Date().getMinutes()+' M '+ new Date().getSeconds()+' S '+new Date().getMilliseconds()+' ms' ;
}
/*var osc = require('node-osc'),
    oscClient = new osc.Client('localhost', 57120);
    console.log('osc client on 57120');

var oscServer = new osc.Server(4445, 'localhost');
    console.log('osc server on 4445');
*/
var widgets;
function updateWidget(w){
    io.sockets.emit('update', w);
}
function updateUser(w){
    io.to(w[0]).emit('update', w.slice(1,w.length));
}
/*
oscServer.on('message', function(oscMsg, rinfo) {
    var oscPath = oscMsg[0],
        args = oscMsg.slice(1, oscMsg.length);
    switch(oscPath) {
          case '/all':
          updateWidget(args);
          break;
          case '/user':
          updateUser(args);
          break;
          default:
          break;
    }
})
*/
io.sockets.on('connection', function (socket) {
  console.log(socket.id+ ' Connect at Date : '+dat())
  //console.log(widgets);
  if(widgets!=undefined){   socket.emit('update', widgets);
//console.log(widgets)
}
//    oscClient.send('/connect',socket.id);
    socket.on('room',function(room){
        //socket.leave(socket.room);
        socket.room = room;
        socket.join(socket.room);
        
    });
    socket.on('msg', function(data) {  
    console.log('User ' + data[0]+' Page '+ data.slice(1, data.length)+' '+dat())    
    if (data[0]=="all"){
            widgets=data.slice(1, data.length);

      updateWidget(data.slice(1, data.length));
    }
    else{
      updateUser(data);
    } 
    });
    socket.on('log',function(data){
      console.log(socket.id+' Data : '+data+' Date : '+dat())
    })
      socket.on('disconnect', function() {
        console.log(socket.id+ ' Disonnect at Date : '+dat())
//      oscClient.send('/connect',socket.id);

    });

  });
console.log('serveur start at '+ dat())

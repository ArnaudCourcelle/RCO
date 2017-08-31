Array.prototype.remove = function(value) {
var idx = this.indexOf(value);
if (idx != -1) {
    return this.splice(idx, 1); // The second parameter is the number of elements to remove.
}
return false;
}
function myFunction(){;}
function opacity(id,value){
	document.getElementById(id).style.opacity=value;
}
function reconnect(){
  socket.io.disconnect();
  socket.io.reconnect();
}
var _ping
function ping(){
clearInterval(_ping)
_ping=setTimeout(function(){ location.reload();},2000);
}
function getId(id){
return document.getElementById(id)
}


var _nodeDate=Date.now();

function getMousePos(canvas,evt){
    var rect = canvas.getBoundingClientRect();
    return{
     x :Math.round(((evt.clientX - rect.left)/rect.width)*10000)/10000,
     y :Math.round(((evt.clientY - rect.top)/rect.height)*10000)/10000
    }
}
function startMouse(id){
getId(id).onmousedown = function() {
	socket.emit('nx',"click");
  this.onmousemove = function(e) {
  var data=getMousePos(getId(id),(e));
  var d2=Date.now();
		if(d2-_nodeDate>100){
		    var data2="";
   		 for (var prop in data) {
   		 data2+=data[prop]+" ";
   		 }
		socket.emit('nx',data2);
		_nodeDate=Date.now();
		}
  }
  this.onmouseup = function() {
    this.onmousemove = null;
    socket.emit('nx',"release");
  }
}
}
function emitclick(event){
socket.emit('nx',"click");
console.log("click");
}
function emitPush(event){
var d2=Date.now();
		if(d2-_nodeDate>_tick){		 
		socket.emit('nx',event.target+" "+1);
		_nodeDate=Date.now();
		}
}
function emitrel(event){socket.emit('nx',"release");}
function emitpos(event){
var data=getMousePos(event.target,event.touches[0]);
  var d2=Date.now();
		if(d2-_nodeDate>_tick){
		    var data2=[];
   		 for (var prop in data) {
   		 data2.push(data[prop]);
   		 }
		socket.emit('nx',data2);
		_nodeDate=Date.now();
		}
	}	

function stopPushButton2(id){
//var start, end;
getId(id).removeEventListener('touchstart',emitclick());
getId(id).removeEventListener('touchend',emitrel());

}
function pushButton2(id){
//var start, end;
var t=getId(id).addEventListener('touchstart',emitclick,false);
var t2=getId(id).addEventListener('touchend',emitrel,false);

}
function stopTouch(id){
getId(id).removeEventListener('touchend',emitclick);
getId(id).removeEventListener('touchstart',emitrel);
console.log("ok");
}
function startTouch(id){
getId(id).addEventListener('touchstart', emitclick);
 getId(id).addEventListener('touchend', emitrel);
 getId(id).addEventListener('touchmove', emitpos);
}
function pushButton(id,color1,color2){
	circle(id,color1);
	$(window).resize(function(){
	circle(id,color1);
	});
	getId(id).addEventListener('touchstart',function(){
	circle(id,color2);
	setTimeout(function(){circle(id,color1);},100);

	var d2=Date.now();
		if(d2-_nodeDate>_tick/2.){		 
		socket.emit('nx',id+" "+1);
		_nodeDate=Date.now();
		}
	});
}
function toggleButton(id,color1,color2){
circle(id,color1);
$(window).resize(function(){
	circle(id,color1);
	});
var start, end;
start=getId(id).addEventListener('touchstart',function() {
	socket.emit('nx',id+" " +1);
	circle(id,color2);
 	});
	end= getId(id).addEventListener('touchend', function() {
	circle(id,color1);
    socket.emit('nx',id+" " +0);
  });
}
function toggleButton2(id,color1,color2){
circle(id,color1);
$(window).resize(function(){
	circle(id,color1);
	});
var start, end;
var ii=0;
start=getId(id).addEventListener('touchstart',function() {
	if(ii==1){
	socket.emit('nx',id+" " +1);
	circle(id,color2);
	ii=0;
}
else{
	socket.emit('nx',id+" " +0);
	circle(id,color1);
	ii=1;
}
 	});
	
}

function startMouseT(id){
var start, move,end;
	start=getId(id).addEventListener('touchstart',function() {
	socket.emit('nx',"click");
 	move= getId(id).addEventListener('touchmove', function(e) {
  var data=getMousePos(getId(id),e.touches[0]);
  var d2=Date.now();
		if(d2-_nodeDate>_tick){
		    var data2="";
   		 for (var prop in data) {
   		 data2+=data[prop]+" ";
   		 }
		socket.emit('nx',data2);
		_nodeDate=Date.now();
		}
  });
 
});
	end= getId(id).addEventListener('touchend', function() {
    getId(id).removeEventListener('touchstart',start );
    getId(id).removeEventListener('touchmove',move);
    socket.emit('nx',"release");
    getId(id).removeEventListener('touchend',end);

  });
}
function startMouseT2(id){
var start, move,end;
	start=getId(id).addEventListener('touchstart',function() {
	socket.emit('nx',id+" click");
 	move= getId(id).addEventListener('touchmove', function(e) {
  var data=getMousePos(getId(id),e.touches[0]);
  var d2=Date.now();
		if(d2-_nodeDate>_tick){
		    var data2=id+" ";
   		 for (var prop in data) {
   		 data2+=data[prop]+" ";
   		 }
		socket.emit('nx',data2);
		_nodeDate=Date.now();
		}
  });
 
});
	end= getId(id).addEventListener('touchend', function() {
    getId(id).removeEventListener('touchstart',start );
    getId(id).removeEventListener('touchmove',move);
    socket.emit('nx',id +" release");
    getId(id).removeEventListener('touchend',end);

  });
}
function move(id,id2,x,y){
var xp = document.getElementById(id2).getBoundingClientRect().width;
var xc = document.getElementById(id).getBoundingClientRect().width;
var yp = document.getElementById(id2).getBoundingClientRect().height;
var yc = document.getElementById(id).getBoundingClientRect().height;
document.getElementById(id).style.left=100*x*((xp-xc)/xp)+"%";
document.getElementById(id).style.top=100*y*((yp-yc)/yp)+"%";
}
function reset(){
document.getElementById("nexus1").style.visibility="hidden";
document.getElementById("nexus2").style.visibility="hidden";
document.getElementById("nexus3").style.visibility="hidden";
document.getElementById("messages").style.visibility="hidden";
document.getElementById("chat").style.visibility="hidden";
document.getElementById("display").style.visibility="visible";
draw=false;
window.removeEventListener("resize", myFunction);
//sendId("main","");

//activeTilt(0);
//tilt.active=0;

//document.getElementById("logo").style.visibility="hidden";
}
function logo(on){
	if (on==0){
		document.getElementById("logo").style.visibility="hidden";
		}
	else{
		document.getElementById("logo").style.visibility="visible";
		}
}
//////gesture


function loadVideo(s) {
    var video=getId("bgvid");
    var sources = video.getElementsByTagName('source');
    sources[0].src = s;
    sources[1].src = s;
    video.load();
    video.play();
}



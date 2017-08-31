 //init
var pop=false;//pour popup
var noSleep = new NoSleep();
var wakeLockEnabled = false;
var delivery;


function fbody(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	noSleep.enable();
	screenfull.request();
 // some code..
}
	
	if (!screenfull.enabled) {
	
		return false;
	}
	//screenfull.request();
	//noSleep.enable(); // keep the screen on!


}
////////common functions
function sendDate(id){
var _date=new Date();
sendId(id,(_date.getHours()*3600000+_date.getMinutes()*60000+_date.getSeconds()*1000+_date.getMilliseconds()));
}

function sendId(id,msg){
	return document.getElementById(id).innerHTML=msg;
	}
////////functions sur div
function openDiv(div,url){
	$( "#"+div ).load( url );
	}

var roomInt=-1;
var room=['rSpot','rChat','rQfun','rVote','rLike','rBgLight','rBgBlack','rUpload2','rPaysagesButton','rPaysagesLed','rPaysagesLed2','simple'];
function joinRoom(room){
	openDiv("display", "room/"+room+"");
	//openDiv("popup", "modal/"+room+"");
	socket.emit('joinRoom', room);
	}
function changeRoom(evt){
	if(evt==1){
		roomInt++;
		if(roomInt>=room.length){roomInt=0;}
	}
	if(evt==0){
		roomInt--;
		if(roomInt<0){roomInt=room.length-1;}
	}
	openDiv("display", "room/"+room[roomInt]+"");
	//openDiv("popup", "modal/"+room[roomInt]+"");
	socket.emit('joinRoom', room[roomInt]);
	//console.log("room "+room[roomInt]);
};
function togglePopup(){
	if (pop==true){
		
		document.getElementById('popup').style.height="0%";
		pop=false;
	}
	else{
	document.getElementById('popup').style.height="100%";
pop=true;}
}
//////////////socket functions
var socket = io.connect();
delivery    = new Delivery(socket);

socket.on('connect', function() {
	socket.on('update', function(w) {
			//console.log(w);
			updateWidget(w);       
		});  
	socket.on('retour-message', function (message) {
	//console.log(message.text);
  $('#messages').prepend($('<li>').text(message.text));
});         
});
function updateWidget(w) {
	var val = "";
	for(var i = 0; i < w.length; i++) {	
		if(typeof w[i]=== 'string'){
			//var r=w[i]
			w[i]=w[i].replace(/_/gi,',');
			w[i]=w[i].replace(/#/gi,' ');
			val+=w[i];
			//val+=w[i].replace(/_/gi,',');
			//val+=w[i].replace(/-/gi,' ');
		}
 		else{			 
 			val+=w[i];
 			val+=' ';
		}
	}
	try{eval(val);}
	catch(err) {;}
}	
function startMessage(){
	;
}
	
///////////////////chat 
function none(){
;}
function envoiMessage(mess) {
  var message = {
        text : $('#chat-msg').val()
    }
  console.log(message);
    if (message.text.trim().length !== 0) { // Gestion message vide
      socket.emit('chat-message', message);
     	$('#chat-msg').val(''); // On vide le champ texte
    }
  }
	function like(){
		getId("audioLike").play();
		socket.emit('nx',"like");
		}	

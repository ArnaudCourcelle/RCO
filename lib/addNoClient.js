 

function sendId(id,msg){
	 getId(id).innerHTML=msg;
}

//init
var pop=false;


//popup a refaire avec animation?
function togglePopup(){
	if (pop==true){
		
		document.getElementById('popup').style.height="0%";
		pop=false;
	}
	else{
	document.getElementById('popup').style.height="100%";
pop=true;}
}


var socket = io.connect();

function openDiv(div,url){
	$( "#"+div ).load( url );
	}
function sendId(id,msg){
	return document.getElementById(id).innerHTML=msg;
	}
var roomInt=-1;
var room=['rSpot','rUpload2'];
function joinRoom(room){
	openDiv("display", "room/"+room+"");
	openDiv("popup", "modal/"+room+"");
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
	openDiv("popup", "modal/"+room[roomInt]+"");
	socket.emit('joinRoom', room[roomInt]);
	console.log("room "+room[roomInt]);
};

socket.on('connect', function() {
	socket.on('update', function(w) {
			updateWidget(w);       
		});  
	});         

function updateWidget(w) {
return;
}	
	
//chat 
function none(){
;}


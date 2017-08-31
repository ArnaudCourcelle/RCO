
/////

var socket = io.connect();
socket.on('connect', function() {
	socket.emit('connect',
	socket.on('update', function(w) {
			updateWidget(w);       
	});
});
function openDiv(div,url){
	$( "#"+div ).load( url );
	}
function page(room){
	openDiv("display", "page/"+room+"");
	console.log(room);
}
function updateWidget(w) {
	var val = "";
	for(var i = 0; i < w.length; i++) {	
		if(typeof w[i]=== 'string'){
			w[i]=w[i].replace(/_/gi,',');
			w[i]=w[i].replace(/#/gi,' ');
			val+=w[i];
		}
 		else{			 
 			val+=w[i];
 			val+=' ';
		}
	}
	try{eval(val);}
	catch(err) {;}
}	  

function fbody(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	noSleep.enable();
	screenfull.request();
}
	
	if (!screenfull.enabled) {
		return false;
		//screenfull.request();
	}
	
	//noSleep.enable(); // keep the screen on!


}
function reset(){}
function sendId(id,msg){
	return document.getElementById(id).innerHTML=msg;
	}
  window.console = {
      log: function(str){
       //document.getElementById("myLog").innerHTML =str;
         }
    }
/////
var room='r'+Math.floor(Math.random() * 4)+'';
var theRoom='welcom';
var sound;
var socket = io.connect();
socket.on('connect', function() {
	console.log(room);
	socket.emit('room',room);
	socket.on('update', function(w) {
			updateWidget(w);       
	});
});
function openDiv(div,url){
	$( "#"+div ).load( url );
	}
function page(room){
	//reset()
	//if(room!=theRoom)
	if( /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	window.navigator.vibrate(500);
}

	isInit=true;
	reset();
	openDiv("display", "page/"+room+"");
	theRoom=room;
//}
	//console.log(room);
}

function reset(){

	//mettre la couleur de fond a noir
	//$(display).background.color = "black";
	window.ondevicemotion = null;
	oscillateurBis.disconnect();
	o.disconnect();
	noeudGain.disconnect();
	sound.stop();
	//stopVibrate();
	//oscillateurBis.disconnect(noeudGain);
	//enlever image
	//enlever son	
	//enlever vibration
	//enlever accelero
	//enelver proximite
	
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
	//screenfull.request();
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		screenfull.request();
		noSleep.enable();
	
}
	
	if (!screenfull.enabled) {
		return false;
		screenfull.request();
	}
	
	noSleep.enable(); // keep the screen on!


}
function audioActiv(){
;
}


function sendId(id,msg){
	return document.getElementById(id).innerHTML=msg;
	}
var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

var isFirefox = typeof InstallTrigger !== 'undefined';
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

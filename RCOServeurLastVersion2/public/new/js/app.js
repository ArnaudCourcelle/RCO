//variables
//sound
var cris_bebe,orgasme,oscillo,gain;
var voice;
var speach_ok=true;
var boucle_speach=false;
var compass_direction=90;
var oscillo_dessin1, oscillo_dessin2;
//eventlistener
function myFunction (){
	alert();
	//window.removeEventListener("click", myFunction, false);
	//window.removeEventListener("click", myFunction, false);
}
if (window.DeviceOrientationEvent) {
 //window.addEventListener('deviceorientation', orientation1)
 }




function reset(){
	//event
	window.removeEventListener('deviceorientation',soundCompass,false);
	window.removeEventListener('deviceorientation',compass,false);
	window.removeEventListener("click", myFunction, false);
	window.removeEventListener('devicemotion', shake_applause,false)
  	window.removeEventListener('deviceorientation',passTilt,false); 
  	window.removeEventListener('deviceorientation',Dessinez_l_espace,false);

	//sound
	//noise.dispose();
	//player.stop();
	note.disconnect();
	player.disconnect();
	sound.disconnect();
	gain.disconnect();
	gain_noise.disconnect();
	oscillo_dessin1.disconnect();
	oscillo_dessin2.disconnect();
	o.disconnect();

}
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
 

 if (typeof document.addEventListener === "undefined" || typeof document.hidden === "undefined") {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }

  function handleVisibilityChange() {
  if (document[hidden]) {
  	reset();
  } else {
  	page(theRoom);
  }
}

	
  
if ('speechSynthesis' in window) {
	voice = window.speechSynthesis;
}
else {document.getElementById("myLog").innerHTML= "votre navigateur n'est pas compatible.";
	}

function speach(r){
	if (speach_ok){
  	var utterThis;
    var txt=r;
   utterThis = new SpeechSynthesisUtterance(r);
    utterThis.pitch = 1;
    utterThis.rate = 1;
    voice.speak(utterThis);
    utterThis.onerror = function(event) {
  }
  utterThis.onstart = function(event) {
  }
  utterThis.onend=function(event) {
    if(boucle_speach)speach(txt);

  }
}
}
//shacker
	var sound=new Tone.Player("../sound/rires.mp3");
	sound.loop=true;

//compass

	var player = new Tone.Player("../sound/ascenceur.mp3");
	player.loop = true;
	var gain =new Tone.Gain(0);
	var gain_noise =new Tone.Gain(0);
	var noise = new Tone.Noise("pink");//.start();
	var autoFilter = new Tone.AutoFilter({
	"frequency" : "8m", 
	"min" : 800, 
	"max" : 15000
	});

	

function compass(e) {
 	var dir=e.alpha;
      var compassDisc = document.getElementById("compassDiscImg");
      compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
      compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
      compassDisc.style.transform = "rotate("+ dir +"deg)";
    }
function soundCompass(e){
		var y=Math.abs(e.beta/180);
		var x=compass_direction-e.alpha;
		x=Math.abs(x);
		if (x>180){
			x=360-x;
		}
		x=x/180;
		player.playbackRate=1-y;
		gain.gain.value=x*3;
		gain_noise.gain.value=1-x;
		autoFilter.filter.frequency.value=y*600;
	}

//shake2
	var note= new Tone.Player("../sound/applause.mp3");
	//note.autostart=true;
	note.playbackRate=Math.random() * (1.3 - 0.8) + 0.8;
	note.retrigger=true;
	var fired=false;
	var applause=0;
	var tiltFB,tiltLR;
	
//var oscco = new Tone.Oscillator(440, "sine").toMaster().start();
var date1,date2;
	date1=new Date();
	date2=new Date();
function shake_applause(eventData) {  	 
	var e=eventData.accelerationIncludingGravity;
	
	//oscco.frequency.value=(e.z+10)*20;
	//if ((tiltFB>-20&&tiltFB<20)||(tiltFB<-160||tiltFB>160)){
			if (applause-e.x>15&&fired){
				date1=new Date();
				if(date1.getTime()-date2.getTime()>300){
				note.start();
				fired=false;
				date2=date1;
			}
		}
			if (e.x<3){
				fired=true;
			}
		//}
			applause=e.x;
};



function passTilt(eventData) {  	
	tiltLR = eventData.gamma;
	tiltFB = eventData.beta;
};
//dessinez l'espace
oscillo_dessin1=new Tone.Oscillator().toMaster();
oscillo_dessin2=new Tone.FMOscillator().toMaster();
function Dessinez_l_espace(e){
	var b=Math.abs(e.beta/180);
	var a=Math.abs(e.alpha/180);
	var g=e.gamma;
	//oscillo_dessin1.frequency.value=(b*1000)+100;
	oscillo_dessin1.frequency.value=a*1000+g*10+b*1000;
	oscillo_dessin2.frequency.value=(g*1000)+1000;
	//oscillo_dessin1.volume.value=(b+0.05)*-30;
	oscillo_dessin2.volume.value=(b+0.05)*-60;

}


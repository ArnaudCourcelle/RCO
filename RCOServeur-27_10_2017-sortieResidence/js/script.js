//sound for init
var context,isPlaying=false,o,isInit=false;
var supportAudio=true,supportAccelero=true;
var oscillateur,oscillateurBis,noeudGain, timer;

  sound=new Howl({
   // src: ['../sound/vieux-tel.wav'
            src: ['../sound/org.mp3','../sound/org.ogg','../sound/org.wav'],
            
    });
  sound.play();
  sound.stop();
  if('webkitAudioContext' in window || 'AudioContext' in window ) {
         context = new (window.AudioContext || window.webkitAudioContext)();
         o = context.createOscillator()
         oscillateur = context.createOscillator();
 		 oscillateurBis = context.createOscillator();
 		 noeudGain = context.createGain();
     }

/*function vibrate(){



    if (isIOSChrome) {
     // is Google Chrome on IOS
     // traitement
     window.navigator.vibrate(3000);
     timer = setTimeout(vibrate,3000); 
} else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
    ) {
     // is Google Chrome
     // traitement
     window.navigator.vibrate(3000);
     timer = setTimeout(vibrate,3000); 
}  else if(isFirefox){
    window.navigator.vibrate(3000);
    timer = setTimeout(vibrate,3000); 
}else { 
     // not Google Chrome 
}

}


function stopVibrate() {


      if (isIOSChrome) {
     // is Google Chrome on IOS
     // traitement
     clearTimeout(timer);
     timer = 0;
     window.navigator.vibrate(0);
} else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
    ) {
     // is Google Chrome
     // traitement
     clearTimeout(timer);
     timer = 0;
     window.navigator.vibrate(0);
} else if(isFirefox){
    clearTimeout(timer);
    timer = 0;
    window.navigator.vibrate(0);
} else { 
     // not Google Chrome 
} 


}*/

 

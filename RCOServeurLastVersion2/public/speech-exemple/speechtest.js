	var voice;
  var utterThis;
  var boucle=false;
if ('speechSynthesis' in window) {
	voice = window.speechSynthesis;
}
else {//document.getElementById("myLog").innerHTML= "votre navigateur n'est pas compatible.";
	}

function speach(r){
  
    var txt=r;
   utterThis = new SpeechSynthesisUtterance(r);
    utterThis.pitch = 3;
    utterThis.rate = 2;
    voice.speak(utterThis);
    utterThis.onerror = function(event) {
  }
  utterThis.onstart = function(event) {
    //tterThis.pitch = 30;
     //utterThis.rate = 10;
  }
  utterThis.onend=function(event) {
    if(boucle)speach(txt);

  }
}
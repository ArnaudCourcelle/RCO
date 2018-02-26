var synth;
if ('speechSynthesis' in window) {
	alert('yep');
	synth = window.speechSynthesis;
}
else {alert('nope');
	}

function speak(r){

    var utterThis = new SpeechSynthesisUtterance(r);
  
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}
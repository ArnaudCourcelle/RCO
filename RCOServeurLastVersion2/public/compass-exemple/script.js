//window.addEventListener("load", function(event) {
function onlload(){
document.getElementById("notice").innerHTML = "load...";
	if (window.DeviceOrientationEvent) {
  document.getElementById("notice").innerHTML = "Gaaf! De DeviceOrientationEvent API word door dit toestel ondersteund.";
  window.addEventListener('deviceorientation', function(eventData) {
  	
    var tiltLR = eventData.gamma;

    var tiltFB = eventData.beta;

    var dir = eventData.alpha
    deviceOrientationHandler(tiltLR, tiltFB, dir);
  }, false);
} else {
  document.getElementById("notice").innerHTML = "Helaas. De DeviceOrientationEvent API word niet door dit toestel ondersteund."
};

    function deviceOrientationHandler(tiltLR, tiltFB, dir) {
      document.getElementById("tiltLR").innerHTML = Math.ceil(tiltLR);
      document.getElementById("tiltFB").innerHTML = Math.ceil(tiltFB);
      document.getElementById("direction").innerHTML = Math.ceil(dir);
      

      var compassDisc = document.getElementById("compassDiscImg");
      compassDisc.style.webkitTransform = "rotate("+ dir +"deg)";
      compassDisc.style.MozTransform = "rotate("+ dir +"deg)";
      compassDisc.style.transform = "rotate("+ dir +"deg)";
    }
  };

//});
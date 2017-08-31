import * as soundworks from 'soundworks/client';
import { centToLinear } from 'soundworks/utils/math';
import PlayerRenderer from './PlayerRenderer';

const audioContext = soundworks.audioContext;

const template = `
  <canvas class="background" id="background"></canvas>
  <div class="foreground" id="foreground">

    <div class="section-top flex-middle"></div>
    <div class="section-center flex-center">
      <p id="title" class="big"><%= title %></p>
      <p id="demo"  class="big">clickMe</p>
     </div>
    <div class="section-bottom flex-middle" id="bottom"></div>
  </div>
`;

const model = { title: `***RCO is running***` };




// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience
class PlayerExperience extends soundworks.Experience {
  constructor(assetsDomain) {
    super();

    this.platform = this.require('platform', { features: ['web-audio'] });
    this.checkin = this.require('checkin', { showDialog: false });
    this.audioBufferManager = this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      directories: { path: 'sounds', recursive: true },
    });


  }



  start() {
    super.start(); // don't forget this


    

    // initialize the view
    this.view = new soundworks.CanvasView(template, model, {}, {
      id: this.id,
      preservePixelRatio: true,

    });



    //premier test jp 


    var myBackgroundColor = '#FFFFFF';

      this.receive('blue', function() {
        console.log('blue');
      });


      this.receive('yellow', function() {

         console.log('YELLOW RECEIVED!');
         var div = document.getElementById( 'foreground' );
         div.style.backgroundColor = 'yellow';
         document.getElementById("demo").addEventListener("click", myFunction);

      function myFunction() {
          document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
          console.log('clicked');
        
      }
      
      this.receive('red',function () {
          var div = document.getElementById( 'foreground' );
          div.style.backgroundColor = 'RED';
          console.log('red');

      });

/*
      div.onmouseleave = function() {
        this.style.backgroundColor = 'red';
        console.log('MouseOver');
      };      

       div.onmouseenter = function() {
       // div.style.backgroundColor = 'red';
        this.style.backgroundColor = 'blue';
        console.log('MouseMove');
      };      */
     
    });




/*
// Reference page elements for dropping current device acceleration values into
 
var accElem = document.getElementById('acceleration'),
    accGravityElem = document.getElementById('acceleration-gravity'),
 
// Define an event handler function for processing the device’s acceleration values
 
    handleDeviceMotionEvent = function(e) {
 
        // Get the current acceleration values in 3 axes and find the greatest of these
 
        var acc = e.acceleration,
            maxAcc = Math.max(acc.x, acc.y, acc.z),
 
        // Get the acceleration values including gravity and find the greatest of these
 
            accGravity = e.accelerationIncludingGravity,
            maxAccGravity = Math.max(accGravity.x, accGravity.y, accGravity.z);
 
        // Output to the user the greatest current acceleration value in any axis, as
        // well as the greatest value in any axis including the effect of gravity
 
        accElem.innerHTML = 'Current acceleration: ' + maxAcc +  'm/s^2';
        accGravityElem.innerHTML = 'Value incl. gravity: ' + maxAccGravity + 'm/s^2';
    };
 
// Assign the event handler function to execute when the device is moving
 
window.addEventListener('devicemotion', handleDeviceMotionEvent, false);


*/



    // as show can be async, we make sure that the view is actually rendered
    this.show().then(() => {
      // play a sound
      this.playSound(this.audioBufferManager.data.tones[0]);

      // play a sound when the message `hello` is received from the server
      // (the message is send when another player joins the experience)
      this.receive('hello', () => this.playSound(this.audioBufferManager.data.tones[1]));

      // play a sound when the message `goodbye` is received from the server
      // (the message is send when another player joins the experience)
      this.receive('goodbye', () => this.playSound(this.audioBufferManager.data.tones[2]));

      // initialize rendering
      const vx = 800 + Math.floor(Math.random() * 200);
      const vy = 800 + Math.floor(Math.random() * 200);

      this.renderer = new PlayerRenderer(vx, vy, (edge) => {
        const idx = (edge === 'top') ? 0 : (edge === 'left' || edge === 'right') ? 1 : 2;
        //son de la balle sur les parois
        //this.playSound(this.audioBufferManager.data.clicks[idx], 300);
      });

      this.view.addRenderer(this.renderer);

      // this function is called before each update (`Renderer.render`) of the canvas
      this.view.setPreRender(function(ctx, dt, canvasWidth, canvasHeight) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#000000';
        ctx.rect(0, 0, canvasWidth, canvasHeight);
        ctx.fill();
        ctx.restore();
      });


    });
  }

  playSound(buffer, randomPitchVar = 0) {
    const src = audioContext.createBufferSource();
    src.connect(audioContext.destination);
    src.buffer = buffer;
    src.start(audioContext.currentTime);
    src.playbackRate.value = centToLinear((Math.random() * 2 - 1) * randomPitchVar);
  }
}




export default PlayerExperience;

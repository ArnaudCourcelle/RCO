import * as soundworks from 'soundworks/client';
import { centToLinear } from 'soundworks/utils/math';

const audioContext = soundworks.audioContext;

const template = `
  <canvas class="background" id="background"></canvas>
  <div class="foreground" id="foreground">
    <div class="section-top flex-middle"></div>
    <label for="Room">Couleur</label><br />
       <select name="color" id="color">
               <option value="red">red</option>
               <option value="yellow">yellow</option>
               <option value="black">black</option>
       </select>
       <input type="text" id="nom" />
       <button id="buttonSend">Send</button>


     </div>

    <div class="section-bottom flex-middle" id="bottom"></div>
 
    <div class="section-center flex-center">
      <p id="title" class="big"><%= title %></p>
  </div>
`;

const model = { title: `***RCO is running as [Master]***` };




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





    // as show can be async, we make sure that the view is actually rendered
    this.show().then(() => {
      // play a sound
      this.playSound(this.audioBufferManager.data.tones[0]);

      this.receive(this.name, () => this.playSound(this.audioBufferManager.data.tones[1]));


      // play a sound when the message `hello` is received from the server
      // (the message is send when another player joins the experience)
      this.receive('hello', () => this.playSound(this.audioBufferManager.data.tones[1]));

      // play a sound when the message `goodbye` is received from the server
      // (the message is send when another player joins the experience)
      this.receive('goodbye', () => this.playSound(this.audioBufferManager.data.tones[2]));




        var button = document.getElementById("buttonSend");
        if (button === null) {
            console.log(null);
        } else {
            button.addEventListener("mousedown", () => {
                var messageToSend = document.getElementById('color').value + document.getElementById('nom').value ;
            //    this.send(document.getElementById('color').value,document.getElementById('nom').value);
                console.log(messageToSend);
                this.send(document.getElementById('nom').value, 'MMMMMMMMMMMMMMMMMMMMMMM', 'MMMMMMMMMMMMMMMMMMMMMMM');
            },false);

        }


        this.receive('red',  () => {
            var div = document.getElementById( 'foreground' );
            div.style.backgroundColor = 'RED';
            console.log('red');
        } );
        this.receive('yellow', () =>{

            var div = document.getElementById( 'foreground' );
            div.style.backgroundColor = 'yellow';
            console.log('red');


        });
        this.receive('black', () =>{

            var div = document.getElementById( 'foreground' );
            div.style.backgroundColor = 'black';
            console.log('red');


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

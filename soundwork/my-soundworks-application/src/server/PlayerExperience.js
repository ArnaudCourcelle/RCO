import { Experience } from 'soundworks/server';


// server-side 'player' experience.
export default class PlayerExperience extends Experience {



    constructor(clientType) {

    super(clientType);
      this.checkin = this.require('checkin');
      this.sharedConfig = this.require('shared-config');
      this.audioBufferManager = this.require('audio-buffer-manager');

  }






    // if anything needs to append when the experience starts
  start(){
  }

  // if anything needs to happen when a client enters the performance (*i.e.*
  // starts the experience on the client side), write it in the `enter` method
  enter(client) {
    super.enter(client);
          // send a 'hello' message to all the other clients of the same type
     this.broadcast(client.type, client, 'hello');
    //  this.receive(client,'testMSG',() => this.broadcast(client.type, client, 'testMSG'));

      this.receive(client,'red',() =>{
          this.broadcast(client.type, client, 'red')
      });
      this.receive(client,client +':yellow',() => this.broadcast(client.type, client, 'yellow'));
      this.receive(client,client +':black',() => this.broadcast(client.type, client, 'black'));

   //   this.receive(client,'testabc',() =>  this.broadcast(client.type, client, 'goodbye'));






  }

  exit(client) {
    super.exit(client);
    // send a 'goodbye' message to all the other clients of the same type
    this.broadcast(client.type, client, 'goodbye');
  }

}

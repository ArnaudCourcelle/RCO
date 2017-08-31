// import client side soundworks and player experience
import * as soundworks from 'soundworks/client';
import PlayerExperience from './PlayerExperience';
import serviceViews from '../shared/serviceViews';

function bootstrap() {
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  const config = Object.assign({ appContainer: '#container' }, window.soundworksConfig);
  soundworks.client.init(config.clientType, config);

  // configure views for the services
  soundworks.client.setServiceInstanciationHook((id, instance) => {

 // console.log(id);
    if (serviceViews.has(id)){
      instance.view = serviceViews.get(id, config);
    //  console.log(id);
    } else {
     // console.log('have no ID');
    }
  });

  // create client side (player) experience and start the client
  const experience = new PlayerExperience(config.assetsDomain);
//  console.log(config.assetsDomain);
  soundworks.client.start();
}

window.addEventListener('load', bootstrap);

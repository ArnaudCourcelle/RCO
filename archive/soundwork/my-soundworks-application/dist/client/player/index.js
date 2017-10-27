'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _PlayerExperience = require('./PlayerExperience');

var _PlayerExperience2 = _interopRequireDefault(_PlayerExperience);

var _serviceViews = require('../shared/serviceViews');

var _serviceViews2 = _interopRequireDefault(_serviceViews);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bootstrap() {
  // initialize the client with configuration received
  // from the server through the `index.html`
  // @see {~/src/server/index.js}
  // @see {~/html/default.ejs}
  var config = (0, _assign2.default)({ appContainer: '#container' }, window.soundworksConfig);
  soundworks.client.init(config.clientType, config);

  // configure views for the services
  soundworks.client.setServiceInstanciationHook(function (id, instance) {

    // console.log(id);
    if (_serviceViews2.default.has(id)) {
      instance.view = _serviceViews2.default.get(id, config);
      //  console.log(id);
    } else {
        // console.log('have no ID');
      }
  });

  // create client side (player) experience and start the client
  var experience = new _PlayerExperience2.default(config.assetsDomain);
  //  console.log(config.assetsDomain);
  soundworks.client.start();
} // import client side soundworks and player experience


window.addEventListener('load', bootstrap);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJib290c3RyYXAiLCJjb25maWciLCJhcHBDb250YWluZXIiLCJ3aW5kb3ciLCJzb3VuZHdvcmtzQ29uZmlnIiwiY2xpZW50IiwiaW5pdCIsImNsaWVudFR5cGUiLCJzZXRTZXJ2aWNlSW5zdGFuY2lhdGlvbkhvb2siLCJpZCIsImluc3RhbmNlIiwiaGFzIiwidmlldyIsImdldCIsImV4cGVyaWVuY2UiLCJhc3NldHNEb21haW4iLCJzdGFydCIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBOztJQUFZQSxVOztBQUNaOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsU0FBU0MsU0FBVCxHQUFxQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU1DLFNBQVMsc0JBQWMsRUFBRUMsY0FBYyxZQUFoQixFQUFkLEVBQThDQyxPQUFPQyxnQkFBckQsQ0FBZjtBQUNBTCxhQUFXTSxNQUFYLENBQWtCQyxJQUFsQixDQUF1QkwsT0FBT00sVUFBOUIsRUFBMENOLE1BQTFDOztBQUVBO0FBQ0FGLGFBQVdNLE1BQVgsQ0FBa0JHLDJCQUFsQixDQUE4QyxVQUFDQyxFQUFELEVBQUtDLFFBQUwsRUFBa0I7O0FBRWpFO0FBQ0csUUFBSSx1QkFBYUMsR0FBYixDQUFpQkYsRUFBakIsQ0FBSixFQUF5QjtBQUN2QkMsZUFBU0UsSUFBVCxHQUFnQix1QkFBYUMsR0FBYixDQUFpQkosRUFBakIsRUFBcUJSLE1BQXJCLENBQWhCO0FBQ0Y7QUFDQyxLQUhELE1BR087QUFDTjtBQUNBO0FBQ0YsR0FURDs7QUFXQTtBQUNBLE1BQU1hLGFBQWEsK0JBQXFCYixPQUFPYyxZQUE1QixDQUFuQjtBQUNGO0FBQ0VoQixhQUFXTSxNQUFYLENBQWtCVyxLQUFsQjtBQUNELEMsQ0E3QkQ7OztBQStCQWIsT0FBT2MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0NqQixTQUFoQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBjbGllbnQgc2lkZSBzb3VuZHdvcmtzIGFuZCBwbGF5ZXIgZXhwZXJpZW5jZVxuaW1wb3J0ICogYXMgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5pbXBvcnQgUGxheWVyRXhwZXJpZW5jZSBmcm9tICcuL1BsYXllckV4cGVyaWVuY2UnO1xuaW1wb3J0IHNlcnZpY2VWaWV3cyBmcm9tICcuLi9zaGFyZWQvc2VydmljZVZpZXdzJztcblxuZnVuY3Rpb24gYm9vdHN0cmFwKCkge1xuICAvLyBpbml0aWFsaXplIHRoZSBjbGllbnQgd2l0aCBjb25maWd1cmF0aW9uIHJlY2VpdmVkXG4gIC8vIGZyb20gdGhlIHNlcnZlciB0aHJvdWdoIHRoZSBgaW5kZXguaHRtbGBcbiAgLy8gQHNlZSB7fi9zcmMvc2VydmVyL2luZGV4LmpzfVxuICAvLyBAc2VlIHt+L2h0bWwvZGVmYXVsdC5lanN9XG4gIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBhcHBDb250YWluZXI6ICcjY29udGFpbmVyJyB9LCB3aW5kb3cuc291bmR3b3Jrc0NvbmZpZyk7XG4gIHNvdW5kd29ya3MuY2xpZW50LmluaXQoY29uZmlnLmNsaWVudFR5cGUsIGNvbmZpZyk7XG5cbiAgLy8gY29uZmlndXJlIHZpZXdzIGZvciB0aGUgc2VydmljZXNcbiAgc291bmR3b3Jrcy5jbGllbnQuc2V0U2VydmljZUluc3RhbmNpYXRpb25Ib29rKChpZCwgaW5zdGFuY2UpID0+IHtcblxuIC8vIGNvbnNvbGUubG9nKGlkKTtcbiAgICBpZiAoc2VydmljZVZpZXdzLmhhcyhpZCkpe1xuICAgICAgaW5zdGFuY2UudmlldyA9IHNlcnZpY2VWaWV3cy5nZXQoaWQsIGNvbmZpZyk7XG4gICAgLy8gIGNvbnNvbGUubG9nKGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAvLyBjb25zb2xlLmxvZygnaGF2ZSBubyBJRCcpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gY3JlYXRlIGNsaWVudCBzaWRlIChwbGF5ZXIpIGV4cGVyaWVuY2UgYW5kIHN0YXJ0IHRoZSBjbGllbnRcbiAgY29uc3QgZXhwZXJpZW5jZSA9IG5ldyBQbGF5ZXJFeHBlcmllbmNlKGNvbmZpZy5hc3NldHNEb21haW4pO1xuLy8gIGNvbnNvbGUubG9nKGNvbmZpZy5hc3NldHNEb21haW4pO1xuICBzb3VuZHdvcmtzLmNsaWVudC5zdGFydCgpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGJvb3RzdHJhcCk7XG4iXX0=
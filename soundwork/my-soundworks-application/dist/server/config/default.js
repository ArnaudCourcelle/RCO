'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

// Configuration of the application.
// Other entries can be added (as long as their name doesn't conflict with
// existing ones) to define global parameters of the application (e.g. BPM,
// synth parameters) that can then be shared easily among all clients using
// the `shared-config` service.
exports.default = {
  // name of the application, used in the `.ejs` template and by default in
  // the `platform` service to populate its view
  appName: 'Radical Choregoraphic Object',

  // name of the environnement ('production' enable cache in express application)
  env: 'development',

  someArray: [0, 1, 2],
  // version of application, can be used to force reload css and js files
  // from server (cf. `html/default.ejs`)
  version: '0.0.1',

  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'player',

  // define from where the assets (static files) should be loaded, these value
  // could also refer to a separate server for scalability reasons. This value
  // should also be used client-side to configure the `audio-buffer-manager` service.
  assetsDomain: '/',

  // port used to open the http server, in production this value is typically 80
  port: 8001,

  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // location of the public directory (accessible through http(s) requests)
  publicDirectory: _path2.default.join(cwd, 'public'),

  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: _path2.default.join(cwd, 'html'),

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null
  },

  // socket.io configuration
  websockets: {
    url: '',
    transports: ['websocket'],
    path: ''
    // @note: EngineIO defaults
    // pingTimeout: 3000,
    // pingInterval: 1000,
    // upgradeTimeout: 10000,
    // maxHttpBufferSize: 10E7,
  },

  // describe the location where the experience takes places, theses values are
  // used by the `placer`, `checkin` and `locator` services.
  // if one of these service is required, this entry shouldn't be removed.
  setup: {
    area: {
      width: 1,
      height: 1,
      // path to an image to be used in the area representation
      background: null
    },
    // list of predefined labels
    labels: null,
    // list of predefined coordinates given as an array of `[x:Number, y:Number]`
    coordinates: null,
    // maximum number of clients allowed in a position
    maxClientsPerPosition: 1,
    // maximum number of positions (may limit or be limited by the number of
    // labels and/or coordinates)
    capacity: Infinity
  },

  // password to be used by the `auth` service
  password: '',

  // configuration of the `osc` service
  osc: {
    // IP of the currently running node server
    receiveAddress: '127.0.0.1',
    // port listening for incomming messages
    receivePort: 57121,
    // IP of the remote application
    sendAddress: '127.0.0.1',
    // port where the remote application is listening for messages
    sendPort: 57120
  },

  // configuration of the `raw-socket` service
  rawSocket: {
    // port used for socket connection
    port: 8080
  },

  // bunyan configuration
  logger: {
    name: 'soundworks',
    level: 'info',
    streams: [{
      level: 'info',
      stream: process.stdout
    }]
  },

  // directory where error reported from the clients are written
  errorReporterDirectory: _path2.default.join(cwd, 'logs', 'clients')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJlbnYiLCJzb21lQXJyYXkiLCJ2ZXJzaW9uIiwiZGVmYXVsdENsaWVudCIsImFzc2V0c0RvbWFpbiIsInBvcnQiLCJlbmFibGVHWmlwQ29tcHJlc3Npb24iLCJwdWJsaWNEaXJlY3RvcnkiLCJqb2luIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0Iiwid2Vic29ja2V0cyIsInVybCIsInRyYW5zcG9ydHMiLCJwYXRoIiwic2V0dXAiLCJhcmVhIiwid2lkdGgiLCJoZWlnaHQiLCJiYWNrZ3JvdW5kIiwibGFiZWxzIiwiY29vcmRpbmF0ZXMiLCJtYXhDbGllbnRzUGVyUG9zaXRpb24iLCJjYXBhY2l0eSIsIkluZmluaXR5IiwicGFzc3dvcmQiLCJvc2MiLCJyZWNlaXZlQWRkcmVzcyIsInJlY2VpdmVQb3J0Iiwic2VuZEFkZHJlc3MiLCJzZW5kUG9ydCIsInJhd1NvY2tldCIsImxvZ2dlciIsIm5hbWUiLCJsZXZlbCIsInN0cmVhbXMiLCJzdHJlYW0iLCJzdGRvdXQiLCJlcnJvclJlcG9ydGVyRGlyZWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBQ0EsSUFBTUEsTUFBTUMsUUFBUUQsR0FBUixFQUFaOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7a0JBQ2U7QUFDYjtBQUNBO0FBQ0FFLFdBQVMsOEJBSEk7O0FBS2I7QUFDQUMsT0FBSyxhQU5ROztBQVFiQyxhQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBUkU7QUFTYjtBQUNBO0FBQ0FDLFdBQVMsT0FYSTs7QUFhYjtBQUNBO0FBQ0FDLGlCQUFlLFFBZkY7O0FBb0JiO0FBQ0E7QUFDQTtBQUNBQyxnQkFBYyxHQXZCRDs7QUF5QmI7QUFDQUMsUUFBTSxJQTFCTzs7QUE2QmI7QUFDQUMseUJBQXVCLElBOUJWOztBQWdDYjtBQUNBQyxtQkFBaUIsZUFBS0MsSUFBTCxDQUFVWCxHQUFWLEVBQWUsUUFBZixDQWpDSjs7QUFtQ2I7QUFDQVkscUJBQW1CLGVBQUtELElBQUwsQ0FBVVgsR0FBVixFQUFlLE1BQWYsQ0FwQ047O0FBdUNiO0FBQ0E7QUFDQTtBQUNBYSxZQUFVLEtBMUNHOztBQTRDYjtBQUNBO0FBQ0E7QUFDQUMsY0FBWTtBQUNWQyxTQUFLLElBREs7QUFFVkMsVUFBTTtBQUZJLEdBL0NDOztBQW9EYjtBQUNBQyxjQUFZO0FBQ1ZDLFNBQUssRUFESztBQUVWQyxnQkFBWSxDQUFDLFdBQUQsQ0FGRjtBQUdWQyxVQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJVLEdBckRDOztBQWdFYjtBQUNBO0FBQ0E7QUFDQUMsU0FBTztBQUNMQyxVQUFNO0FBQ0pDLGFBQU8sQ0FESDtBQUVKQyxjQUFRLENBRko7QUFHSjtBQUNBQyxrQkFBWTtBQUpSLEtBREQ7QUFPTDtBQUNBQyxZQUFRLElBUkg7QUFTTDtBQUNBQyxpQkFBYSxJQVZSO0FBV0w7QUFDQUMsMkJBQXVCLENBWmxCO0FBYUw7QUFDQTtBQUNBQyxjQUFVQztBQWZMLEdBbkVNOztBQXFGYjtBQUNBQyxZQUFVLEVBdEZHOztBQXdGYjtBQUNBQyxPQUFLO0FBQ0g7QUFDQUMsb0JBQWdCLFdBRmI7QUFHSDtBQUNBQyxpQkFBYSxLQUpWO0FBS0g7QUFDQUMsaUJBQWEsV0FOVjtBQU9IO0FBQ0FDLGNBQVU7QUFSUCxHQXpGUTs7QUFvR2I7QUFDQUMsYUFBVztBQUNUO0FBQ0E3QixVQUFNO0FBRkcsR0FyR0U7O0FBMEdiO0FBQ0E4QixVQUFRO0FBQ05DLFVBQU0sWUFEQTtBQUVOQyxXQUFPLE1BRkQ7QUFHTkMsYUFBUyxDQUFDO0FBQ1JELGFBQU8sTUFEQztBQUVSRSxjQUFRekMsUUFBUTBDO0FBRlIsS0FBRDtBQUhILEdBM0dLOztBQXVIYjtBQUNBQywwQkFBd0IsZUFBS2pDLElBQUwsQ0FBVVgsR0FBVixFQUFlLE1BQWYsRUFBdUIsU0FBdkI7QUF4SFgsQyIsImZpbGUiOiJkZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuXG5cbi8vIENvbmZpZ3VyYXRpb24gb2YgdGhlIGFwcGxpY2F0aW9uLlxuLy8gT3RoZXIgZW50cmllcyBjYW4gYmUgYWRkZWQgKGFzIGxvbmcgYXMgdGhlaXIgbmFtZSBkb2Vzbid0IGNvbmZsaWN0IHdpdGhcbi8vIGV4aXN0aW5nIG9uZXMpIHRvIGRlZmluZSBnbG9iYWwgcGFyYW1ldGVycyBvZiB0aGUgYXBwbGljYXRpb24gKGUuZy4gQlBNLFxuLy8gc3ludGggcGFyYW1ldGVycykgdGhhdCBjYW4gdGhlbiBiZSBzaGFyZWQgZWFzaWx5IGFtb25nIGFsbCBjbGllbnRzIHVzaW5nXG4vLyB0aGUgYHNoYXJlZC1jb25maWdgIHNlcnZpY2UuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uLCB1c2VkIGluIHRoZSBgLmVqc2AgdGVtcGxhdGUgYW5kIGJ5IGRlZmF1bHQgaW5cbiAgLy8gdGhlIGBwbGF0Zm9ybWAgc2VydmljZSB0byBwb3B1bGF0ZSBpdHMgdmlld1xuICBhcHBOYW1lOiAnUmFkaWNhbCBDaG9yZWdvcmFwaGljIE9iamVjdCcsXG5cbiAgLy8gbmFtZSBvZiB0aGUgZW52aXJvbm5lbWVudCAoJ3Byb2R1Y3Rpb24nIGVuYWJsZSBjYWNoZSBpbiBleHByZXNzIGFwcGxpY2F0aW9uKVxuICBlbnY6ICdkZXZlbG9wbWVudCcsXG5cbiAgc29tZUFycmF5OiBbMCwgMSwgMl0sXG4gIC8vIHZlcnNpb24gb2YgYXBwbGljYXRpb24sIGNhbiBiZSB1c2VkIHRvIGZvcmNlIHJlbG9hZCBjc3MgYW5kIGpzIGZpbGVzXG4gIC8vIGZyb20gc2VydmVyIChjZi4gYGh0bWwvZGVmYXVsdC5lanNgKVxuICB2ZXJzaW9uOiAnMC4wLjEnLFxuXG4gIC8vIG5hbWUgb2YgdGhlIGRlZmF1bHQgY2xpZW50IHR5cGUsIGkuZS4gdGhlIGNsaWVudCB0aGF0IGNhbiBhY2Nlc3MgdGhlXG4gIC8vIGFwcGxpY2F0aW9uIGF0IGl0cyByb290IFVSTFxuICBkZWZhdWx0Q2xpZW50OiAncGxheWVyJyxcblxuXG5cblxuICAvLyBkZWZpbmUgZnJvbSB3aGVyZSB0aGUgYXNzZXRzIChzdGF0aWMgZmlsZXMpIHNob3VsZCBiZSBsb2FkZWQsIHRoZXNlIHZhbHVlXG4gIC8vIGNvdWxkIGFsc28gcmVmZXIgdG8gYSBzZXBhcmF0ZSBzZXJ2ZXIgZm9yIHNjYWxhYmlsaXR5IHJlYXNvbnMuIFRoaXMgdmFsdWVcbiAgLy8gc2hvdWxkIGFsc28gYmUgdXNlZCBjbGllbnQtc2lkZSB0byBjb25maWd1cmUgdGhlIGBhdWRpby1idWZmZXItbWFuYWdlcmAgc2VydmljZS5cbiAgYXNzZXRzRG9tYWluOiAnLycsXG5cbiAgLy8gcG9ydCB1c2VkIHRvIG9wZW4gdGhlIGh0dHAgc2VydmVyLCBpbiBwcm9kdWN0aW9uIHRoaXMgdmFsdWUgaXMgdHlwaWNhbGx5IDgwXG4gIHBvcnQ6IDgwMDEsXG5cblxuICAvLyBkZWZpbmUgaWYgdGhlIHNlcnZlciBzaG91bGQgdXNlIGd6aXAgY29tcHJlc3Npb24gZm9yIHN0YXRpYyBmaWxlc1xuICBlbmFibGVHWmlwQ29tcHJlc3Npb246IHRydWUsXG5cbiAgLy8gbG9jYXRpb24gb2YgdGhlIHB1YmxpYyBkaXJlY3RvcnkgKGFjY2Vzc2libGUgdGhyb3VnaCBodHRwKHMpIHJlcXVlc3RzKVxuICBwdWJsaWNEaXJlY3Rvcnk6IHBhdGguam9pbihjd2QsICdwdWJsaWMnKSxcblxuICAvLyBkaXJlY3Rvcnkgd2hlcmUgdGhlIHNlcnZlciB0ZW1wbGF0aW5nIHN5c3RlbSBsb29rcyBmb3IgdGhlIGBlanNgIHRlbXBsYXRlc1xuICB0ZW1wbGF0ZURpcmVjdG9yeTogcGF0aC5qb2luKGN3ZCwgJ2h0bWwnKSxcblxuXG4gIC8vIGRlZmluZSBpZiB0aGUgSFRUUCBzZXJ2ZXIgc2hvdWxkIGJlIGxhdW5jaGVkIHVzaW5nIHNlY3VyZSBjb25uZWN0aW9ucy5cbiAgLy8gRm9yIGRldmVsb3BtZW50IHB1cnBvc2VzIHdoZW4gc2V0IHRvIGB0cnVlYCBhbmQgbm8gY2VydGlmaWNhdGVzIGFyZSBnaXZlblxuICAvLyAoY2YuIGBodHRwc0luZm9zYCksIGEgc2VsZi1zaWduZWQgY2VydGlmaWNhdGUgaXMgY3JlYXRlZC5cbiAgdXNlSHR0cHM6IGZhbHNlLFxuXG4gIC8vIHBhdGhzIHRvIHRoZSBrZXkgYW5kIGNlcnRpZmljYXRlIHRvIGJlIHVzZWQgaW4gb3JkZXIgdG8gbGF1bmNoIHRoZSBodHRwc1xuICAvLyBzZXJ2ZXIuIEJvdGggZW50cmllcyBhcmUgcmVxdWlyZWQgb3RoZXJ3aXNlIGEgc2VsZi1zaWduZWQgY2VydGlmaWNhdGVcbiAgLy8gaXMgZ2VuZXJhdGVkLlxuICBodHRwc0luZm9zOiB7XG4gICAga2V5OiBudWxsLFxuICAgIGNlcnQ6IG51bGwsXG4gIH0sXG5cbiAgLy8gc29ja2V0LmlvIGNvbmZpZ3VyYXRpb25cbiAgd2Vic29ja2V0czoge1xuICAgIHVybDogJycsXG4gICAgdHJhbnNwb3J0czogWyd3ZWJzb2NrZXQnXSxcbiAgICBwYXRoOiAnJyxcbiAgICAvLyBAbm90ZTogRW5naW5lSU8gZGVmYXVsdHNcbiAgICAvLyBwaW5nVGltZW91dDogMzAwMCxcbiAgICAvLyBwaW5nSW50ZXJ2YWw6IDEwMDAsXG4gICAgLy8gdXBncmFkZVRpbWVvdXQ6IDEwMDAwLFxuICAgIC8vIG1heEh0dHBCdWZmZXJTaXplOiAxMEU3LFxuICB9LFxuXG4gIC8vIGRlc2NyaWJlIHRoZSBsb2NhdGlvbiB3aGVyZSB0aGUgZXhwZXJpZW5jZSB0YWtlcyBwbGFjZXMsIHRoZXNlcyB2YWx1ZXMgYXJlXG4gIC8vIHVzZWQgYnkgdGhlIGBwbGFjZXJgLCBgY2hlY2tpbmAgYW5kIGBsb2NhdG9yYCBzZXJ2aWNlcy5cbiAgLy8gaWYgb25lIG9mIHRoZXNlIHNlcnZpY2UgaXMgcmVxdWlyZWQsIHRoaXMgZW50cnkgc2hvdWxkbid0IGJlIHJlbW92ZWQuXG4gIHNldHVwOiB7XG4gICAgYXJlYToge1xuICAgICAgd2lkdGg6IDEsXG4gICAgICBoZWlnaHQ6IDEsXG4gICAgICAvLyBwYXRoIHRvIGFuIGltYWdlIHRvIGJlIHVzZWQgaW4gdGhlIGFyZWEgcmVwcmVzZW50YXRpb25cbiAgICAgIGJhY2tncm91bmQ6IG51bGwsXG4gICAgfSxcbiAgICAvLyBsaXN0IG9mIHByZWRlZmluZWQgbGFiZWxzXG4gICAgbGFiZWxzOiBudWxsLFxuICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBjb29yZGluYXRlcyBnaXZlbiBhcyBhbiBhcnJheSBvZiBgW3g6TnVtYmVyLCB5Ok51bWJlcl1gXG4gICAgY29vcmRpbmF0ZXM6IG51bGwsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgY2xpZW50cyBhbGxvd2VkIGluIGEgcG9zaXRpb25cbiAgICBtYXhDbGllbnRzUGVyUG9zaXRpb246IDEsXG4gICAgLy8gbWF4aW11bSBudW1iZXIgb2YgcG9zaXRpb25zIChtYXkgbGltaXQgb3IgYmUgbGltaXRlZCBieSB0aGUgbnVtYmVyIG9mXG4gICAgLy8gbGFiZWxzIGFuZC9vciBjb29yZGluYXRlcylcbiAgICBjYXBhY2l0eTogSW5maW5pdHksXG4gIH0sXG5cbiAgLy8gcGFzc3dvcmQgdG8gYmUgdXNlZCBieSB0aGUgYGF1dGhgIHNlcnZpY2VcbiAgcGFzc3dvcmQ6ICcnLFxuXG4gIC8vIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGBvc2NgIHNlcnZpY2VcbiAgb3NjOiB7XG4gICAgLy8gSVAgb2YgdGhlIGN1cnJlbnRseSBydW5uaW5nIG5vZGUgc2VydmVyXG4gICAgcmVjZWl2ZUFkZHJlc3M6ICcxMjcuMC4wLjEnLFxuICAgIC8vIHBvcnQgbGlzdGVuaW5nIGZvciBpbmNvbW1pbmcgbWVzc2FnZXNcbiAgICByZWNlaXZlUG9ydDogNTcxMjEsXG4gICAgLy8gSVAgb2YgdGhlIHJlbW90ZSBhcHBsaWNhdGlvblxuICAgIHNlbmRBZGRyZXNzOiAnMTI3LjAuMC4xJyxcbiAgICAvLyBwb3J0IHdoZXJlIHRoZSByZW1vdGUgYXBwbGljYXRpb24gaXMgbGlzdGVuaW5nIGZvciBtZXNzYWdlc1xuICAgIHNlbmRQb3J0OiA1NzEyMCxcbiAgfSxcblxuICAvLyBjb25maWd1cmF0aW9uIG9mIHRoZSBgcmF3LXNvY2tldGAgc2VydmljZVxuICByYXdTb2NrZXQ6IHtcbiAgICAvLyBwb3J0IHVzZWQgZm9yIHNvY2tldCBjb25uZWN0aW9uXG4gICAgcG9ydDogODA4MFxuICB9LFxuXG4gIC8vIGJ1bnlhbiBjb25maWd1cmF0aW9uXG4gIGxvZ2dlcjoge1xuICAgIG5hbWU6ICdzb3VuZHdvcmtzJyxcbiAgICBsZXZlbDogJ2luZm8nLFxuICAgIHN0cmVhbXM6IFt7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgc3RyZWFtOiBwcm9jZXNzLnN0ZG91dCxcbiAgICB9LCAvKiB7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgcGF0aDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdsb2dzJywgJ3NvdW5kd29ya3MubG9nJyksXG4gICAgfSAqL11cbiAgfSxcblxuICAvLyBkaXJlY3Rvcnkgd2hlcmUgZXJyb3IgcmVwb3J0ZWQgZnJvbSB0aGUgY2xpZW50cyBhcmUgd3JpdHRlblxuICBlcnJvclJlcG9ydGVyRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAnbG9ncycsICdjbGllbnRzJyksXG59XG4iXX0=
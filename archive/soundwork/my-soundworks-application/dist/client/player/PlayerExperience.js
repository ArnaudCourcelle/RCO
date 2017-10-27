'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _math = require('soundworks/utils/math');

var _PlayerRenderer = require('./PlayerRenderer');

var _PlayerRenderer2 = _interopRequireDefault(_PlayerRenderer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioContext = soundworks.audioContext;

var template = '\n  <canvas class="background" id="background"></canvas>\n  <div class="foreground" id="foreground">\n\n    <div class="section-top flex-middle"></div>\n    <div class="section-center flex-center">\n      <p id="title" class="big"><%= title %></p>\n      <p id="demo"  class="big">clickMe</p>\n     </div>\n    <div class="section-bottom flex-middle" id="bottom"></div>\n  </div>\n';

var model = { title: '***RCO is running***' };

// this experience plays a sound when it starts, and plays another sound when
// other clients join the experience

var PlayerExperience = function (_soundworks$Experienc) {
  (0, _inherits3.default)(PlayerExperience, _soundworks$Experienc);

  function PlayerExperience(assetsDomain) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this));

    _this.platform = _this.require('platform', { features: ['web-audio'] });
    _this.checkin = _this.require('checkin', { showDialog: false });
    _this.audioBufferManager = _this.require('audio-buffer-manager', {
      assetsDomain: assetsDomain,
      directories: { path: 'sounds', recursive: true }
    });

    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'start', this).call(this); // don't forget this


      // initialize the view
      this.view = new soundworks.CanvasView(template, model, {}, {
        id: this.id,
        preservePixelRatio: true

      });

      //premier test jp 


      var myBackgroundColor = '#FFFFFF';

      this.receive('blue', function () {
        console.log('blue');
      });

      this.receive('yellow', function () {

        console.log('YELLOW RECEIVED!');
        var div = document.getElementById('foreground');
        div.style.backgroundColor = 'yellow';
        document.getElementById("demo").addEventListener("click", myFunction);

        function myFunction() {
          document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
          console.log('clicked');
        }

        this.receive('red', function () {
          var div = document.getElementById('foreground');
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
      this.show().then(function () {
        // play a sound
        _this2.playSound(_this2.audioBufferManager.data.tones[0]);

        // play a sound when the message `hello` is received from the server
        // (the message is send when another player joins the experience)
        _this2.receive('hello', function () {
          return _this2.playSound(_this2.audioBufferManager.data.tones[1]);
        });

        // play a sound when the message `goodbye` is received from the server
        // (the message is send when another player joins the experience)
        _this2.receive('goodbye', function () {
          return _this2.playSound(_this2.audioBufferManager.data.tones[2]);
        });

        // initialize rendering
        var vx = 800 + Math.floor(Math.random() * 200);
        var vy = 800 + Math.floor(Math.random() * 200);

        _this2.renderer = new _PlayerRenderer2.default(vx, vy, function (edge) {
          var idx = edge === 'top' ? 0 : edge === 'left' || edge === 'right' ? 1 : 2;
          //son de la balle sur les parois
          //this.playSound(this.audioBufferManager.data.clicks[idx], 300);
        });

        _this2.view.addRenderer(_this2.renderer);

        // this function is called before each update (`Renderer.render`) of the canvas
        _this2.view.setPreRender(function (ctx, dt, canvasWidth, canvasHeight) {
          ctx.save();
          ctx.globalAlpha = 0.1;
          ctx.fillStyle = '#000000';
          ctx.rect(0, 0, canvasWidth, canvasHeight);
          ctx.fill();
          ctx.restore();
        });
      });
    }
  }, {
    key: 'playSound',
    value: function playSound(buffer) {
      var randomPitchVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var src = audioContext.createBufferSource();
      src.connect(audioContext.destination);
      src.buffer = buffer;
      src.start(audioContext.currentTime);
      src.playbackRate.value = (0, _math.centToLinear)((Math.random() * 2 - 1) * randomPitchVar);
    }
  }]);
  return PlayerExperience;
}(soundworks.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsic291bmR3b3JrcyIsImF1ZGlvQ29udGV4dCIsInRlbXBsYXRlIiwibW9kZWwiLCJ0aXRsZSIsIlBsYXllckV4cGVyaWVuY2UiLCJhc3NldHNEb21haW4iLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJmZWF0dXJlcyIsImNoZWNraW4iLCJzaG93RGlhbG9nIiwiYXVkaW9CdWZmZXJNYW5hZ2VyIiwiZGlyZWN0b3JpZXMiLCJwYXRoIiwicmVjdXJzaXZlIiwidmlldyIsIkNhbnZhc1ZpZXciLCJpZCIsInByZXNlcnZlUGl4ZWxSYXRpbyIsIm15QmFja2dyb3VuZENvbG9yIiwicmVjZWl2ZSIsImNvbnNvbGUiLCJsb2ciLCJkaXYiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhZGRFdmVudExpc3RlbmVyIiwibXlGdW5jdGlvbiIsImlubmVySFRNTCIsInNob3ciLCJ0aGVuIiwicGxheVNvdW5kIiwiZGF0YSIsInRvbmVzIiwidngiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ2eSIsInJlbmRlcmVyIiwiZWRnZSIsImlkeCIsImFkZFJlbmRlcmVyIiwic2V0UHJlUmVuZGVyIiwiY3R4IiwiZHQiLCJjYW52YXNXaWR0aCIsImNhbnZhc0hlaWdodCIsInNhdmUiLCJnbG9iYWxBbHBoYSIsImZpbGxTdHlsZSIsInJlY3QiLCJmaWxsIiwicmVzdG9yZSIsImJ1ZmZlciIsInJhbmRvbVBpdGNoVmFyIiwic3JjIiwiY3JlYXRlQnVmZmVyU291cmNlIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJjdXJyZW50VGltZSIsInBsYXliYWNrUmF0ZSIsInZhbHVlIiwiRXhwZXJpZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLFU7O0FBQ1o7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUMsZUFB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a0JBcUszQjlELGdCIiwiZmlsZSI6IlBsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCB7IGNlbnRUb0xpbmVhciB9IGZyb20gJ3NvdW5kd29ya3MvdXRpbHMvbWF0aCc7XG5pbXBvcnQgUGxheWVyUmVuZGVyZXIgZnJvbSAnLi9QbGF5ZXJSZW5kZXJlcic7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGNhbnZhcyBjbGFzcz1cImJhY2tncm91bmRcIiBpZD1cImJhY2tncm91bmRcIj48L2NhbnZhcz5cbiAgPGRpdiBjbGFzcz1cImZvcmVncm91bmRcIiBpZD1cImZvcmVncm91bmRcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcCBmbGV4LW1pZGRsZVwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgPHAgaWQ9XCJ0aXRsZVwiIGNsYXNzPVwiYmlnXCI+PCU9IHRpdGxlICU+PC9wPlxuICAgICAgPHAgaWQ9XCJkZW1vXCIgIGNsYXNzPVwiYmlnXCI+Y2xpY2tNZTwvcD5cbiAgICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tIGZsZXgtbWlkZGxlXCIgaWQ9XCJib3R0b21cIj48L2Rpdj5cbiAgPC9kaXY+XG5gO1xuXG5jb25zdCBtb2RlbCA9IHsgdGl0bGU6IGAqKipSQ08gaXMgcnVubmluZyoqKmAgfTtcblxuXG5cblxuLy8gdGhpcyBleHBlcmllbmNlIHBsYXlzIGEgc291bmQgd2hlbiBpdCBzdGFydHMsIGFuZCBwbGF5cyBhbm90aGVyIHNvdW5kIHdoZW5cbi8vIG90aGVyIGNsaWVudHMgam9pbiB0aGUgZXhwZXJpZW5jZVxuY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIHNvdW5kd29ya3MuRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGFzc2V0c0RvbWFpbikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnBsYXRmb3JtID0gdGhpcy5yZXF1aXJlKCdwbGF0Zm9ybScsIHsgZmVhdHVyZXM6IFsnd2ViLWF1ZGlvJ10gfSk7XG4gICAgdGhpcy5jaGVja2luID0gdGhpcy5yZXF1aXJlKCdjaGVja2luJywgeyBzaG93RGlhbG9nOiBmYWxzZSB9KTtcbiAgICB0aGlzLmF1ZGlvQnVmZmVyTWFuYWdlciA9IHRoaXMucmVxdWlyZSgnYXVkaW8tYnVmZmVyLW1hbmFnZXInLCB7XG4gICAgICBhc3NldHNEb21haW46IGFzc2V0c0RvbWFpbixcbiAgICAgIGRpcmVjdG9yaWVzOiB7IHBhdGg6ICdzb3VuZHMnLCByZWN1cnNpdmU6IHRydWUgfSxcbiAgICB9KTtcblxuXG4gIH1cblxuXG5cbiAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuXG4gICAgXG5cbiAgICAvLyBpbml0aWFsaXplIHRoZSB2aWV3XG4gICAgdGhpcy52aWV3ID0gbmV3IHNvdW5kd29ya3MuQ2FudmFzVmlldyh0ZW1wbGF0ZSwgbW9kZWwsIHt9LCB7XG4gICAgICBpZDogdGhpcy5pZCxcbiAgICAgIHByZXNlcnZlUGl4ZWxSYXRpbzogdHJ1ZSxcblxuICAgIH0pO1xuXG5cblxuICAgIC8vcHJlbWllciB0ZXN0IGpwIFxuXG5cbiAgICB2YXIgbXlCYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRkZGRic7XG5cbiAgICAgIHRoaXMucmVjZWl2ZSgnYmx1ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnYmx1ZScpO1xuICAgICAgfSk7XG5cblxuICAgICAgdGhpcy5yZWNlaXZlKCd5ZWxsb3cnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgY29uc29sZS5sb2coJ1lFTExPVyBSRUNFSVZFRCEnKTtcbiAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ZvcmVncm91bmQnICk7XG4gICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbW9cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG15RnVuY3Rpb24pO1xuXG4gICAgICBmdW5jdGlvbiBteUZ1bmN0aW9uKCkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVtb1wiKS5pbm5lckhUTUwgPSBcIllPVSBDTElDS0VEIE1FIVwiO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJyk7XG4gICAgICAgIFxuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLnJlY2VpdmUoJ3JlZCcsZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2ZvcmVncm91bmQnICk7XG4gICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdSRUQnO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWQnKTtcblxuICAgICAgfSk7XG5cbi8qXG4gICAgICBkaXYub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNb3VzZU92ZXInKTtcbiAgICAgIH07ICAgICAgXG5cbiAgICAgICBkaXYub25tb3VzZWVudGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgLy8gZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuICAgICAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdibHVlJztcbiAgICAgICAgY29uc29sZS5sb2coJ01vdXNlTW92ZScpO1xuICAgICAgfTsgICAgICAqL1xuICAgICBcbiAgICB9KTtcblxuXG5cblxuLypcbi8vIFJlZmVyZW5jZSBwYWdlIGVsZW1lbnRzIGZvciBkcm9wcGluZyBjdXJyZW50IGRldmljZSBhY2NlbGVyYXRpb24gdmFsdWVzIGludG9cbiBcbnZhciBhY2NFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjY2VsZXJhdGlvbicpLFxuICAgIGFjY0dyYXZpdHlFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjY2VsZXJhdGlvbi1ncmF2aXR5JyksXG4gXG4vLyBEZWZpbmUgYW4gZXZlbnQgaGFuZGxlciBmdW5jdGlvbiBmb3IgcHJvY2Vzc2luZyB0aGUgZGV2aWNl4oCZcyBhY2NlbGVyYXRpb24gdmFsdWVzXG4gXG4gICAgaGFuZGxlRGV2aWNlTW90aW9uRXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gXG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBhY2NlbGVyYXRpb24gdmFsdWVzIGluIDMgYXhlcyBhbmQgZmluZCB0aGUgZ3JlYXRlc3Qgb2YgdGhlc2VcbiBcbiAgICAgICAgdmFyIGFjYyA9IGUuYWNjZWxlcmF0aW9uLFxuICAgICAgICAgICAgbWF4QWNjID0gTWF0aC5tYXgoYWNjLngsIGFjYy55LCBhY2MueiksXG4gXG4gICAgICAgIC8vIEdldCB0aGUgYWNjZWxlcmF0aW9uIHZhbHVlcyBpbmNsdWRpbmcgZ3Jhdml0eSBhbmQgZmluZCB0aGUgZ3JlYXRlc3Qgb2YgdGhlc2VcbiBcbiAgICAgICAgICAgIGFjY0dyYXZpdHkgPSBlLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHksXG4gICAgICAgICAgICBtYXhBY2NHcmF2aXR5ID0gTWF0aC5tYXgoYWNjR3Jhdml0eS54LCBhY2NHcmF2aXR5LnksIGFjY0dyYXZpdHkueik7XG4gXG4gICAgICAgIC8vIE91dHB1dCB0byB0aGUgdXNlciB0aGUgZ3JlYXRlc3QgY3VycmVudCBhY2NlbGVyYXRpb24gdmFsdWUgaW4gYW55IGF4aXMsIGFzXG4gICAgICAgIC8vIHdlbGwgYXMgdGhlIGdyZWF0ZXN0IHZhbHVlIGluIGFueSBheGlzIGluY2x1ZGluZyB0aGUgZWZmZWN0IG9mIGdyYXZpdHlcbiBcbiAgICAgICAgYWNjRWxlbS5pbm5lckhUTUwgPSAnQ3VycmVudCBhY2NlbGVyYXRpb246ICcgKyBtYXhBY2MgKyAgJ20vc14yJztcbiAgICAgICAgYWNjR3Jhdml0eUVsZW0uaW5uZXJIVE1MID0gJ1ZhbHVlIGluY2wuIGdyYXZpdHk6ICcgKyBtYXhBY2NHcmF2aXR5ICsgJ20vc14yJztcbiAgICB9O1xuIFxuLy8gQXNzaWduIHRoZSBldmVudCBoYW5kbGVyIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgZGV2aWNlIGlzIG1vdmluZ1xuIFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW1vdGlvbicsIGhhbmRsZURldmljZU1vdGlvbkV2ZW50LCBmYWxzZSk7XG5cblxuKi9cblxuXG5cbiAgICAvLyBhcyBzaG93IGNhbiBiZSBhc3luYywgd2UgbWFrZSBzdXJlIHRoYXQgdGhlIHZpZXcgaXMgYWN0dWFsbHkgcmVuZGVyZWRcbiAgICB0aGlzLnNob3coKS50aGVuKCgpID0+IHtcbiAgICAgIC8vIHBsYXkgYSBzb3VuZFxuICAgICAgdGhpcy5wbGF5U291bmQodGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIuZGF0YS50b25lc1swXSk7XG5cbiAgICAgIC8vIHBsYXkgYSBzb3VuZCB3aGVuIHRoZSBtZXNzYWdlIGBoZWxsb2AgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyXG4gICAgICAvLyAodGhlIG1lc3NhZ2UgaXMgc2VuZCB3aGVuIGFub3RoZXIgcGxheWVyIGpvaW5zIHRoZSBleHBlcmllbmNlKVxuICAgICAgdGhpcy5yZWNlaXZlKCdoZWxsbycsICgpID0+IHRoaXMucGxheVNvdW5kKHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGEudG9uZXNbMV0pKTtcblxuICAgICAgLy8gcGxheSBhIHNvdW5kIHdoZW4gdGhlIG1lc3NhZ2UgYGdvb2RieWVgIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICAgICAgLy8gKHRoZSBtZXNzYWdlIGlzIHNlbmQgd2hlbiBhbm90aGVyIHBsYXllciBqb2lucyB0aGUgZXhwZXJpZW5jZSlcbiAgICAgIHRoaXMucmVjZWl2ZSgnZ29vZGJ5ZScsICgpID0+IHRoaXMucGxheVNvdW5kKHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGEudG9uZXNbMl0pKTtcblxuICAgICAgLy8gaW5pdGlhbGl6ZSByZW5kZXJpbmdcbiAgICAgIGNvbnN0IHZ4ID0gODAwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjAwKTtcbiAgICAgIGNvbnN0IHZ5ID0gODAwICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjAwKTtcblxuICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQbGF5ZXJSZW5kZXJlcih2eCwgdnksIChlZGdlKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkeCA9IChlZGdlID09PSAndG9wJykgPyAwIDogKGVkZ2UgPT09ICdsZWZ0JyB8fCBlZGdlID09PSAncmlnaHQnKSA/IDEgOiAyO1xuICAgICAgICAvL3NvbiBkZSBsYSBiYWxsZSBzdXIgbGVzIHBhcm9pc1xuICAgICAgICAvL3RoaXMucGxheVNvdW5kKHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGEuY2xpY2tzW2lkeF0sIDMwMCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy52aWV3LmFkZFJlbmRlcmVyKHRoaXMucmVuZGVyZXIpO1xuXG4gICAgICAvLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBiZWZvcmUgZWFjaCB1cGRhdGUgKGBSZW5kZXJlci5yZW5kZXJgKSBvZiB0aGUgY2FudmFzXG4gICAgICB0aGlzLnZpZXcuc2V0UHJlUmVuZGVyKGZ1bmN0aW9uKGN0eCwgZHQsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwMDAwMDAnO1xuICAgICAgICBjdHgucmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgIH0pO1xuXG5cbiAgICB9KTtcbiAgfVxuXG4gIHBsYXlTb3VuZChidWZmZXIsIHJhbmRvbVBpdGNoVmFyID0gMCkge1xuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5idWZmZXIgPSBidWZmZXI7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG4gICAgc3JjLnBsYXliYWNrUmF0ZS52YWx1ZSA9IGNlbnRUb0xpbmVhcigoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIHJhbmRvbVBpdGNoVmFyKTtcbiAgfVxufVxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJFeHBlcmllbmNlO1xuIl19
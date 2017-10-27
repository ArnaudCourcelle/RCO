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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioContext = soundworks.audioContext;

var template = '\n  <canvas class="background" id="background"></canvas>\n  <div class="foreground" id="foreground">\n    <div class="section-top flex-middle"></div>\n    <label for="Room">Couleur</label><br />\n       <select name="color" id="color">\n               <option value="red">red</option>\n               <option value="yellow">yellow</option>\n               <option value="black">black</option>\n       </select>\n       <input type="text" id="nom" />\n       <button id="buttonSend">Send</button>\n\n\n     </div>\n\n    <div class="section-bottom flex-middle" id="bottom"></div>\n \n    <div class="section-center flex-center">\n      <p id="title" class="big"><%= title %></p>\n  </div>\n';

var model = { title: '***RCO is running as [Master]***' };

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

      // as show can be async, we make sure that the view is actually rendered
      this.show().then(function () {
        // play a sound
        _this2.playSound(_this2.audioBufferManager.data.tones[0]);

        _this2.receive(_this2.name, function () {
          return _this2.playSound(_this2.audioBufferManager.data.tones[1]);
        });

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

        var button = document.getElementById("buttonSend");
        if (button === null) {
          console.log(null);
        } else {
          button.addEventListener("mousedown", function () {
            var messageToSend = document.getElementById('color').value + document.getElementById('nom').value;
            //    this.send(document.getElementById('color').value,document.getElementById('nom').value);
            console.log(messageToSend);
            _this2.send(document.getElementById('nom').value, 'MMMMMMMMMMMMMMMMMMMMMMM', 'MMMMMMMMMMMMMMMMMMMMMMM');
          }, false);
        }

        _this2.receive('red', function () {
          var div = document.getElementById('foreground');
          div.style.backgroundColor = 'RED';
          console.log('red');
        });
        _this2.receive('yellow', function () {

          var div = document.getElementById('foreground');
          div.style.backgroundColor = 'yellow';
          console.log('red');
        });
        _this2.receive('black', function () {

          var div = document.getElementById('foreground');
          div.style.backgroundColor = 'black';
          console.log('red');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsic291bmR3b3JrcyIsImF1ZGlvQ29udGV4dCIsInRlbXBsYXRlIiwibW9kZWwiLCJ0aXRsZSIsIlBsYXllckV4cGVyaWVuY2UiLCJhc3NldHNEb21haW4iLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJmZWF0dXJlcyIsImNoZWNraW4iLCJzaG93RGlhbG9nIiwiYXVkaW9CdWZmZXJNYW5hZ2VyIiwiZGlyZWN0b3JpZXMiLCJwYXRoIiwicmVjdXJzaXZlIiwidmlldyIsIkNhbnZhc1ZpZXciLCJpZCIsInByZXNlcnZlUGl4ZWxSYXRpbyIsIm15QmFja2dyb3VuZENvbG9yIiwic2hvdyIsInRoZW4iLCJwbGF5U291bmQiLCJkYXRhIiwidG9uZXMiLCJyZWNlaXZlIiwibmFtZSIsImJ1dHRvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25zb2xlIiwibG9nIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1lc3NhZ2VUb1NlbmQiLCJ2YWx1ZSIsInNlbmQiLCJkaXYiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImJ1ZmZlciIsInJhbmRvbVBpdGNoVmFyIiwic3JjIiwiY3JlYXRlQnVmZmVyU291cmNlIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwic3RhcnQiLCJjdXJyZW50VGltZSIsInBsYXliYWNrUmF0ZSIsIk1hdGgiLCJyYW5kb20iLCJFeHBlcmllbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsVTs7QUFDWjs7Ozs7O0FBRUEsSUFBTUMsZUFBZUQsV0FBV0MsWUFBaEM7O0FBRUEsSUFBTUMsOHJCQUFOOztBQXVCQSxJQUFNQyxRQUFRLEVBQUVDLHlDQUFGLEVBQWQ7O0FBS0E7QUFDQTs7SUFDTUMsZ0I7OztBQUNKLDRCQUFZQyxZQUFaLEVBQTBCO0FBQUE7O0FBQUE7O0FBR3hCLFVBQUtDLFFBQUwsR0FBZ0IsTUFBS0MsT0FBTCxD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RXZCLGNBQUlXLE1BQU1SLFNBQVNDLGNBQVQsQ0FBeUIsWUFBekIsQ0FBVjtBQUNBTyxjQUFJQyxLQUFKLENBQVVDLGVBQVYsR0FBNEIsT0FBNUI7QUFDQVIsa0JBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBR0gsU0FQRDtBQVVILE9BdkREO0FBMkREOzs7OEJBT1NRLE0sRUFBNEI7QUFBQSxVQUFwQkMsY0FBb0IsdUVBQUgsQ0FBRzs7QUFDcEMsVUFBTUMsTUFBTXpDLGFBQWEwQyxrQkFBYixFQUFaO0FBQ0FELFVBQUlFLE9BQUosQ0FBWTNDLGFBQWE0QyxXQUF6QjtBQUNBSCxVQUFJRixNQUFKLEdBQWFBLE1BQWI7QUFDQUUsVUFBSUksS0FBSixDQUFVN0MsYUFBYThDLFdBQXZCO0FBQ0FMLFVBQUlNLFlBQUosQ0FBaUJiLEtBQWpCLEdBQXlCLHdCQUFhLENBQUNjLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsQ0FBckIsSUFBMEJULGNBQXZDLENBQXpCO0FBQ0Q7OztFQWpINEJ6QyxXQUFXbUQsVTs7a0JBdUgzQjlDLGdCIiwiZmlsZSI6IlBsYXllckV4cGVyaWVuY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3MvY2xpZW50JztcbmltcG9ydCB7IGNlbnRUb0xpbmVhciB9IGZyb20gJ3NvdW5kd29ya3MvdXRpbHMvbWF0aCc7XG5cbmNvbnN0IGF1ZGlvQ29udGV4dCA9IHNvdW5kd29ya3MuYXVkaW9Db250ZXh0O1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGNhbnZhcyBjbGFzcz1cImJhY2tncm91bmRcIiBpZD1cImJhY2tncm91bmRcIj48L2NhbnZhcz5cbiAgPGRpdiBjbGFzcz1cImZvcmVncm91bmRcIiBpZD1cImZvcmVncm91bmRcIj5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj48L2Rpdj5cbiAgICA8bGFiZWwgZm9yPVwiUm9vbVwiPkNvdWxldXI8L2xhYmVsPjxiciAvPlxuICAgICAgIDxzZWxlY3QgbmFtZT1cImNvbG9yXCIgaWQ9XCJjb2xvclwiPlxuICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJlZFwiPnJlZDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInllbGxvd1wiPnllbGxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJsYWNrXCI+YmxhY2s8L29wdGlvbj5cbiAgICAgICA8L3NlbGVjdD5cbiAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5vbVwiIC8+XG4gICAgICAgPGJ1dHRvbiBpZD1cImJ1dHRvblNlbmRcIj5TZW5kPC9idXR0b24+XG5cblxuICAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiIGlkPVwiYm90dG9tXCI+PC9kaXY+XG4gXG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICA8cCBpZD1cInRpdGxlXCIgY2xhc3M9XCJiaWdcIj48JT0gdGl0bGUgJT48L3A+XG4gIDwvZGl2PlxuYDtcblxuY29uc3QgbW9kZWwgPSB7IHRpdGxlOiBgKioqUkNPIGlzIHJ1bm5pbmcgYXMgW01hc3Rlcl0qKipgIH07XG5cblxuXG5cbi8vIHRoaXMgZXhwZXJpZW5jZSBwbGF5cyBhIHNvdW5kIHdoZW4gaXQgc3RhcnRzLCBhbmQgcGxheXMgYW5vdGhlciBzb3VuZCB3aGVuXG4vLyBvdGhlciBjbGllbnRzIGpvaW4gdGhlIGV4cGVyaWVuY2VcbmNsYXNzIFBsYXllckV4cGVyaWVuY2UgZXh0ZW5kcyBzb3VuZHdvcmtzLkV4cGVyaWVuY2Uge1xuICBjb25zdHJ1Y3Rvcihhc3NldHNEb21haW4pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5wbGF0Zm9ybSA9IHRoaXMucmVxdWlyZSgncGxhdGZvcm0nLCB7IGZlYXR1cmVzOiBbJ3dlYi1hdWRpbyddIH0pO1xuICAgIHRoaXMuY2hlY2tpbiA9IHRoaXMucmVxdWlyZSgnY2hlY2tpbicsIHsgc2hvd0RpYWxvZzogZmFsc2UgfSk7XG4gICAgdGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIgPSB0aGlzLnJlcXVpcmUoJ2F1ZGlvLWJ1ZmZlci1tYW5hZ2VyJywge1xuICAgICAgYXNzZXRzRG9tYWluOiBhc3NldHNEb21haW4sXG4gICAgICBkaXJlY3RvcmllczogeyBwYXRoOiAnc291bmRzJywgcmVjdXJzaXZlOiB0cnVlIH0sXG4gICAgfSk7XG5cbiAgfVxuXG5cblxuXG4gICAgc3RhcnQoKSB7XG4gICAgc3VwZXIuc3RhcnQoKTsgLy8gZG9uJ3QgZm9yZ2V0IHRoaXNcblxuXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgdmlld1xuICAgIHRoaXMudmlldyA9IG5ldyBzb3VuZHdvcmtzLkNhbnZhc1ZpZXcodGVtcGxhdGUsIG1vZGVsLCB7fSwge1xuICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICBwcmVzZXJ2ZVBpeGVsUmF0aW86IHRydWUsXG5cbiAgICB9KTtcblxuXG5cblxuICAgIC8vcHJlbWllciB0ZXN0IGpwIFxuXG4gICAgICAgXG5cbiAgICB2YXIgbXlCYWNrZ3JvdW5kQ29sb3IgPSAnI0ZGRkZGRic7XG5cblxuXG5cblxuICAgIC8vIGFzIHNob3cgY2FuIGJlIGFzeW5jLCB3ZSBtYWtlIHN1cmUgdGhhdCB0aGUgdmlldyBpcyBhY3R1YWxseSByZW5kZXJlZFxuICAgIHRoaXMuc2hvdygpLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gcGxheSBhIHNvdW5kXG4gICAgICB0aGlzLnBsYXlTb3VuZCh0aGlzLmF1ZGlvQnVmZmVyTWFuYWdlci5kYXRhLnRvbmVzWzBdKTtcblxuICAgICAgdGhpcy5yZWNlaXZlKHRoaXMubmFtZSwgKCkgPT4gdGhpcy5wbGF5U291bmQodGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIuZGF0YS50b25lc1sxXSkpO1xuXG5cbiAgICAgIC8vIHBsYXkgYSBzb3VuZCB3aGVuIHRoZSBtZXNzYWdlIGBoZWxsb2AgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyXG4gICAgICAvLyAodGhlIG1lc3NhZ2UgaXMgc2VuZCB3aGVuIGFub3RoZXIgcGxheWVyIGpvaW5zIHRoZSBleHBlcmllbmNlKVxuICAgICAgdGhpcy5yZWNlaXZlKCdoZWxsbycsICgpID0+IHRoaXMucGxheVNvdW5kKHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGEudG9uZXNbMV0pKTtcblxuICAgICAgLy8gcGxheSBhIHNvdW5kIHdoZW4gdGhlIG1lc3NhZ2UgYGdvb2RieWVgIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICAgICAgLy8gKHRoZSBtZXNzYWdlIGlzIHNlbmQgd2hlbiBhbm90aGVyIHBsYXllciBqb2lucyB0aGUgZXhwZXJpZW5jZSlcbiAgICAgIHRoaXMucmVjZWl2ZSgnZ29vZGJ5ZScsICgpID0+IHRoaXMucGxheVNvdW5kKHRoaXMuYXVkaW9CdWZmZXJNYW5hZ2VyLmRhdGEudG9uZXNbMl0pKTtcblxuXG5cblxuICAgICAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25TZW5kXCIpO1xuICAgICAgICBpZiAoYnV0dG9uID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhudWxsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVRvU2VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvcicpLnZhbHVlICsgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vbScpLnZhbHVlIDtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuc2VuZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3InKS52YWx1ZSxkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9tJykudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2VUb1NlbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9tJykudmFsdWUsICdNTU1NTU1NTU1NTU1NTU1NTU1NTU1NTScsICdNTU1NTU1NTU1NTU1NTU1NTU1NTU1NTScpO1xuICAgICAgICAgICAgfSxmYWxzZSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgdGhpcy5yZWNlaXZlKCdyZWQnLCAgKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZm9yZWdyb3VuZCcgKTtcbiAgICAgICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnUkVEJztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWQnKTtcbiAgICAgICAgfSApO1xuICAgICAgICB0aGlzLnJlY2VpdmUoJ3llbGxvdycsICgpID0+e1xuXG4gICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdmb3JlZ3JvdW5kJyApO1xuICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZCcpO1xuXG5cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZSgnYmxhY2snLCAoKSA9PntcblxuICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnZm9yZWdyb3VuZCcgKTtcbiAgICAgICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYmxhY2snO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlZCcpO1xuXG5cbiAgICAgICAgfSk7XG5cblxuICAgIH0pO1xuXG5cblxuICB9XG5cblxuXG5cblxuXG4gIHBsYXlTb3VuZChidWZmZXIsIHJhbmRvbVBpdGNoVmFyID0gMCkge1xuICAgIGNvbnN0IHNyYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzcmMuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHNyYy5idWZmZXIgPSBidWZmZXI7XG4gICAgc3JjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG4gICAgc3JjLnBsYXliYWNrUmF0ZS52YWx1ZSA9IGNlbnRUb0xpbmVhcigoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSAqIHJhbmRvbVBpdGNoVmFyKTtcbiAgfVxufVxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXJFeHBlcmllbmNlO1xuIl19
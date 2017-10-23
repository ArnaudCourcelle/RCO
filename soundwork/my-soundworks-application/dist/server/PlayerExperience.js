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

var _server = require('soundworks/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// server-side 'player' experience.
var PlayerExperience = function (_Experience) {
  (0, _inherits3.default)(PlayerExperience, _Experience);

  function PlayerExperience(clientType) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this, clientType));

    _this.checkin = _this.require('checkin');
    _this.sharedConfig = _this.require('shared-config');
    _this.audioBufferManager = _this.require('audio-buffer-manager');

    return _this;
  }

  // if anything needs to append when the experience starts


  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {}

    // if anything needs to happen when a client enters the performance (*i.e.*
    // starts the experience on the client side), write it in the `enter` method

  }, {
    key: 'enter',
    value: function enter(client) {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'enter', this).call(this, client);
      // send a 'hello' message to all the other clients of the same type
      this.broadcast(client.type, client, 'hello');
      //  this.receive(client,'testMSG',() => this.broadcast(client.type, client, 'testMSG'));

      this.receive(client, 'red', function () {
        _this2.broadcast(client.type, client, 'red');
      });
      this.receive(client, client + ':yellow', function () {
        return _this2.broadcast(client.type, client, 'yellow');
      });
      this.receive(client, client + ':black', function () {
        return _this2.broadcast(client.type, client, 'black');
      });

      //   this.receive(client,'testabc',() =>  this.broadcast(client.type, client, 'goodbye'));

    }
  }, {
    key: 'exit',
    value: function exit(client) {
      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'exit', this).call(this, client);
      // send a 'goodbye' message to all the other clients of the same type
      this.broadcast(client.type, client, 'goodbye');
    }
  }]);
  return PlayerExperience;
}(_server.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsiUGxheWVyRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJjaGVja2luIiwicmVxdWlyZSIsInNoYXJlZENvbmZpZyIsImF1ZGlvQnVmZmVyTWFuYWdlciIsImNsaWVudCIsImJyb2FkY2FzdCIsInR5cGUiLCJyZWNlaXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUdBO0lBQ3FCQSxnQjs7O0FBSWpCLDRCQUFZQyxVQUFaLEVBQXdCO0FBQUE7O0FBQUEsMEpBRWxCQSxVQUZrQjs7QUFHdEIsVUFBS0MsT0FBTCxHQUFlLE1BQUtDLE9BQUwsQ0FBYSxTQUFiLENBQWY7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtELE9BQUwsQ0FBYSxlQUFiLENBQXBCO0FBQ0EsVUFBS0Usa0JBQUwsR0FBMEIsTUFBS0YsT0FBTCxDQUFhLHNCQUFiLENBQTFCOztBQUxzQjtBQU96Qjs7QUFPQzs7Ozs7NEJBQ0ssQ0FDTjs7QUFFRDtBQUNBOzs7OzBCQUNNRyxNLEVBQVE7QUFBQTs7QUFDWixzSkFBWUEsTUFBWjtBQUNNO0FBQ0wsV0FBS0MsU0FBTCxDQUFlRCxPQUFPRSxJQUF0QixFQUE0QkYsTUFBNUIsRUFBb0MsT0FBcEM7QUFDRDs7QUFFRSxXQUFLRyxPQUFMLENBQWFILE1BQWIsRUFBb0IsS0FBcEIsRUFBMEIsWUFBSztBQUMzQixlQUFLQyxTQUFMLENBQWVELE9BQU9FLElBQXRCLEVBQTRCRixNQUE1QixFQUFvQyxLQUFwQztBQUNILE9BRkQ7QUFHQSxXQUFLRyxPQUFMLENBQWFILE1BQWIsRUFBb0JBLFNBQVEsU0FBNUIsRUFBc0M7QUFBQSxlQUFNLE9BQUtDLFNBQUwsQ0FBZUQsT0FBT0UsSUFBdEIsRUFBNEJGLE1BQTVCLEVBQW9DLFFBQXBDLENBQU47QUFBQSxPQUF0QztBQUNBLFdBQUtHLE9BQUwsQ0FBYUgsTUFBYixFQUFvQkEsU0FBUSxRQUE1QixFQUFxQztBQUFBLGVBQU0sT0FBS0MsU0FBTCxDQUFlRCxPQUFPRSxJQUF0QixFQUE0QkYsTUFBNUIsRUFBb0MsT0FBcEMsQ0FBTjtBQUFBLE9BQXJDOztBQUVIOztBQU9BOzs7eUJBRUlBLE0sRUFBUTtBQUNYLHFKQUFXQSxNQUFYO0FBQ0E7QUFDQSxXQUFLQyxTQUFMLENBQWVELE9BQU9FLElBQXRCLEVBQTRCRixNQUE1QixFQUFvQyxTQUFwQztBQUNEOzs7OztrQkFqRGtCTixnQiIsImZpbGUiOiJQbGF5ZXJFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXhwZXJpZW5jZSB9IGZyb20gJ3NvdW5kd29ya3Mvc2VydmVyJztcblxuXG4vLyBzZXJ2ZXItc2lkZSAncGxheWVyJyBleHBlcmllbmNlLlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyRXhwZXJpZW5jZSBleHRlbmRzIEV4cGVyaWVuY2Uge1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKGNsaWVudFR5cGUpIHtcblxuICAgIHN1cGVyKGNsaWVudFR5cGUpO1xuICAgICAgdGhpcy5jaGVja2luID0gdGhpcy5yZXF1aXJlKCdjaGVja2luJyk7XG4gICAgICB0aGlzLnNoYXJlZENvbmZpZyA9IHRoaXMucmVxdWlyZSgnc2hhcmVkLWNvbmZpZycpO1xuICAgICAgdGhpcy5hdWRpb0J1ZmZlck1hbmFnZXIgPSB0aGlzLnJlcXVpcmUoJ2F1ZGlvLWJ1ZmZlci1tYW5hZ2VyJyk7XG5cbiAgfVxuXG5cblxuXG5cblxuICAgIC8vIGlmIGFueXRoaW5nIG5lZWRzIHRvIGFwcGVuZCB3aGVuIHRoZSBleHBlcmllbmNlIHN0YXJ0c1xuICBzdGFydCgpe1xuICB9XG5cbiAgLy8gaWYgYW55dGhpbmcgbmVlZHMgdG8gaGFwcGVuIHdoZW4gYSBjbGllbnQgZW50ZXJzIHRoZSBwZXJmb3JtYW5jZSAoKmkuZS4qXG4gIC8vIHN0YXJ0cyB0aGUgZXhwZXJpZW5jZSBvbiB0aGUgY2xpZW50IHNpZGUpLCB3cml0ZSBpdCBpbiB0aGUgYGVudGVyYCBtZXRob2RcbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcbiAgICAgICAgICAvLyBzZW5kIGEgJ2hlbGxvJyBtZXNzYWdlIHRvIGFsbCB0aGUgb3RoZXIgY2xpZW50cyBvZiB0aGUgc2FtZSB0eXBlXG4gICAgIHRoaXMuYnJvYWRjYXN0KGNsaWVudC50eXBlLCBjbGllbnQsICdoZWxsbycpO1xuICAgIC8vICB0aGlzLnJlY2VpdmUoY2xpZW50LCd0ZXN0TVNHJywoKSA9PiB0aGlzLmJyb2FkY2FzdChjbGllbnQudHlwZSwgY2xpZW50LCAndGVzdE1TRycpKTtcblxuICAgICAgdGhpcy5yZWNlaXZlKGNsaWVudCwncmVkJywoKSA9PntcbiAgICAgICAgICB0aGlzLmJyb2FkY2FzdChjbGllbnQudHlwZSwgY2xpZW50LCAncmVkJylcbiAgICAgIH0pO1xuICAgICAgdGhpcy5yZWNlaXZlKGNsaWVudCxjbGllbnQgKyc6eWVsbG93JywoKSA9PiB0aGlzLmJyb2FkY2FzdChjbGllbnQudHlwZSwgY2xpZW50LCAneWVsbG93JykpO1xuICAgICAgdGhpcy5yZWNlaXZlKGNsaWVudCxjbGllbnQgKyc6YmxhY2snLCgpID0+IHRoaXMuYnJvYWRjYXN0KGNsaWVudC50eXBlLCBjbGllbnQsICdibGFjaycpKTtcblxuICAgLy8gICB0aGlzLnJlY2VpdmUoY2xpZW50LCd0ZXN0YWJjJywoKSA9PiAgdGhpcy5icm9hZGNhc3QoY2xpZW50LnR5cGUsIGNsaWVudCwgJ2dvb2RieWUnKSk7XG5cblxuXG5cblxuXG4gIH1cblxuICBleGl0KGNsaWVudCkge1xuICAgIHN1cGVyLmV4aXQoY2xpZW50KTtcbiAgICAvLyBzZW5kIGEgJ2dvb2RieWUnIG1lc3NhZ2UgdG8gYWxsIHRoZSBvdGhlciBjbGllbnRzIG9mIHRoZSBzYW1lIHR5cGVcbiAgICB0aGlzLmJyb2FkY2FzdChjbGllbnQudHlwZSwgY2xpZW50LCAnZ29vZGJ5ZScpO1xuICB9XG5cbn1cbiJdfQ==
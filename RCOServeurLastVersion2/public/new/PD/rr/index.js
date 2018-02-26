var osc=require('node-osc');
var Redis = require('ioredis');

var oscServer=new osc.Server(9001,'localhost');
var pub = new Redis();

oscServer.on('message', function(m, rinfo) {
  //console.log(m.slice(0,m.length).join(' '));
  //console.log("h");
  if(m[0]==="/pub"){
  pub.publish(m[1], m.slice(2,m.length).join(' '));
}
  //pub.publish('music', 'Hello again!');
});
var redis = new Redis({
  port: 6379,          // Redis port
  host: '127.0.0.1',   // Redis host
  //family: 4,           // 4 (IPv4) or 6 (IPv6)
  //password: 'auth',
  //db: 0, 
	reconnectOnError: function (err) {
    var targetError = 'READONLY';
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true; // or `return 1;`
    }
  }
})

redis.set('foo', 'bar');
redis.get('foo', function (err, result) {
  console.log(result);
});

// Or using a promise if the last argument isn't a function
redis.get('foo').then(function (result) {
  console.log(result);
});

// Argments to commands are flattened, so the following are the same:
redis.sadd('set', 1, 3, 5, 7);
redis.sadd('set', [1, 3, 5, 7]);

// All arguments are passed directly to the redis server:
redis.set('key', 100, 'EX', 10);


redis.subscribe('oscR',  function (err, count) {
  // Now we are subscribed to both the 'news' and 'music' channels.
  // `count` represents the number of channels we are currently subscribed to.

 
});

redis.on('message', function (channel, message) {
  
  console.log( channel,message);
});


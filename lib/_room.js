function vanity(r){
	socket.emit('nx',r);
}
var Fab=0;
var Mar=0;

var voteSeq=[1,1,1,1,1,1,1];
function pc(i,r){
	voteSeq[i]=parseInt(r);
}
//avarice
			var shakeEvent = new Shake({threshold: 10,timeout: 100});
			function funcshake(){socket.emit('nx','1');
				var me = getId('main');

				window.navigator.vibrate(50);

    			me.style.webkitAnimation = 'none';
    			setTimeout(function() {
    			    me.style.webkitAnimation = '';
    			}, 10);
    		}
				

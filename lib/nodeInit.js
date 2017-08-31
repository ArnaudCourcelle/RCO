/////////////////////obsolete+++++++




$(window).resize(function(){ //need jquery!
if (nx.isTouchDevice) {
	var allcanvi = document.getElementsByTagName("canvas");
	for (i=0;i<allcanvi.length;i++){
		nx.colorize("#ACACAC");
	nx.colorize("fill", "#444");
	nx.colorize("border", "#444");
	nx.colorize("black", "#eee");

	nx.transform(allcanvi[i]);

		}
	}
});


 function initNx(){
 nx.colorize("#ACACAC");
	nx.colorize("fill", "#444");
	nx.colorize("border", "#444");
	nx.colorize("black", "#eee");

}

var _nodeDate=Date.now();
nx.onload = function() {
	//nx.setThrottlePeriod(100);
	nx.colorize("#ACACAC");
	nx.colorize("fill", "#444");
	nx.colorize("border", "#444");
	nx.colorize("black", "#eee");

}

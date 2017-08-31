var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
function getStyle(oElm, css3Prop){
	var strValue = ""; 
  	if(window.getComputedStyle){
    	strValue = getComputedStyle(oElm).getPropertyValue(css3Prop);
        }
  	else if (oElm.currentStyle){
    	try{
			strValue = oElm.currentStyle[css3Prop];
    	}catch(e){}
    }
    return strValue;
}

 
function drawCercle(id,radius,color){
	var id2 = document.getElementById(id).parentElement;
	var width = parseInt(getStyle(id2,'width'), 10);
	var height = parseInt(getStyle(id2,'height'), 10);
	var canvas = document.getElementById(id);
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');  
	var rect = canvas.getBoundingClientRect();
	var X=document.getElementById(id).getAttribute("X")*canvas.width;
	var Y=document.getElementById(id).getAttribute("Y")*canvas.height;
	var Xmax=canvas.width>canvas.height?canvas.height:canvas.width;
	X=X<radius*Xmax?radius*Xmax:X; ///test les bords
	X=X>canvas.width-radius*Xmax?canvas.width-radius*Xmax:X;
	Y=Y<radius*Xmax?radius*Xmax:Y;
	Y=Y>canvas.height-radius*Xmax?canvas.height-radius*Xmax:Y;
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.lineTo(0,Y);
	context.lineTo(canvas.width,Y);
	context.stroke();
	context.closePath();
	context.beginPath();
	context.lineTo(X,0);
	context.lineTo(X,canvas.height);
	context.stroke();
	context.closePath();
	context.beginPath();
	context.arc(X, Y, radius*Xmax, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}
function circle(id,color){
	//console.log(color);
	var id2 = document.getElementById(id).parentElement;
	var width = parseInt(getStyle(id2,'width'), 10);
	var height = parseInt(getStyle(id2,'height'), 10);
	var canvas = document.getElementById(id);
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext('2d');  
	var rect = canvas.getBoundingClientRect();
	var X=canvas.width;
	var Y=canvas.height;
	var Xmax=100;
	if(canvas.width>canvas.height){Xmax=canvas.height;}
	else {Xmax=canvas.width;}
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.arc(X/2, Y/2, Xmax/2, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();
}
function start(){
if(draw){
drawCercle('cpos',0.1,"#444");
}
requestAnimationFrame(start);
}
/*function start2(id){
if(draw){
drawCercle(id,0.1,"#444");
}
requestAnimationFrame(start2);
}*/

function attrib(id){
getId(id).addEventListener('touchmove', function(e) {
	var id2 = document.getElementById(id).parentElement;
	var width = parseInt(getStyle(id2,'width'), 10);
	var height = parseInt(getStyle(id2,'height'), 10);
	var canvas = document.getElementById(id);
	canvas.width = width;
	canvas.height = height;
    var rect = getId(id).getBoundingClientRect();
	document.getElementById(id).setAttribute("X",Math.round(((e.touches[0].clientX - rect.left)/rect.width)*10000)/10000);
	document.getElementById(id).setAttribute("Y",Math.round(((e.touches[0].clientY -rect.top)/rect.height)*10000)/10000);
});
}
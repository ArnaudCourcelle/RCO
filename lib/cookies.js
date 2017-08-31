
var user="";
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
 


    user=getCookie("username");
    if (user != "") {
        socket.emit('user', user);
        alert("Welcome " + user);
    } else {
            getId("popup2").style.height="100%";
            openDiv("popup2","divs/cookieForm.html");
        
       //user = prompt("Please enter your name:","");
       
    }
}
function submitCookie(){
     user =  $('#_submitCookie').val();
    
    if (user != "" && user != null) {
           setCookie("username", user, 30);
           socket.emit('user', user);
           //console.log(user);
           openDiv("popup2","divs/presonalize.html")
       }

}
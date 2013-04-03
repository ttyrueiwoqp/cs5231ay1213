

console.log("inside inject.js");
function encodeStringOnce(str)
{
    while(str !== decodeURI(str)) {
        str = decodeURI(str);
    }
    return encodeURI(str);
}
console.log(document.location);

var unUrl = document.URL;
document .__defineGetter__("URL", function() {
    console.log("Get url" +encodeURI(unUrl));
    return encodeStringOnce(unUrl);  
});

var urlUnencoded = document.URLUnencoded;
document .__defineGetter__("URLUnencoded", function() {
    return encodeStringOnce(urlUnencoded);  
});

var loc = document.location;
var locHash = document.location.hash;
document .__defineGetter__("location", function() {
    console.log("Get location " +encodeStringOnce(loc));
    loc.hash = encodeStringOnce(locHash);
    return loc;  
});

var refe = document.referrer;
document .__defineGetter__("referrer", function() {
    return encodeStringOnce(refe);  
});

console.log("inject.js end");
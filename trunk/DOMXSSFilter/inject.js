console.log("inside inject.js");

function encodeStringOnce(str)
{
    while(str !== decodeURI(str)) {
        str = decodeURI(str);
    }
    return encodeURI(str);
}
console.log(document.location);

var __url = document.URL;
document.__defineGetter__("URL", function() {
    console.log("Get url: " + encodeURI(__url));
    return encodeStringOnce(__url);  
});

var __urlUnencoded = document.URLUnencoded;
document.__defineGetter__("URLUnencoded", function() {
    return encodeStringOnce(__urlUnencoded);  
});

var __loc = document.location;
document.__defineGetter__("location", function() {
    console.log("Get location: " + encodeStringOnce(__loc));
    __loc.hash = encodeStringOnce(__loc.hash);
    return __loc;
});

var __refe = document.referrer;
document.__defineGetter__("referrer", function() {
    return encodeStringOnce(__refe);  
});

// Protect window.location as well
window.location.hash = encodeStringOnce(window.location.hash);

console.log("inject.js end");
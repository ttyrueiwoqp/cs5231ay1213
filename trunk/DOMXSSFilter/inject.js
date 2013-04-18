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

var __name = window.name;
window.__defineGetter__("name", function() {
    return encodeStringOnce(__name);  
});

// Protect window.location as well
window.location.hash = encodeStringOnce(window.location.hash);
var __wloc_hash = window.location.hash;
window.location.__defineGetter__("hash", function() {
    return encodeStringOnce(__wloc_hash);  
});

Object.defineProperty(document, "referrer", {configurable: false});
Object.defineProperty(document, "URL", {configurable: false});
Object.defineProperty(document, "location", {configurable: false});
Object.defineProperty(document.location, "hash", {configurable: false});
Object.defineProperty(window, "name", {configurable: false});
Object.defineProperty(window.location, "hash", {configurable: false});

console.log("document.referrer: ", Object.getOwnPropertyDescriptor(document, "referrer"));
console.log("document.URL: ", Object.getOwnPropertyDescriptor(document, "URL"));
console.log("document.location: ", Object.getOwnPropertyDescriptor(document, "location"));
console.log("document.location.hash: ", Object.getOwnPropertyDescriptor(document.location, "hash"));
console.log("window.name: ", Object.getOwnPropertyDescriptor(window, "name"));
console.log("window.location.hash: ", Object.getOwnPropertyDescriptor(window.location, "hash"));

console.log("inject.js end");
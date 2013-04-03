var s = document.createElement("script");
//s.type = "application/javascript";
s.src = chrome.extension.getURL("inject.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);
console.log("Injection finished");
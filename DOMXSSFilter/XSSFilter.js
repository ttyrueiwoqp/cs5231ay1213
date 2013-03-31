// Force encodeURI

// chrome.webRequest.onBeforeRequest.addListener (
    // function(details) {
        // var url = details.url;
        // /*
        // if( url.indexOf("bing")!= -1) {
            // return {redirectUrl: "http://www.google.com"}; 
        // }
        // */
        // /*
        // var newUrl = url.replace(/<script>.*<\/script>/g, "");
        // console.log("before replace: ", url);
        // console.log("after replace: ", newUrl);
        // return {redirectUrl: newUrl};
        // */
        
        // console.log("onBeforeRequest");
        
        // while(url !== decodeURI(url)) {
            // url = decodeURI(url);
        // }
        
        // return {redirectUrl: encodeURI(url)};
    // },
    // {urls: ["<all_urls>"]}, 
    // ["blocking"]);

// Remove all referer information
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Referer') {
                details.requestHeaders.splice(i, 1);
                break;
            }
        }
        return {requestHeaders: details.requestHeaders};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]);

 chrome.webRequest.onCompleted.addListener(
    function(details) {
        //alert("Too late, sorry!");
        console.log("Too late, sorry!");
    },
    {urls: ["<all_urls>"]},
    []); 
/*
 chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        console.log("onRequestFinished");
        console.log(request.getContent());
    });
*/
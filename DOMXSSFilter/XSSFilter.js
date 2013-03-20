// Force encodeURI
chrome.webRequest.onBeforeRequest.addListener (
    function(details) {
        var url = details.url;
        /*
        if( url.indexOf("bing")!= -1) {
            return {redirectUrl: "http://www.google.com"}; 
        }
        */
        /*
        var newUrl = url.replace(/<script>.*<\/script>/g, "");
        console.log("before replace: ", url);
        console.log("after replace: ", newUrl);
        return {redirectUrl: newUrl};
        */
        
        return {redirectUrl: encodeURI(details.url)};
    },
    {urls: ["<all_urls>"]}, 
    ["blocking"]);

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
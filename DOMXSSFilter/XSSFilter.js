chrome.webRequest.onBeforeRequest.addListener (
    function(details) {
        var url = details.url;
        if( url.indexOf("bing")!= -1) {
            return {redirectUrl: "http://www.google.com"}; 
        }

        var newUrl = url.replace(/<script>.*<\/script>/g, "");
        console.log("before replace: ", url);
        console.log("after replace: ", newUrl);
        return {redirectUrl: newUrl};
    },
    {
        urls: ["<all_urls>"]
    }, 
    // extraInfoSpec
    ["blocking"]);
chrome.webRequest.onBeforeRequest.addListener (

          function(details) {

                   var url = details.url;
                  
                   if( url.indexOf("bing")!= -1) {
                          return {redirectUrl: "http://www.google.com"}; 
                          
                   } 
                   return true;
           },
          {urls:["<all_urls>"]}, 
    // extraInfoSpec
  ["blocking"]);
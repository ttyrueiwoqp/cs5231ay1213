The folder 'DOMXSSFilter' contains the Google Chrome extension we build, and the folder 'test' contains the web pages we use for testing.

To examine the functionality of our extension, please disable the XSSAuditor in Chrome first. A quick way to do it is to create a desktop shortcut of Chrome, then right click > properties > Shortcut > Target, add the following:

{PATHNAME}\chrome.exe --args --disable-xss-auditor

Afterwards, open Chrome through the shortcut, and enter the following in address bar:

chrome://extensions

Check 'Developer mode'. Click on 'Load unpacked extension', select the folder DOMXSSFilter and click on 'OK'. Now the extension is installed.

A web server, e.g. apache, is needed to host the web pages in 'test' folder, else the extension will not work.

Please refer to the section 'Tests and Results' in the report for more details.
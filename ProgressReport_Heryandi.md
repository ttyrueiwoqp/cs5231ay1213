## DOM-based XSS ##
### Definition ###
The main difference of DOM-based XSS compared to other XSS vulnerabilities such as reflected and stored XSS is that DOM-based XSS attack doesn't have to send any data at all towards the server. The attack happens entirely within the browser as opposed to be dependent on the response from the server.

One prerequisite for DOM-based XSS is that the HTML page uses data from document.location or document.URL or document.referrer without sanitizing it first. This prerequisite, however, may be violated as the attackers get more creative.

### Example ###
We can easily craft a very simple HTML page with DOM-based XSS vulnerability as follows:
```
<html><head><title>Test Page</title></head>
  <body>
    <script>
      document.write("Site is at: " + document.location.href + ".");
    </script>
  </body>
</html>
```
If this page is hosted on:
```
http://localhost/xss.html
```

Then we can simply open the page with the following url:
```
http://localhost/xss.html#<script>alert('xss')</script>
```
to launch the attack.
Since the vulnerability is injected through the fragment part of the URL, it happens entirely inside the browser.

## Browser Selection ##
We have chosen to implement our own plugin on Google Chrome browser. The reason for choosing this browser is because we are able to temporarily disable Google Chrome's anti-XSS protection (XSSAuditor) by using the command:
```
chrome.exe --args --disable-xss-auditor 
```

This is a very important feature to test our plugin. If the XSSAuditor is enabled, we will not know which of XSSAuditor and our plugin is responsible for blocking the script.

Disabling anti-XSS protection is, as far as we know, not possible in Mozilla Firefox.

## Other filters (not overlapping with Zhaoyu's part, maybe can merge) ##
### Firefox NoScript and Chrome NotScripts ###
We have also taken a look at plugins which, by default, block all scripts from executing until they are specifically enabled by the user. With these plugins, users will have to add the Javascript which is allowed to be executed one-by-one to the whitelist. The granularity of each entry in the whitelist is the domain name of the servers hosting the Javascript scripts.

While this may initially sound like a good idea for security, this causes a lot of trouble to users to add the scripts from their favorite websites to the whitelist one-by-one. However, other than that, there are several problems with this approach:
  * A script which is known to users doesn't necessarily mean the script can be safely executed in all cases.
  * A script which is safe to execute today may not be necessarily safe again tomorrow.
  * Because of the granularity of the whitelist entry, if a user want to enable only one certain script from a domain name, the user will accidentally enable all scripts from the same domain name. Out of the many scripts hosted on the same domain, several scripts may not be safe to execute.

## References (merge together later) ##

http://www.webappsec.org/projects/articles/071105.html

https://www.owasp.org/index.php/DOM_Based_XSS

http://www.frameloss.org/2011/11/01/using-google-chrome-for-security-testing/

http://noscript.net/

http://optimalcycling.com/other-projects/notscripts/
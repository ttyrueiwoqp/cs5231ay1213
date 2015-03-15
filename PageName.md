# Introduction #

DOM based XSS: https://www.owasp.org/index.php/DOM_Based_XSS (this one looks important)

DOM based XSS prevention: https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet
(May not be relevant as it is about web application development. -FJ)

DOM XSS Wiki: http://code.google.com/p/domxsswiki/

XSS auditor paper: http://www.adambarth.com/papers/2010/bates-barth-jackson.pdf

Disabling XSSAuditor in GChrome: http://www.frameloss.org/2011/11/01/using-google-chrome-for-security-testing/

DIsabling XSS filter in IE8:
https://jobs.missouri.edu/howtos/DisableIE8XSS.pdf

XSS Attacks, Cross Site Scripting Exploits and Defense: DOM-based XSS is discussed in real page 75-86, ebook page 91-102.

A tutorial on how to implement a filter: http://www.trailofbits.com/resources/blackbox_reversing_of_xss_filters_slides.pdf

More: http://www.acunetix.com/blog/web-security-zone/dom-xss/

# XSSAuditor source code #

http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/html/parser/

http://code.google.com/p/webkit-mirror/source/browse/Source/WebCore/html/parser/XSSAuditor.cpp?name=master

http://www.opensource.apple.com/source/WebCore/WebCore-7536.26.14/html/parser/XSSAuditor.cpp

# Other filters #
a java filter: http://www.servletsuite.com/servlets/xssflt.htm

another java filter source: http://java.dzone.com/articles/stronger-anti-cross-site

# Some Insights #
Chrome **XSSAuditor**: Highly integrated into Chrome, our project may not have such a capability.

Chrome **NotScripts**: May block all scripts, can try to explore.

Firefox **noXSS**: Has stopped updating since 2008, no source code available.

IE **IE8 Filter**: A joke.

Intercept web request: https://developer.chrome.com/extensions/webRequest.html

# Details #

Add your content here.  Format your content with:
  * Text in **bold** or _italic_
  * Headings, paragraphs, and lists
  * Automatic links to other wiki pages

## zhaoyu's part ##
Study form other filters:

In order to design and implement our own filter, some basic knowledge need to be obtained from the current implementations. We find several implementations, such as noXSS, IE8 Filter and XSSAuditor. However, noXSS Has stopped updating since 2008 and there are  no source code available; IE8 Filter never published any useful information. Only XSSAuditor is still updating and it’s built into the Chrome browser. Finally, we decided to focus on XSSAuditor.

XSSAuditor is a filter which is highly integrated into Chrome. The XSSAuditor is in the pipeline of displaying a web page in Chrome. After receive a webpage from the server, Chrome start to parse the web page information, and construct a structure of the web page. When the parsing is finish by the browser, XSSAuditor jumps in and try to find out whether there are some xss attack in the webpage or not. Then the last step is Chrome continues with the rendering process. We can see XSSAuditor use the pipeline of the chrome browser, unlike other filters such as noXSS which need a separate parser to parse the page first.

The advantages are:
The filter use the data parsed by the browser itself, so there are no inconsistent between the page seen by the filter and the page seen by the browser. The two parties can always synchronize.
The parser of the filter will slow down the rendering process, because the web pages are parsed twice: the first time is by the parser from the filter, the second time is by the parser from the browser itself.

More importantly,  we also learn some detail implementations from XSSAuditor and other filters.

Firstly, 

&lt;base&gt;

 element is very dangerous. By injecting a 

&lt;base&gt;

 element (or altering the href attribute of an existing 

&lt;base&gt;

), an attacker can cause the browser to external scripts from the attacker's server if the script are designated with relative URLs. The attacker only need to do one attack to change the base url, then the user will simply go to another website(attacker’s website). So the filter should block the request which has a base URL information in it.

Secondly, before the filter tries to find the xss script from the web page, the web page information need to be decode.(e.g. replace %41 with A; replace &amp; with &) Otherwise, the attacker may use the encoding mechanism to bypass the filter. For example, an attacker can bypass the IE8 filter by encoding the injected content in the UTF-7 character set, which is not decoded by the IE8 filter regular expressions.

Thirdly, we can not just simply match the block 

&lt;script&gt;

...

&lt;/script&gt;

. Because the attacker may not need the </script > tag to do the attack. The example is:
In the original website, the code looks like:
<?php echo $_GET["q"]; ?>_

&lt;script&gt;


/**.....**/…...


&lt;/script&gt;


If the attacker injects code

&lt;script&gt;

xssattack  /**into the page, the page will become:**

&lt;script&gt;

xssattack
/**.....**/
…...


&lt;/script&gt;


In this case, the code block

&lt;script&gt;

.../**can attack already.
Instead of attempting to find the entire script in the request, we can try to find some patterns. We can learn some patterns from other filters, such as : "**

&lt;script&gt;

(.**?)

&lt;/script&gt;

"; "src[\r\n]**=[\r\n]**\\\'(.**?)\\\'"; “Document.”, etc.
After these patterns are found in request, the request need to blocked.

Fourthly, if the string or a substring of a string is in both the request and the response.This request normally contains a reflective xss attack and the filter need to block it.  such as, in the request, the attacker send: http://localhost/page.html?default=

&lt;script&gt;

alert(document.cookie)

&lt;/script&gt;




&lt;script&gt;

alert(document.cookie)

&lt;/script&gt;

 will be also inside the response from the server.

Fifthly, the filter should apply to the DOM tree created by the parser, because if we apply the filter to the bytes that comprise the response, it may not be as clear as we exam the DOM tree. DOM tree is more structured, and the information in the DOM tree are more accurate. For example,  the web page uses document.write(), exam the bytes may not find the xss attack, however, exam the DOM tree will get it.
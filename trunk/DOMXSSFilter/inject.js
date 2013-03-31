

console.log("inside inject.js");

console.log(document.location);
	var unUrl = document.URL;
	document .__defineGetter__("URL", function() {
	console.log("Get url" +encodeURI(unUrl));
	
		return encodeURI(unUrl);  
	});

	
	var urlUnencoded = document.URLUnencoded;
	document .__defineGetter__("URLUnencoded", function() {
		return encodeURI(urlUnencoded);  
	});

	
	var loc = document.location;
	var locHash = document.location.hash;
	document .__defineGetter__("location", function() {
	console.log("Get location " +encodeURI(loc));
		loc.hash = encodeURI(locHash);
		return loc;  
	});
	

	
	var refe = document.referer;
	document .__defineGetter__("referer", function() {
		return encodeURI(refe);  
	});

	
	console.log("end");
	function test(){
	alert('try');
	};
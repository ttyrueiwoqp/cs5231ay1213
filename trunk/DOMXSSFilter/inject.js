

console.log("inside inject.js");
var aaa = document.createElement("div");
aaa.innerHTML = "qqq";
console.log(document.URL);
console.log('fhyhh' +document.location);
//document.body.insertBefore(aaa, document.body.firstChild);
//document.body.innerHTML = "ASDSADASD";
	var unUrl = document.URL;
	document .__defineGetter__("URL", function() {
	console.log("shitttfangjian" +encodeURI(unUrl));
	
		return encodeURI(unUrl);  
	});

	
	var urlUnencoded = document.URLUnencoded;
	document .__defineGetter__("URLUnencoded", function() {
		return encodeURI(urlUnencoded);  
	});

	
	var loc = document.location;
	var locHash = document.location.hash;
	document .__defineGetter__("location", function() {
	console.log("shittttt" +encodeURI(loc));
		loc.hash = encodeURI(locHash);
		return loc;  
	});
	

	
	var refe = document.referer;
	document .__defineGetter__("referer", function() {
		return encodeURI(refe);  
	});


	console.log("end");
	function test()
	{
	 alert("aaaa");
	 }
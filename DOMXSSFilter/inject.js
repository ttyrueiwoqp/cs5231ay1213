

console.log("inside inject.js");
var aaa = document.createElement("div");
aaa.innerHTML = "qqq";
console.log(document.URL);
console.log('fhyhh' +document.location);
//document.body.insertBefore(aaa, document.body.firstChild);
//document.body.innerHTML = "ASDSADASD";
	var s = document.URL;
	document .__defineGetter__("URL", function() {
	console.log("shittt" +encodeURI(s));
		return encodeURI(s);  
	});

	
	s = document.URLUnencoded;
	document .__defineGetter__("URLUnencoded", function() {
		return encodeURI(s);  
	});

	
	var ss = document.location;
	document .__defineGetter__("location", function() {
	console.log("shittttt" +encodeURI(ss));
		return encodeURI(ss);  
	});
	
	// s = document.location.href;
	// document.location .__defineGetter__("href", function() {
	// console.log("getter" +encodeURI(s));
		// return encodeURI(s);  
	// });
	
	s = document.referer;
	document .__defineGetter__("referer", function() {
		return encodeURI(s);  
	});


	console.log("end");
	function test()
	{
	 alert("aaaa");
	 }
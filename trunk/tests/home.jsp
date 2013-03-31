<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>


<html>
<head>
<title>Homes</title>
<link
	href="http://twitter.github.com/bootstrap/assets/css/bootstrap.css"
	rel="stylesheet">
<link
	href="http://twitter.github.com/bootstrap/assets/css/aaaaadkdjjbootstrap.css"
	rel="stylesheet">
<link
	href="http://twitter.github.com/bootstrap/assets/css/bootstrap-responsive.css"
	rel="stylesheet">
<link href="http://twitter.github.com/bootstrap/assets/css/docs.css"
	rel="stylesheet">
<link
	href="http://twitter.github.com/bootstrap/assets/js/google-code-prettify/prettify.css"
	rel="stylesheet">

</head>
<body>
	<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="navbar-inner">
			<div class="container">
				<button type="button" class="btn btn-navbar" data-toggle="collapse"
					data-target=".nav-collapse">
					<span class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="brand" href="/cs">CS5226</a>
				<div class="nav-collapse collapse">
					<ul class="nav">
						<li class="active"><a href="">Home</a></li>
						<li><a href="db">Data Base Detail Information</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</div>
	</div>

	<div class="container" id='sh'>
		<h1>Hello world!</h1>
		<script>
	
		document.write("Site is at: " + document.location + ".");
		</script>
		<P>The time on the server is ${serverTime}.</P>
		<p>${welcomeMessage}</p>
	</div>
</body>
</html>


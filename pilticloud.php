<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Pilti - My Pilti </title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="" />
	<meta name="author" content="http://webthemez.com" />
	<!-- css -->
	<link href="css/bootstrap.min.css" rel="stylesheet" />
	<link href="css/fancybox/jquery.fancybox.css" rel="stylesheet">
	<link href="css/jcarousel.css" rel="stylesheet" />
	<link href="css/flexslider.css" rel="stylesheet" />
	<link href="css/style.css" rel="stylesheet" />

	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	<style>
		a:hover,
		a:focus {
			text-decoration: none;
			outline: none;
		}

		.vertical-tab {
			display: table;
			border-radius: 15px;
		}

		.vertical-tab .nav-tabs {
			display: table-cell;
			width: 25%;
			min-width: 25%;
			border-radius: 15px;
		}

		.vertical-tab .nav-tabs li {
			float: none;
		}

		.vertical-tab .nav-tabs li a {
			color: #fff;
			background-color: #000;
			font-size: 12px;
			font-weight: 650;
			line-height: 18px;

			text-align: center;
			padding: 10px 10px;
			margin: 2px;
			border-radius: 10px;
			border: none;
			position: relative;
			z-index: 1;
			transition: all 0.3s ease 0s;

			line-height: 1em;
			letter-spacing: 0px;
		}


		.vertical-tab .nav-tabs li a:before,
		.vertical-tab .nav-tabs li a:after {
			content: '';
			height: 100%;
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: -1;
			transition: all 0.3s ease 0s;
		}

		.vertical-tab .nav-tabs li.active a {
			background-color: #5DA5E4;
			color: #fff !important;
			border: none;

		}

		.vertical-tab .nav-tabs li.active a:hover {
			background-color: #5DA5E4;
			color: #ffff !important;
		}

		.vertical-tab .nav-tabs li a:hover {
			background-color: #000;
			color: #5DA5E4 !important;
			border: none;
		}

		.vertical-tab .nav-tabs li a i {
			font-size: 14px;
			margin: 0 0 5px;
			display: block;
			transition: all 0.3s ease 0s;
		}

		.vertical-tab .nav-tabs li.active a i {
			background-color: #5DA5E4;
			color: #fff;
		}


		.vertical-tab .tab-content {
			color: #00639e;
			font-size: 14px;
			letter-spacing: 0.5px;
			line-height: 23px;
			padding: 15px 15px 10px;
			margin-top: 10px;
			display: table-cell;
		}

		.vertical-tab .tab-content h3 {
			font-size: 20px;
			font-weight: 600;

			margin: 0 0 4px;
		}

		@media only screen and (max-width: 479px) {
			.vertical-tab {
				padding: 0;
				margin: 0;
			}

			.vertical-tab .nav-tabs {
				width: 100%;
				display: block;
				margin: 0 0 4px;
			}

			.vertical-tab .nav-tabs li a {
				margin: 0 0 1px;
			}

			.vertical-tab .tab-content {
				font-size: 14px;
				margin-top: 0;
				display: block;
			}

			.vertical-tab .tab-content h3 {
				font-size: 18px;
			}
		}

		.frame-area {
			display: block;
			width: 100%;
			max-width: 1300px;
			max-height: 700px;
			height: 650px;
			border-radius: 10px;
			overflow: auto;
			border: #999999 0px solid;
			margin: 2px;
			padding: 0px;
		}
	</style>
</head>

<body>
	<div id="wrapper">

		<!-- start header -->
		<header>
			<div class="navbar navbar-default navbar-static-top">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="index.php"><img src="img/logo.png" alt="logo" /></a>
					</div>
					<div class="navbar-collapse collapse ">
						<ul class="nav navbar-nav">
							<li><a href="index.php">Home</a></li>
							<li><a href="about.php">About Us</a></li>
							<!-- <li><a href="services.php">Services</a></li> -->
							<li><a href="pricing.php">Pricing</a></li>
							<li><a href="contact.php">Contact</a></li>
							<li class="active"><a href="pilticloud.php">My Pilti</a></li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<!-- end header -->
		<!-- end divider -->
		<div class="row" style="padding:3px">
			<div class="col-lg-2">
				<div class="vertical-tab" role="tabpanel">
					<!-- Nav tabs -->
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation" class="active"><a href="#Section1" aria-controls="home" role="tab" data-toggle="tab"><i class="fa fa-cogs"></i> IoT Board</a></li>
						<li role="presentation"><a href="#Section5" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-desktop" aria-hidden="true"></i> WebTop</a></li>
						<li role="presentation"><a href="#Section5" aria-controls="profile" role="tab" data-toggle="tab"><i></i> </a></li>
						<li role="presentation"><a href="#Section5" aria-controls="profile" role="tab" data-toggle="tab"><i class="fa fa-external-link" aria-hidden="true"></i> ⬇  Pilti external links ⬇ </a></li>
						<li role="presentation"><a href="#" onclick="return theFunction('https://teams.microsoft.com/_#/');"><i class="fa fa-users"></i>Pilti Teams</a></li>
						<li role="presentation"><a href="#"
						 onclick="return theFunction('https://pilti.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=SD&selectedIssue=SD-165&assignee=608f9ac0c87b5500699b6ec3');"><i class=" fa fa-tasks" aria-hidden="true"></i>Jira Board</a></li>
						<li role="presentation"><a href="#" onclick="return theFunction('https://bitbucket.org/dashboard/overview');"><i class="fa fa-bitbucket" aria-hidden="true"></i>Code Repository</a></li>
					</ul>
				</div>
			</div>
			<div class="col-lg-10">
				<!-- Tab panes -->
				<div class="tab-content tabs">

					<div role="tabpanel" class="tab-pane fade in active" id="Section1">
						<iframe class="frame-area" height="650" width="1300px" src="https://pilti-tbcloud.ddns.net/home" style="border:3;"></iframe>
					</div>
					<div role="tabpanel" class="tab-pane fade" id="Section2">
						<!-- <iframe class="frame-area" height="650" width="1300px" src="https://teams.microsoft.com/_#/"
							style="border:3;"></iframe> -->
					</div>
					<div role="tabpanel" class="tab-pane fade" id="Section3">
						<!-- <iframe class="frame-area" height="650" width="1300px" src="https://pilti.atlassian.net/secure/RapidBoard.jspa?rapidView=1&projectKey=SD&selectedIssue=SD-165&assignee=608f9ac0c87b5500699b6ec3"
							style="border:3;"></iframe> -->
					</div>
					<div role="tabpanel" class="tab-pane fade" id="Section4">
						<!-- <iframe class="frame-area" height="650" width="1300px" src="https://bitbucket.org/dashboard/overview"
							style="border:3;"></iframe> -->
					</div>
					<div role="tabpanel" class="tab-pane fade" id="Section5">
						<iframe class="frame-area" height="650" width="1300px" src="http://178.128.173.86:3001" style="border:3;"></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

	<?php include_once 'footer.php'; ?>
	</div>

	<a class="scrollup fa fa-angle-up active" href="#" style="font-style: italic"></a>
	<!-- javascript
	  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery.js"></script>
	<script src="js/jquery.easing.1.3.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/jquery.fancybox.pack.js"></script>
	<script src="js/jquery.fancybox-media.js"></script>
	<script src="js/portfolio/jquery.quicksand.js"></script>
	<script src="js/portfolio/setting.js"></script>
	<script src="js/jquery.flexslider.js"></script>
	<script src="js/animate.js"></script>
	<script src="js/custom.js"></script>
	<script src="js/owl-carousel/owl.carousel.js"></script>
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous">
	</script>
	<script type="text/javascript">
		function theFunction(url) {
			if (confirm("This will open in new browser tab, press OK to continue ")) {
				window.open(url, '_blank').focus();
			}
		}
	</script>
</body>

</html>
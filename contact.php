<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Pilti - Contact </title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta name="description" content="" />
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

</head>

<body>
	<div id="wrapper">
		<!-- start header -->
		<header>
			<div class="navbar navbar-default navbar-static-top">
				<div class="container">
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse"
							data-target=".navbar-collapse">
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
							<li class="active"><a href="contact.php">Contact</a></li>
							<li><a href="pilticloud.php">My Pilti</a></li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<!-- end header -->
		</section>
		<section id="content">

			<div class="container">
				<div class="row">
					<div class="col-md-4">
						<div class="done">
							<div class="alert alert-success">
								<button type="button" class="close" data-dismiss="alert">×</button>
								Your message has been sent. Thank you!
							</div>
						</div>
						<div class="contact-form">

							<form method="post" class="contact">
								<div class="form-group has-feedback">
									<label for="name">Name*</label>
									<input type="text" class="form-control" name="name" placeholder="">
									<i class="fa fa-user form-control-feedback"></i>
								</div>
								<div class="form-group has-feedback">
									<label for="email">Email*</label>
									<input type="email" class="form-control" name="email" placeholder="" onblur="error()">
									<i class="fa fa-envelope form-control-feedback"></i>
									<p style="color:red" id="e1"></p>
								</div>
								<div class="form-group has-feedback">
									<label for="message">Message*</label>
									<textarea class="form-control" rows="6" name="comment" placeholder="" onblur="cError()"></textarea>
									<i class="fa fa-pencil form-control-feedback"></i>
								</div>
								<input type="submit" value="Submit" id="submit" class="submit btn btn-default"">
							</form>


						</div>
					</div>
					<div class="col-md-4" style="padding-left:40px">					
								<h4>Madurai, India</h4>
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2756666389405!2d78.11800701473246!3d9.91098347728015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c57845949ffd%3A0x79bd2c911bd095bf!2s78%2C%20S%20Veli%20St%2C%20South%20Gate%2C%20Panthadi%2C%20Tamil%20Nadu%20625001!5e0!3m2!1sen!2sin!4v1621471176791!5m2!1sen!2sin"
									height="420" style="border:0;border-radius:15px;" allowfullscreen=""
									loading="lazy"></iframe>
						</div>
						<div class="col-md-4">
							<h4>Dublin, Ireland</h4>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.632593787099!2d-6.271750283887086!3d53.34983277997977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670c29fcdd95ab%3A0x1de927b305ed43f6!2sSemple%20Court%2C%20Capel%20St%2C%20Rotunda%2C%20Dublin%201%2C%20Ireland!5e0!3m2!1sen!2sin!4v1622466857614!5m2!1sen!2sin"
								height="420" style="border:0;border-radius:15px;" allowfullscreen="" loading="lazy"></iframe>
						</div>
					</div>
				</div>

		</section>
		<?php include_once 'footer.php';?>
	</div><a class="scrollup fa fa-angle-up active" href="#" style="font-style: italic"></a>
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
	<script src="js/contact.js"></script>
	<script src="js/owl-carousel/owl.carousel.js"></script>
</body>

</html>
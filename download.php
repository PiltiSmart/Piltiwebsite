<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PiltiSmart - Download</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <!-- Existing site CSS -->
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/style.css" rel="stylesheet">

  <!-- ===== INLINE DOWNLOAD PAGE CSS ===== -->
  <style>
    .download-section {
      padding: 50px 0;
    }

    .download-title {
      text-align: center;
      margin-bottom: 40px;
    }

    .download-card {
      border: 1px solid #ddd;
      padding: 25px;
      border-radius: 15px;
      background: #fff;
      min-height: 280px;
      transition: all 0.3s ease;
    }

    .download-card:hover {
      box-shadow: 0 10px 30px rgba(0,0,0,0.12);
      transform: translateY(-5px);
    }

    .download-card h3 {
      margin-bottom: 10px;
      font-weight: 600;
    }

    .download-card p {
      color: #777;
      margin-bottom: 20px;
    }

    .download-card .btn {
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .download-card {
        margin-bottom: 25px;
      }
    }
  </style>
</head>

<body>
<div id="wrapper">

<!-- ================= HEADER (UNCHANGED) ================= -->
<header>
  <div class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse" type="button">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="index.php">
          <img src="img/logo-new1.png" alt="logo">
        </a>
      </div>

      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><a href="index.php">Home</a></li>
          <li><a href="about.php">About Us</a></li>
          <li><a href="services.php">Services</a></li>
          <li><a href="pricing.php">Pricing</a></li>
          <li><a href="contact.php">Contact</a></li>
          <li><a href="https://piltistore.com">PiltiStore</a></li>
          <li class="active"><a href="download.php">App Download</a></li>
          <li><a href="Mobile_Help.php">Mobile Help</a></li>
        </ul>
      </div>
    </div>
  </div>
</header>
<!-- ====================================================== -->

<!-- ================= DOWNLOAD CONTENT ================= -->
<section class="download-section">
  <div class="container">

    <div class="download-title">
      <h2>Download Smarty App</h2>
      <p>Select your operating system and architecture</p>
      <hr>
    </div>

<div class="row">

  <!-- WINDOWS -->
  <div class="col-md-3">
    <div class="download-card text-center">
      <h3>Windows</h3>
      <p>Intel/AMD</p>

      <a href="downloads/windows/SMARTY-WIN-x86.exe"
         class="btn btn-success btn-block">
        Windows (x86)
      </a>

 <!--    <a href="downloads/windows/SMARTY-WIN-ARM64.exe"
         class="btn btn-success btn-block">
        Windows (ARM64)
      </a> -->
    </div>

  </div>

  <!-- MAC -->
  <div class="col-md-3">
    <div class="download-card text-center">
      <h3>macOS</h3>
      <p>Intel & Apple Silicon</p>

      <a href="downloads/mac/SMARTY-MAC-INTEL.dmg"
         class="btn btn-success btn-block">
        macOS (Intel)
      </a>

      <a href="downloads/mac/SMARTY-MAC-SILICON.dmg"
         class="btn btn-success btn-block">
        macOS (Apple Silicon)
      </a>
    </div>
  </div>

  <!-- LINUX -->
  <div class="col-md-3">
    <div class="download-card text-center">
      <h3>Linux</h3>
      <p>Universal builds</p>
       <button class= "btn btn-success btn-block"> Coming Soon </button>
    <!-- <a href="downloads/linux/SMARTY-LINUX-x86.deb"
         class="btn btn-success btn-block">
        Linux (x86)
      </a>

      <a href="downloads/linux/SMARTY-LINUX-ARM64.deb"
         class="btn btn-success btn-block">
        Linux (ARM64)
      </a>-->
    </div>
  </div>

  <!-- MOBILE -->
  <div class="col-md-3">
    <div class="download-card text-center">
      <h3>Mobile App</h3>
      <p>Android</p>

      <a href="downloads/mobile/SMARTY-MOBILE.apk"

         class="btn btn-success btn-block">
        Android (Direct Download)
      </a>

     <a href="https://play.google.com/store/apps/details?id=in.pilti.smarty_app&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          class="d-block mt-2">
         <img
           src ="img/get_it_on_playstore.webp"
           alt="Get it on Google Play"
           style="width: 180px; max-width: 80%;"
         >
       </a>
    </div>
  </div>

</div>


    </div>
  </div>
</section>
<!-- ===================================================== -->

<?php include_once 'footer.php'; ?>

</div>

<!-- js -->
<script src="js/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>

</body>
</html>

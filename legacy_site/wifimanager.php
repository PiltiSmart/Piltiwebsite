<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <link rel="stylesheet" type="text/css" href="style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="" />
  <meta name="author" content="http://webthemez.com" />   
  <link href="css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/fancybox/jquery.fancybox.css" rel="stylesheet">
  <link href="css/jcarousel.css" rel="stylesheet" />
  <link href="css/flexslider.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
  <link href="style1.css" rel="stylesheet" />
      <header>
    <div class="navbar navbar-expand navbar-static-top">
              <div class="container">
                  <div class="navbar-header">
                      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                      </button>
                      <a class="navbar-brand" href="index.php"><img class="img-responsive" src="img/logo-new1.png" alt="ePlogo"/></a>
                  </div>
            <div class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li>
                  <a href="index.php">Home</a>
                </li>
                <li>
                  <a href="about.php">About Us</a>
                </li>
                <li><a href="services.php">Services</a></li>
                <!--<li><a href="product-new.php">Our Products</a></li>-->
         
                <li>
                  <a href="pricing.php">Pricing</a>
                </li>
                <li>
                  <a href="contact.php">Contact</a>
                </li>
                <li>
                <a href="login.php">Login</a>
              </li>
                <li>
                  <a href="Mobile_Help.php">Mobile Help</a>
                </li>
              </ul>
              </div>
              </div>
          </div>
    </header>

<body>
  <div class="content">
    <div class="card-grid">
      <div class="card">
        
          <p>
            <table align="center">
              <h1>PILTISMART WIFI DETAILS</h1>
          <tr>
           <td align="right"><label for="ssid">Wifi Name(SSID)</label></td>
           <td align="left"><input type="text" id ="ssid" name="ssid"></td><br>
          </tr>
          <tr>
            <td align="right"><label for="pass">Password</label></td>
            <td align="left"><input type="text" id ="pass" name="pass"></td><br>
          </tr>
          <tr>
            <td align="right"><label for="ip">IP Address</label></td>
              <td align="left"><input type="text" id ="ip" name="ip" value="192.168.4.1"><br></td>
          </tr>
          <tr>
            <td align="right"><label for="port">Port</label></td>
              <td align="left"><input type="text" id ="port" name="port" value="233"><br></td>
          </tr>
          <!-- 
          <tr>
            <td align="right"><label for="gateway">Gateway Address</label></td>
              <td align="left"><input type="text" id ="gateway" name="gateway" value="192.168.1.1"><br></td>
          </tr>-->
            </table>
              <input type="submit" value="Submit" onclick="submit()">
            


              <script type="text/javascript">
                  function submit() {
                    let ssid = document.getElementById("ssid").value
                    if(ssid == ""){
                    alert("SSID is Required");
                  }
                    let pass = document.getElementById("pass").value
                    if(pass == ""){
                    alert("PASSWORD is Required");
                    }
                    let ip = document.getElementById("ip").value
                    if(ip == ""){
                    alert("IP Address is Required");
                    }
                    let port = document.getElementById("port").value
                    if(port == ""){
                    alert("PORT is Required");
                    }
                    let url = "http://" + ip + ":" + port + "/updateWifiDetails" + "?SSID=" + ssid +"&PSSWD=" + pass
                    //let url = "http://" + ip + ":" + port + "/me"
                    alert(url);
                      var xhr = new XMLHttpRequest();
                      xhr.onreadystatechange = function () {
                          if (xhr.readyState === 4) {
                              alert(xhr.responseText);
                          }
                      }
                      xhr.open('get', url, true);
                      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                      xhr.send();
                  }
          
</script>
</p>
</div>
</div>
</div>
</head>
</body>
</html>

<?php include_once 'footer.php';?>

<a href="#" class="scrollup"><i class="fa fa-angle-up active"></i></a>
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



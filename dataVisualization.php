<?php
    require "header.php";
?>

<body>
    <div class="body_container">
        <div class="main">
            <nav class="navbar navbar-inverse">
                <div class="container-fluid nav_container">
                    <div class="navbar-header">
                        <a class="navbar-brand img_brand" href="http://satoyamafarm.com.my/" target="_blank"></a>
                    </div>
    
                    <ul class="nav navbar-nav my_nav">
                        <li><a href="index.php">Home</li></a></li>
                        <li><a href="sensors.php">Sensors</a></li>
                        <li class="active"><a href="dataVisualization.php">Data Visualization</a></li>
                    </ul>
    
                    <ul class="nav navbar-nav navbar-right my_nav">
                        <li><a href="signup.php">SignUp</a></li>
                        <li class="logout_btn"><a href="login.php">Logout</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>

<?php
    require "footer.php";
?>
    
    <script src="js/jquery.min.js"></script> 
    <script src="js/bootstrap.min.js"></script> 
    
</body>
</html>
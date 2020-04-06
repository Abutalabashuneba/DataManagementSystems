<?php
    session_start();

    if(!isset($_SESSION["username"])){
        header("Location:login.php");
    }
?>

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
                        <li class="active"><a href="index.php">Home</li></a></li>
                        <li><a href="sensors.php">Sensors</a></li>
                        <li><a href="dataVisualization.php">Data Visualization</a></li>
                    </ul>
    
                    <ul class="nav navbar-nav navbar-right my_nav">
                        <li><a href="signup.php">SignUp</a></li>
                        <li><a href="#myModal" data-toggle="modal">Logout</a></li>

                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="model-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <p>Yes</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>

            <div class="container">
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Temperature</th>
                                <th>Moisture</th>
                                <th>pH value</th>
                                <th>Humidity</th>
                            </tr>
                        </thead>
            
                        <tbody>
                            <tr>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                                <td>Test</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

<?php
    require "footer.php";
?>

    <script src="js/jquery.min.js"></script> 
    <script src="js/bootstrap.min.js"></script> 

</body>
</html>
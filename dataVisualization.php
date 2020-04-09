<!--Check if user is logged in-->
<!--Redirect to login page if not logged in-->
<!--Includes the header-->
<?php
    session_start();

    if(!isset($_SESSION["user"])){
        header("Location:login.php?redirect=1");
    }

    require "header.php";
?>

<body class="myBody">
    <!--Start of navbar-->
    <nav class="navbar navbar-expand-md navbar-light">
        <!--Button to collapse/expand the menu-->  
        <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#myNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="myNav">
            <div class="container-fluid">
                <div class="row">
                    <!--Start of side nav-->
                    <div class="col-lg-2 col-md-3 fixed-top sideNav">
                        <a href="index.php" class="navbar-brand text-white d-block mx-auto text-center py-3 mb-4 bottom-border">DMS</a>

                        <div class="bottom-border pb-3">
                            <img src="satoyama.jpg" alt="" width="50" class="rounded-circle mr-3">
                            <span class="text-white"><?php echo $_SESSION["user"] ?></span>
                        </div>

                        <ul class="navbar-nav flex-column mt-4">
                            <li class="nav-item"><a href="index.php" class="nav-link p-3 mb-2 sideNavLink text-white">Dashboard</a></li>
                            <li class="nav-item"><a href="sensors.php" class="nav-link p-3 mb-2 text-white current">Sensor</a></li>
                            <li class="nav-item"><a href="dataVisualization.php" class="nav-link p-3 mb-2 sideNavLink text-white">Visualization</a></li>
                            <!--Allow user to register if user type is Admin-->
                            <?php
                                if($_SESSION["type"] == "Admin"){
                                    echo "<li class='nav-item'><a href='signup.php' class='nav-link p-3 mb-2 sideNavLink text-white'>Register</a></li>";
                                }
                            ?>
                        </ul>
                    </div>
                    <!--End of side nav-->
           
                    <!--Start of top nav-->
                    <div class="col-lg-10 col-md-9 ml-auto bg-dark fixed-top py-2 topNav">
                        <div class="row">
                            <div class="col-md-4">
                                <h4 class="text-light text-uppercase mb-0">Dashboard</h4>
                            </div>

                            <!--Seach field-->
                            <div class="col-md-5">
                                <form>
                                    <div class="input-group">
                                        <input type="text" name="search" class="form-control" placeholder="Search...">
                                        <button type="button" class="btn"><i class="fas fa-search"></i></button>
                                    </div>
                                </form>
                            </div>

                            <!--Logout link-->
                            <div class="col-md-3">
                                <ul class="navbar-nav">
                                    <li class="nav-item ml-auto"><a href="" class="nav-link text-white" data-toggle="modal" data-target="#signOut">Logout</a></li>
                                </ul>                
                            </div>
                        </div>
                    </div>
                    <!--End of top nav-->
                </div>
            </div>
        </div>
    </nav>
    <!--End of navbar-->
    
    <!--Modal for logout confirmation-->
    <div class="modal fade" id="signOut">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Confirm Logout?</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-footer">
                    <form action="include/logoutprocess.php">
                        <button type="submit" class="btn btn-success">Yes</button>
                        <button type="submit" class="btn btn-danger" data-dismiss="modal">No</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--End of Modal-->

    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 col-md-9 ml-auto">
                    <div class="row pt-5 mt-3 mb-5">
                        <div class="col-sm-6 p-2">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Chicken Production</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="myChart" ></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 p-2">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Chicken Production</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="myChart2" ></canvas>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-6 p-2">
                            <div class="card">
                                <div class="card-header">
                                    <h4>Humidity</h4>
                                </div>
                                <div class="card-body">
                                    <canvas id="myChart3" ></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--Javascript plugins-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>

    <!--Javascript plugin for chart-->
    <!--Source from :https://github.com/chartjs/Chart.js/releases/tag/v2.9.3-->
    <script src="js/Chart.js"></script> 

    <script type="text/javascript">
         jQuery(function ($) {
        var data1 = [32, 31, 30, 29, 30, 33, 35, 40, 42, 42, 42];
            
        $("#chart1").shieldChart({
            exportOptions: {
                image: false,
                print: false
            },
            axisY: {
                title: {
                    text: "Break-Down for selected quarter"
                }
            },
            dataSeries: [{
                seriesType: "line",
                data: data1
            }]
        });

        
    });
    </script>


    <script>
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: '# of Votes',
                data: [2, 4, 5, 5, 10, 3, 11],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    </script>

    <script>
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: '# of Votes',
                data: [2, 4, 5, 5, 10, 3, 11],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    </script>

<script>
    var ctx3 = document.getElementById('myChart3').getContext('2d');
    var myChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: ['11A.M.', '12P.M.', '1P.M.', '2P.M.', '3P.M', '4P.M', '5P.M'],
            datasets: [{
                label: 'Humidity (%)',
                data: [60, 61, 66, 63, 62, 63, 63],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    </script>
</body>
</html>
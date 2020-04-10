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
                            <li class="nav-item"><a href="index.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                            <li class="nav-item"><a href="data.php" class="nav-link p-3 mb-2 text-white current sideNavLink"><i class="fas fa-table"></i> Data</a></li>
                            <li class="nav-item"><a href="sensors.php" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-toggle-on"></i> Sensor</a></li>
                            <li class="nav-item"><a href="dataVisualization.php" class="nav-link p-3 mb-2 sideNavLink text-white"><i class="fas fa-chart-bar"></i> Visualization</a></li>
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
                                <h4 class="text-light text-uppercase mb-0">Data</h4>
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
                <div class="modal-body text-left">
                    Are you sure you want to logout?
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
                        <div class="table-responsive"> 
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Temperature</th>
                                            <th>Humidity</th>
                                            <th>Moisture</th>
                                            <th>pH value</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        <tr>
                                            <td>02/04/2020</td>
                                            <td>9:00a.m.</td>
                                            <td>34°C</td>
                                            <td>72%</td>
                                            <td>Dry</td>
                                            <td>6.5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-10 col-md-9 ml-auto">
                    <div class="row pt-5 mt-3 mb-5">
                        <div class="col-sm-12 p-2">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item"><a class="page-link" href="data.php">Chicken</a></li>
                                    <li class="page-item active"><a class="page-link" href="data2.php">BSF</a></li>
                                </ul>
                            </nav>
                        
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

   
  

</body>
</html>







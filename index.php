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

<body>
    <!--Start of nav-->
    <nav class="navbar navbar-expand-md navbar-light">
        <button type="button" class="navbar-toggler ml-auto mb-2" data-toggle="collapse" data-target="#myNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="myNav">
            <div class="container-fluid">
                <div class="row">
                    <!--Start of side nav-->
                    <div class="col-xl-2 col-lg-3 col-md-4 sideNav fixed-top">
                        <a href="" class="navbar-brand d-block text-white mx-auto text-center bottomBorder py-3 mb-4">DMS</a>

                        <div class="bottomBorder text-white text-center pb-3">
                            Welcome,
                            <span><?= $_SESSION["user"]?></span>
                        </div>
                        
                        <ul class="navbar-nav flex-column mt-4">
                            <li class="nav-item"><a href="index.php" class="nav-link p-3 mb-2 text-white current"><i class="fas fa-tachometer-alt fa-lg mr-3"></i>Dashboard</a></li>
                            <li class="nav-item"><a href="data.php" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-table fa-lg mr-3"></i>&nbsp;Data</a></li>
                            <li class="nav-item"><a href="sensors.php" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-toggle-on fa-lg mr-3"></i>Sensor</a></li>
                            <li class="nav-item"><a href="dataVisualization.php" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-chart-bar fa-lg mr-3"></i>&nbspVisualization</a></li>
                            <!--Allow user to register if user type is Admin-->
                            <?php
                                if($_SESSION["type"] == "Admin"){
                                    echo "<li class='nav-item'><a href='signup.php' class='nav-link p-3 mb-2 text-white sideNavLink'><i class='fas fa-user-plus fa-lg mr-3'></i>Register</a></li>";
                                }
                            ?>
                        </ul>
                    </div>
                    <!--End of side nav-->

                    <!--Start of top nav-->
                    <div class="col-xl-10 col-lg-9 col-md-8 ml-auto fixed-top bg-dark py-2 topNav">
                        <div class="row align-items-center">
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <h4 class="text-white text-uppercase mb-0">Dashboard</h4>
                            </div>

                            <div class="col-xl-5 col-lg-5 col-md-6">
                                <form action="">
                                    <div class="input-group">
                                        <input type="text" name="search" placeholder="Search..." class="form-control">
                                        <button type="button" class="btn btn-default"><i class="fas fa-search"></i></button>
                                    </div>
                                </form>
                            </div>

                            <div class="col-xl-3 col-lg-3 col-md-2">
                                <ul class="navbar-nav">
                                    <li class="nav-item ml-auto"><a href="#" class="nav-link text-white" data-toggle="modal" data-target="#signOut">Logout</a></li>
                                </ul>
                            </div>
                        </div>            
                    </div>
                    <!--End of top nav-->
                </div>
            </div>
        </div>
    </nav>
    <!--End of nav-->

    <div class="modal fade" id="signOut">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Confirm</h4>
                    <button class="close" type="button" data-dismiss="modal">&times;</button>
                </div>

                <div class="modal-body text-left">
                    Are you sure you want to logout?
                </div>

                <div class="modal-footer">
                    <form action="include/logoutprocess.php">
                        <button type="submit" class="btn btn-success">Yes</button>
                        <button type="submit" data-dismiss="modal" class="btn btn-danger">No</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!--Card Section-->
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                    <div class="row pt-md-5 mt-md-3 mb-2">
                        <h3 class="mx-auto text-center text-muted">Chicken</h3>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="card mb-5">
                                <div class="card-header align-items-center">
                                    <h4><i class="fas fa-temperature-low"></i> Temperature</h4>
                                </div>

                                <div class="card-body">

                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="card mb-5">
                                <div class="card-header align-items-center">
                                    <h4><i class="fas fa-temperature-low"></i> Humidity</h4>
                                </div>

                                <div class="card-body">

                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="card mb-5">
                                <div class="card-header align-items-center">
                                    <h4><i class="fas fa-temperature-low"></i> Moisture</h4>
                                </div>

                                <div class="card-body">

                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="card mb-5">
                                <div class="card-header align-items-center">
                                    <h4><i class="fas fa-temperature-low"></i> ph Value</h4>
                                </div>

                                <div class="card-body">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                    <nav>
                        <ul class="pagination justify-content-center">
                            <li class="page-item active"><a href="index.php" class="page-link"><span class="badge">Chicken</span></a></li>
                            <li class="page-item"><a href="index2.php" class="page-link"><span class="badge">BSF</span></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>
    <!--End card section-->

    <!--Javascript plugins-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
</body>
</html>
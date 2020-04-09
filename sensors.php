<?php
    session_start();

    require "header.php";
?>

<body class="myBody">
    <nav class="navbar navbar-expand-md navbar-light">  
        <button class="navbar-toggler ml-auto mb-2 bg-light" type="button" data-toggle="collapse" data-target="#myNav">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="myNav">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-2 col-md-3 fixed-top sideNav">
                        <a href="index.php" class="navbar-brand text-white d-block mx-auto text-center py-3 mb-4 bottom-border">DMS</a>

                        <div class="bottom-border pb-3">
                            <img src="satoyama.jpg" alt="" width="50" class="rounded-circle mr-3">
                            <span class="text-white"><?php echo $_SESSION["user"] ?></span>
                        </div>

                        <ul class="navbar-nav flex-column mt-4">
                            <li class="nav-item"><a href="index.php" class="nav-link p-3 mb-2 text-white sideNavLink">Dashboard</a></li>
                            <li class="nav-item"><a href="sensors.php" class="nav-link p-3 mb-2 text-white current">Sensor</a></li>
                            <li class="nav-item"><a href="dataVisualization.php" class="nav-link p-3 mb-2 sideNavLink text-white">Visualization</a></li>
                            <?php
                                if($_SESSION["type"] == "Admin"){
                                    echo "<li class='nav-item'><a href='signup.php' class='nav-link p-3 mb-2 sideNavLink text-white'>Register</a></li>";
                                }
                            ?>
                        </ul>
                    </div>
           
                    <div class="col-lg-10 col-md-9 ml-auto bg-dark fixed-top py-2 topNav">
                        <div class="row align-items-center">
                            <div class="col-md-4">
                                <h4 class="text-light text-uppercase mb-0">sensor</h4>
                            </div>

                            <div class="col-md-5">
                                <form>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Search...">
                                        <button type="button" class="btn">Seach</button>
                                    </div>
                                </form>
                            </div>

                            <div class="col-md-3">
                                <ul class="navbar-nav">
                                    <li class="nav-item ml-auto"><a href="" class="nav-link text-white" data-toggle="modal" data-target="#signOut">Logout</a></li>
                                </ul>                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

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
   
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>
<!--Start of nav-->
<nav class="navbar navbar-expand-md navbar-light">
    <button type="button" class="navbar-toggler ml-auto mb-2" data-toggle="collapse" data-target="#myNav">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="myNav">
        <div class="container-fluid p-0">
            <div class="row w-100 mx-auto">
                <!--Start of side nav-->
                <div class="col-xl-2 col-lg-3 col-md-4 sideNav fixed-top">
                    <a href="#" class="navbar-brand d-block text-white mx-auto text-center bottomBorder py-3 mb-4">
                        <img class="img-logo w-50 h-50" src="images/logo2.png" alt="logo">
                    </a>

                    <div class="bottomBorder text-white text-center pb-3">
                        <span id="userName"></span>
                    </div>
                    
                    <ul class="navbar-nav flex-column mt-4" id="myNavUl">
                        <li class="nav-item"><a href="index.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-tachometer-alt fa-lg mr-3"></i>Dashboard</a></li>
                        <li class="nav-item"><a href="data.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-table fa-lg mr-3"></i>&nbsp;Data</a></li>
                        <li class="nav-item"><a href="production.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-users fa-lg mr-3"></i>Production</a></li>
                        <li class="nav-item" style="display:none;" id="sensor"><a href="sensors.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-toggle-on fa-lg mr-3"></i>Sensor</a></li>
                        <li class="nav-item"><a href="dataVisualization.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-chart-bar fa-lg mr-3"></i>&nbsp;Visualization</a></li>
                        <li class="nav-item"><a href="notification.php" class="nav-link p-3 mb-2 text-white"><i class="fas fa-bell fa-lg mr-3"></i></i>&nbsp;Notification</a></li>
                        <!--Allow user to register if user type is Admin-->
                        <li class="nav-item" style="display:none;" id="register" onclick="registerForm()"><a href="#" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-user fa-lg mr-3"></i>&nbsp;Register</a></li>
                    </ul>
                </div>
                <!--End of side nav-->

                <!--Start of top nav-->
                <div class="col-xl-10 col-lg-9 col-md-8 ml-auto fixed-top bg-dark py-2 topNav">
                    <div class="row align-items-center">
                        <div class="col-xl-4 col-lg-4 col-md-4">
                            <h4 class="text-white text-uppercase mb-0" id="text"></h4>
                        </div>

                        <div class="col-xl-3 col-lg-3 col-md-2 ml-auto">
                            <ul class="navbar-nav">
                                <li class="nav-item ml-auto" onclick="logoutModal()"><a href="#" class="nav-link text-white">Logout</a></li>
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
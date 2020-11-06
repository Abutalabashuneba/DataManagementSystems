<?php
    include_once "header.php";
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
                        <a href="#" class="navbar-brand d-block text-white mx-auto text-center bottomBorder py-3 mb-4">DMS</a>

                        <div class="bottomBorder text-white text-center pb-3">
                            <span id="userName"></span>
                        </div>
                        
                        <ul class="navbar-nav flex-column mt-4">
                            <li class="nav-item"><a href="index.html" class="nav-link p-3 mb-2 text-white current"><i class="fas fa-tachometer-alt fa-lg mr-3"></i>Dashboard</a></li>
                            <li class="nav-item"><a href="data.html" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-table fa-lg mr-3"></i>&nbsp;Data</a></li>
							<li class="nav-item"><a href="production.html" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-users fa-lg mr-3"></i>Production</a></li>
                            <li class="nav-item" style="display:none;" id="sensor"><a href="sensors.html" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-toggle-on fa-lg mr-3"></i>Sensor</a></li>
                            <li class="nav-item"><a href="dataVisualization.html" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-chart-bar fa-lg mr-3"></i>&nbsp;Visualization</a></li>
                            <li class="nav-item"><a href="notification.html" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-bell fa-lg mr-3"></i></i>&nbsp;Notification</a></li>
                            <!--Allow user to register if user type is Admin-->
                            <li class="nav-item" style="display:none;" id="register" onclick="registerForm()"><a href="#" class="nav-link p-3 mb-2 text-white sideNavLink"><i class="fas fa-user fa-lg mr-3"></i>&nbsp;Register</a></li>
                        </ul>
                    </div>
                    <!--End of side nav-->

                    <!--Start of top nav-->
                    <div class="col-xl-10 col-lg-9 col-md-8 ml-auto fixed-top bg-dark py-2 topNav">
                        <div class="row align-items-center">
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <h4 class="text-white text-uppercase mb-0">Dashboard</h4>
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

    <!--Card Section-->
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                    <div class="row pt-md-5 mt-md-3 mb-2">
                        <h3 class="mx-auto text-center text-muted" id="dashboardTitle">Chicken</h3>         
                    </div>
                    <div class="row">
                        <!--Start Pagination-->
                        <div class="col-xl-8 col-lg-8 col-md-8 pagination-col">
                            <nav>
                                <ul class="pagination paginationBtn" id="dashPage">
                                    <li class="page-item active"><a href="#" class="page-link" id="dashChickenBtn"><span class="badge">Chicken</span></a></li>
                                    <li><a href="#" class="page-link" id="dashBSFBtn"><span class="badge">BSF Adult</span></a></li>
                                    <li><a href="#" class="page-link" id="dashBSFLBtn"><span class="badge">BSF Larvae</span></a></li>
                                </ul>
                            </nav>
                        </div>
                        <!--End Pagination-->

                        <!--Dropdown Area-->
                        <div class="col-xl-2 col-lg-2 col-md-4 dropdown ml-auto" id="dropdownChickenRow-dash">
                            <select id="chickenAreaDash" class="form-control" onchange="dataAreaChange()">
                            </select>
                        </div>
                        <!--Dropdown Area-->
                    </div>
                    
                    <!--Start of Dashboard -->
                    <div id="dashChicken">
                        <div class="row" id="chickenDashArea-1">
                            <!--Start of card 1-->
                            <div class="col-xl-6">
                                <div class="card mb-5">
                                    <div class="card-header align-items-center">
                                        <h4 id="dashCard1Title"><i class="fas fa-temperature-low"></i> Chicken - Temperature</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="progress mx-auto" id="temp">
                                            <span class="progress-left">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <span class="progress-right">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                            <div class="h2 font-weight-bold"><span id="dashCard-1"></span><sup class="small">°C</sup></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--End of card 1-->

                            <!--Start of card 2-->
                            <div class="col-xl-6">
                                <div class="card mb-5">
                                    <div class="card-header align-items-center">
                                        <h4 id="dashCard2Title"><i class="fas fa-temperature-low"></i> Chicken - Humidity</h4>
                                    </div>

                                    <div class="card-body">
                                        <div class="progress mx-auto" id="humid" >
                                            <span class="progress-left">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <span class="progress-right">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                            <div class="h2 font-weight-bold"><span id="dashCard-2"></span><sup class="small" id="symbolCard2">%</sup></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--End of card 2-->

                            <!--Start of card 3-->
                            <div class="col-xl-6">
                                <div class="card mb-5">
                                    <div class="card-header align-items-center">
                                        <h4 id="dashCard3Title"><i class="fas fa-temperature-low"></i> Chicken - Moisture</h4>
                                    </div>

                                    <div class="card-body">
                                        <div class="progress mx-auto" id="mois" >
                                            <span class="progress-left">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <span class="progress-right">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                            <div class="h2 font-weight-bold"><span id="dashCard-3"></span><sup class="small" id="symbolCard3">%</sup></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--End of card 3-->

                            <!--Start of card 4-->
                            <div class="col-xl-6" id="card4">
                                <div class="card mb-5">
                                    <div class="card-header align-items-center">
                                        <h4><i class="fas fa-temperature-low"></i> Chicken - ph Value</h4>
                                    </div>

                                    <div class="card-body">
                                        <div class="progress mx-auto" id="ph" >
                                            <span class="progress-left">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <span class="progress-right">
                                                <span class="progress-bar border-primary"></span>
                                            </span>
                                            <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                            <div class="h2 font-weight-bold"><span id="dashCard-4"></span><sup class="small">pH</sup></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--End of card 4-->
                        <!--End of  Dashboard  -->  
                </div>
            </div>
            
            
        </div>
    </section>
    <!--End card section-->

    <div class="toast" style="position: absolute; top: 5rem; right: 4rem;" data-autohide="true">
        <div class="toast-header bg-success">
      
          <strong class="mr-auto text-white">Sign Up</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          Account Creation success!
       </div>
    </div>

    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
    https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-database.js"></script>

    <script>
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyA_qDaC5SznlJzN78ec0Bd70BtsRzbj1FM",
        authDomain: "test-9ff56.firebaseapp.com",
        databaseURL: "https://test-9ff56.firebaseio.com",
        projectId: "test-9ff56",
        storageBucket: "test-9ff56.appspot.com",
        messagingSenderId: "746329546915",
        appId: "1:746329546915:web:1831479a0ace9f401c1f16",
        measurementId: "G-509V2LMR8M"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    </script>

    

<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>


    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.1/js/tempusdominus-bootstrap-4.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tempusdominus-bootstrap-4/5.0.1/css/tempusdominus-bootstrap-4.min.css" />
    
    <script src="js/script.js"></script> 
    <script src="js/notification.js"></script>
    <script src="js/push.js"></script>
    <script src="js/index.js"></script>
    <script src="js/bootstrap-show-modal.js"></script>
    <script src="js/modal.js"></script>
    
</body>
</html>
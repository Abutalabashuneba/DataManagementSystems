<?php
    include_once "header.php";
?>

<body>
    <div class="content" style="display:none;">
        <?php
            include_once "sideNav.php";
        ?>

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
                        <div id="dash">
                            <div id="dashChicken">
                                <div class="row" id="chickenDashArea-1">
                                    <!--Start of card 1-->
                                    <div class="col-xl-6">
                                        <div class="card mb-5">
                                            <div class="card-header align-items-center">
                                                <h4 id="dashCard1Title">Chicken - Temperature</h4>
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
                                                <h4 id="dashCard2Title">Chicken - Humidity</h4>
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
                                                <h4 id="dashCard3Title">Chicken - Light</h4>
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
                                                    <div class="h2 font-weight-bold"><span id="dashCard-3"></span><sup class="small" id="symbolCard3"></sup></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--End of card 3-->

                                    <div class="col-xl-6" id="card4" style="display:none;">
                                        <div class="card mb-5">
                                            <div class="card-header align-items-center">
                                                <h4>BSFL - Soil Temperature</h4>
                                            </div>

                                            <div class="card-body">
                                                <div class="progress mx-auto" id="soil" >
                                                    <span class="progress-left">
                                                        <span class="progress-bar border-primary"></span>
                                                    </span>
                                                    <span class="progress-right">
                                                        <span class="progress-bar border-primary"></span>
                                                    </span>
                                                    <div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                                                    <div class="h2 font-weight-bold"><span id="dashCard-4"></span><sup class="small">°C</sup></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="nodash" style="display:none;">
                            <p>No record found</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--End card section-->
    </div>

    <?php
        include_once "script.php";
    ?>

    <script src="js/auth.js"></script>
    <script src="js/index.js"></script>
    <script src="js/script.js"></script>
    <script src="js/bootstrap-show-modal.js"></script>
    <script src="js/modal.js"></script>
    <!-- <script src="js/serviceWorker.js"></script> -->
    <script src="js/push.js"></script>
    <script src="js/notification.js"></script>
</body>
</html>
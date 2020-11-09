<?php
    include_once "header.php";
?>

<body>
    <div class="content" style="display:none;">
        <?php
            include_once "sideNav.php";
        ?>

        <section>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                        <div class="row pt-md-5 mt-md-3 mb-2 pl-3">
                            <div class="col-xl-5 col-lg-9 col-md-8 col-sm-9 pl-0">
                                <nav>
                                    <ul class="pagination paginationBtn" id="typePage">
                                        <li class="page-item active"><a href="#" class="page-link" id="chickenVisualization"><span class="badge">Chicken</span></a></li>
                                        <li class="page-item "><a href="#" class="page-link" id="bsfVisualization"><span class="badge">BSF</span></a></li>
                                        <li class="page-item "><a href="#" class="page-link" id="bsflVisualization"><span class="badge">BSF Larvae</span></a></li>
                                    </ul>
                                </nav>
                            </div>
        
                            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-3 ml-auto">
                                <select class="form-control areaDropdown" id="dropdown" onchange="onAreaChange()">
                                </select>
                            </div>
                        </div>

                        <!-- Start of Chicken Visualization -->
                        <section id="chickenChart">
                            <div class="row">
                                <div id="reportrange" class="datepicker" style="text-align: center; background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 30%">
                                    <i class="fa fa-calendar"></i>&nbsp;
                                    <span></span> <i class="fa fa-caret-down"></i>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12">
                                    <div class="card mb-5">
                                        <div class="card-header">
                                            <div class="row">
                                                <div class="col-xl-4 col-lg-3 col-md-5 col-sm-4">
                                                    <h4 class="mb-0" id="headerCanvas1">Chicken</h4>
                                                </div>

                                                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-3 ml-auto">
                                                    <select id="mixChicken" class="form-control" style="display:none;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
        
                                        <div class="card-body">
                                            <canvas id="myChart1" height="100"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                            <div class="row" id="feedChart">
                                <div class="col-12">
                                    <div class="card mb-5">
                                        <div class="card-header">
                                            <div class="row">
                                                <div class="col-xl-4 col-lg-3 col-md-5 col-sm-4">
                                                    <h4 class="mb-0" id="headerCanvas2">Production - Feed</h4>
                                                </div>

                                                <!-- <div class="col-xl-2 col-lg-3 col-md-4 col-sm-3 ml-auto">
                                                    <select id="mixBSF" class="form-control" style="display:block;"></select>
                                                </div> -->
                                            </div>
                                        </div>
        
                                        <div class="card-body">
                                            <canvas id="myChart2" height="100" ></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" id="healthChart">
                                <div class="col-12">
                                    <div class="card mb-5">
                                        <div class="card-header">
                                            <div class="row">
                                                <div class="col-xl-4 col-lg-3 col-md-5 col-sm-4">
                                                    <h4 class="mb-0" id="headerCanvas3">Production - Health</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <canvas id="myChart3" height="100"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row" id="weightChart">
                                <div class="col-12">
                                    <div class="card mb-5">
                                        <div class="card-header">
                                            <div class="row">
                                                <div class="col-xl-4 col-lg-3 col-md-5 col-sm-4">
                                                    <h4 class="mb-0" id="headerCanvas4">Production - Weight</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <canvas id="myChart4" height="100"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <!-- End of chicken visualization -->
                    </div>
                </div>
            </div>
        </section>
    </div>

    <?php
        include_once "script.php";
    ?>

    <script src="js/auth.js"></script>
    <script src="js/Chart.js"></script>
    <script src="js/myChart.js"></script>
    <script src="js/script.js"></script>
    <script src="js/bootstrap-show-modal.js"></script>
    <script src="js/modal.js"></script>
</body>
</html>
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
                        <div class="row pt-md-5 mt-md-3 mb-2">
                            <h3 class="mx-auto text-center text-muted" id="dataTitle">Chicken</h3> 
                        </div>

                        <div class="row">
                            <!--Start of Pagination-->
                            <div class="col-xl-8 col-lg-8 col-md-8 pagination-col">
                                <nav>
                                    <ul class="pagination paginationBtn" id="dataPage">
                                        <li class="page-item active"><a href="#" class="page-link" id="dataChickenBtn"><span class="badge">Chicken</span></a></li>
                                        <li><a href="#" class="page-link" id="dataBSFBtn"><span class="badge">BSF Adult</span></a></li>
                                        <li><a href="#" class="page-link" id="dataBSFLBtn"><span class="badge">BSF Larvae</span></a></li>
                                    </ul>
                                </nav>
                            </div>
                            <!--End of Pagination-->

                            <div class="col-xl-2 col-lg-2 col-md-4 dropdown ml-auto" id="dropdownChickenRow-data">
                                <select id="chickenAreaData" class="form-control" onchange="dataAreaChange()">
                                </select>
                            </div>
                        </div>
                        <!--  -->
                        <div class="row">
                                <div id="reportrange" class="datepicker" style="text-align: center; background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 30%">
                                    <i class="fa fa-calendar"></i>&nbsp;
                                    <span></span> <i class="fa fa-caret-down"></i>
                                </div>

                            <div class='col-xl-5 col-lg-5 col-md-5 ml-auto'>
                                <div id="btnChicken">
                                <div id="chickenAddBtn1">
                                    <button class="btn mb-3 float-right" id="addBtn" style="display:none;"><i class="fas fa-plus" data-toggle="tooltip" title="add data"></i></button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <!--  -->

                        <div id="dataTab">
                            <div class="row" id="chickentab">
                                <div class="col-xl-12 table-responsive">
                                    <!--Start of chicken table-->
                                    <div id="chickenTable">
                                        <!--Start of chicken table area-1-->
                                        <table class="table table-striped table-bordered bg-light" id="chickenTable-Area1">
                                            <!--Start of table head-->
                                            <thead class="bodyHeaderC"></thead>
                                            <!--End of table head-->
                
                                            <!--Start of table body-->
                                            <tbody class="bodyDataC"></tbody>
                                            <!--End of table body-->
                                        </table>  
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row" id="bsftab" style="display:none">
                                <div class="col-xl-12 table-responsive">
                                    <!--Start of chicken table-->
                                    <div id="bsfTable">
                                        <!--Start of chicken table area-1-->
                                        <table class="table table-striped table-bordered bg-light" id="bsfTable-Area1">
                                            <!--Start of table head-->
                                            <thead class="bodyHeaderBSF"></thead>
                                            <!--End of table head-->
                
                                            <!--Start of table body-->
                                            <tbody class="bodyDataBSF"></tbody>
                                            <!--End of table body-->
                                        </table>  
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row" id="bsfltab" style="display:none">
                                <div class="col-xl-12 table-responsive">
                                    <!--Start of chicken table-->
                                    <div id="bsflTable">
                                        <!--Start of chicken table area-1-->
                                        <table class="table table-striped table-bordered bg-light" id="bsflTable-Area1">
                                            <!--Start of table head-->
                                            <thead class="bodyHeaderBSFL"></thead>
                                            <!--End of table head-->
                
                                            <!--Start of table body-->
                                            <tbody class="bodyDataBSFL"></tbody>
                                            <!--End of table body-->
                                        </table>  
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="nodataTab" style="display:none;">
                            <p>No record found</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--End table section-->
    </div>

    <?php
        include_once "script.php";
    ?>

    <script src="js/auth.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/data.js"></script>
    <script src="js/bootstrap-show-modal.js"></script>
    <script src="js/script.js"></script>

    <!-- table plug in-->
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap4.min.js"></script>
  
</body>
</html>
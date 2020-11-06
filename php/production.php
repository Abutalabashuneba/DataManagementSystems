<?php
    include_once "header.php";
?>
<body>
    <div class="content" style="display:none;">
        <?php
            include_once "sideNav.php";
        ?>

        <div>
            <!--Table Section-->
            <section>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xl-10 col-lg-9 col-md-8 ml-auto">
                            <div class="row pt-md-5 mt-md-3 mb-2">
                                <h3 class="mx-auto text-center text-muted" id="tableTitle">Chicken</h3> 
                            </div>

                            <div class="row">
                                <!--Start of Pagination-->
                                <div class="col-xl-8 col-lg-8 col-md-8 pagination-col">
                                    <nav>
                                        <ul class="pagination paginationBtn" id="productionPage">
                                            <li class="page-item active"><a class="page-link" id="btnChicken"><span class="badge">Chicken</span></a></li>
                                            <li><a href="#" class="page-link" id="btnBsf"><span class="badge">BSF Adult</span></a></li>
                                            <li><a href="#" class="page-link" id="btnBsfl"><span class="badge">BSF Larvae</span></a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <!--End of Pagination-->

                                <div class="col-xl-2 col-lg-2 col-md-4 dropdown ml-auto" id="dropdownChickenRow-data">
                                    <select id="productionArea" class="form-control" onchange="productionAreaChange()">
                                    </select>
                                </div>
                            </div>
                            <!--  -->
                            <div class="row mt-4">
                                <div id="reportrange" class="datepicker" style="text-align: center; background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 30%">
                                    <i class="fa fa-calendar"></i>&nbsp;<span></span> <i class="fa fa-caret-down"></i>
                                </div>
                            
                                
                            </div>
                            <!--  -->

                            <div id="prod">
                                <!--Table 1-->
                                <div class="row mt-2" id="chickentab">
                                    <div class="col-xl-7 col-lg-7 col-md-7 ml-auto">
                                        <h2>Feeds</h2>
                                    </div>

                                    <div class='col-xl-5 col-lg-5 col-md-5 ml-auto'>
                                        <div id="btnChicken">
                                            <div id="chickenAddBtn1">
                                                <button class="btn mb-3 float-right" id="addBtnC" style="display:none;"><i class="fas fa-plus" data-toggle="tooltip" title="add data"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div class="col-xl-12 table-responsive">
                                        <!--Start of chicken table-->
                                        <div id="chickenTable">
                                            <!--Start of chicken table area-1-->
                                            <table class="table table-striped table-bordered bg-light" id="chickenTable-Area1">
                                                <!--Start of table head-->
                                                <thead class="productionHeaderC"></thead>
                                                <!--End of table head-->
                    
                                                <!--Start of table body-->
                                                <tbody class="productionBodyDataC"></tbody>
                                                <!--End of table body-->
                                            </table>  
                                        </div> 
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12">
                                        <hr>
                                    </div>
                                  

                                    <!--Table 2-->
                                    <div class="col-xl-7 col-lg-7 col-md-7 ml-auto mt-5">
                                        <h2>Healths</h2>
                                    </div>

                                    <div class='col-xl-5 col-lg-5 col-md-5 ml-auto mt-5'>
                                        <div id="btnChicken">
                                            <div id="chickenAddBtn1">
                                                <button class="btn mb-3 float-right" id="addBtnC2" style="display:none;"><i class="fas fa-plus" data-toggle="tooltip" title="add data"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 table-responsive">
                                        <!--Start of chicken table-->
                                        <div id="chickenTable2">
                                            <!--Start of chicken table area-1-->
                                            <table class="table table-striped table-bordered bg-light" id="chickenTable2-Area1">
                                                <!--Start of table head-->
                                                <thead class="productionHeaderC2"></thead>
                                                <!--End of table head-->
                        
                                                <!--Start of table body-->
                                                <tbody class="productionBodyDataC2"></tbody>
                                                <!--End of table body-->
                                            </table>  
                                        </div> 
                                    </div>

                                    <div class="col-xl-12 col-lg-12 col-md-12">
                                        <hr>
                                    </div>

                                    <!--Table 3-->
                                    <div class="col-xl-7 col-lg-7 col-md-7 ml-auto mt-5">
                                        <h2>Weight</h2>
                                    </div>

                                    <div class='col-xl-5 col-lg-5 col-md-5 ml-auto mt-5'>
                                        <div id="btnChicken">
                                            <div id="chickenAddBtn1">
                                                <button class="btn mb-3 float-right" id="addBtnC3" style="display:none;"><i class="fas fa-plus" data-toggle="tooltip" title="add data"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-12 table-responsive">
                                        <!--Start of chicken table-->
                                        <div id="chickenTable3">
                                            <!--Start of chicken table area-1-->
                                            <table class="table table-striped table-bordered bg-light" id="chickenTable3-Area1">
                                                <!--Start of table head-->
                                                <thead class="productionHeaderC3"></thead>
                                                <!--End of table head-->
                        
                                                <!--Start of table body-->
                                                <tbody class="productionBodyDataC3"></tbody>
                                                <!--End of table body-->
                                            </table>  
                                        </div> 
                                    </div>
                                </div>

                                <div class="row" id="bsftab" style="display:none">
                                    <div class="col-xl-12 table-responsive">
                                        <!--Start of chicken table-->
                                        <div id="chickenTable">
                                            <!--Start of chicken table area-1-->
                                            <table class="table table-striped table-hover table-md bg-light text-center" id="chickenTable-Area1">
                                                <!--Start of table head-->
                                                <thead class="productionHeaderBSF"></thead>
                                                <!--End of table head-->
                    
                                                <!--Start of table body-->
                                                <tbody class="productionBodyDataBSF"></tbody>
                                                <!--End of table body-->
                                            </table>  
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row" id="bsfltab" style="display:none">
                                    <div class="col-xl-12 table-responsive">
                                        <!--Start of chicken table-->
                                        <div id="chickenTable">
                                            <!--Start of chicken table area-1-->
                                            <table class="table table-striped table-hover table-md bg-light text-center" id="chickenTable-Area1">
                                                <!--Start of table head-->
                                                <thead class="productionHeaderBSFL"></thead>
                                                <!--End of table head-->
                    
                                                <!--Start of table body-->
                                                <tbody class="productionBodyDataBSFL"></tbody>
                                                <!--End of table body-->
                                            </table>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!--End table section-->
        </div>
    </div>

    <?php
        include_once "script.php";
    ?>

    <script src="js/auth.js"></script>
    <script src="js/bootstrap-show-modal.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/production.js"></script>
    <script src="js/script.js"></script>
    <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap4.min.js"></script>
</body>
</html>
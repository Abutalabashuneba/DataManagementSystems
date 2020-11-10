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

                        <div class="row">
                            <div class="container-fluid" id="notificationCard">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <?php
        include_once "script.php";
    ?>

    <script src="js/auth.js"></script>
    <script src="js/script.js"></script>
    <script src="js/bootstrap-show-modal.js"></script>
    <script src="js/modal.js"></script>
    <script src="js/push.js"></script>
    <script src="js/notification.js"></script>
    <script src="js/notiHist.js"></script>
</body>
</html>
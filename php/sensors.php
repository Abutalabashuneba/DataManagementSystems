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
                            <div class="container">
                                <div class="row">
                                    <div class="media p-3 myMedia w-100">
                                        <img src="images/Libelium.jpg" alt="libelium" style="height:300px; width:300px;">
                                        <div class="media-body m-5 p-3">
                                            <h4>Libelium - Plug & Sense</h4>
                                            <p>Planned Deploy Area: <span style="font-weight:bold;">Batch 73</span></p>
                                            <span>Type of sensors nodes :</span>
                                            <ol>
                                                <li style="font-weight:bold;">Temperature Probe</li>
                                                <li style="font-weight:bold;">Humidity Probe</li>
                                                <li style="font-weight:bold;">Light Probe</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-5">
                                    <div class="media p-3 myMedia w-100">
                                        <img src="images/Arduino_2.jpg" alt="libelium" style="height:300px; width:300px;">
                                        <div class="media-body m-5 p-3">
                                            <h4>Arduino</h4>
                                            <p>Planned Deploy Area: <span style="font-weight:bold;">Batch 74</span></p>
                                            <span>Type of sensors nodes :</span>
                                            <ol>
                                                <li style="font-weight:bold;">Temperature Probe</li>
                                                <li style="font-weight:bold;">Humidity Probe</li>
                                                <li style="font-weight:bold;">Moisture Probe</li>
                                                <li style="font-weight:bold;">Soil Temperature Probe</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-5">
                                    <div class="media p-3 myMedia w-100">
                                        <img src="images/Arduino_1.jpg" alt="libelium" style="height:300px; width:300px;">
                                        <div class="media-body m-5 p-3">
                                            <h4>Arduino</h4>
                                            <p>Planned Deploy Area: <span style="font-weight:bold;">BSFL</span></p>
                                            <span>Type of sensors nodes :</span>
                                            <ol>
                                                <li style="font-weight:bold;">Temperature Probe</li>
                                                <li style="font-weight:bold;">Humidity Probe</li>
                                                <li style="font-weight:bold;">Light Probe</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
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
</body>
</html>
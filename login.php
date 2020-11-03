<?php
    include_once "header.php";
?>

<body class="login_body">
    <div class="container-fluid" >
        <div class="row" style="height:100vh;">
            <div class="col-xl-4 col-lg-6 col-md-8 col-sm-9 mx-auto my-auto">
                <form id="loginForm" class="form_container login_form" method="POST">
                    <h2 class="text-center">Account Login</h2>

                    <div class="form-group">
                        <label for="email">Username/Email:</label><br/>
                        <input type="text" name="email" id="email" class="form-control" required/>
                    </div>

                    <div class="form-group">
                        <label for="pwd">Password:</label><br/>
                        <input type="password" name="pwd" id="pwd" class="form-control" required/>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">Login</button>

                    <div class="text-center text-danger">
                        <p id="loginError"></p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php 
        include_once "script.php";
    ?>

    <script src="js/login.js"></script>

</body> 
</html>
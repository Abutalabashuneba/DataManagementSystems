<?php
    require "header.php";
?>

<body class="login_body">
    <div class="container-fluid">
        <h1 class="text-center">Data Management System</h1>

        <div class="row">
            <div class="col-md-4 col-sm-3 col-xs-1">
            </div>    

            <div class="col-md-4 col-sm-6 col-xs-10">
                <form action="include/signupprocess.php" class="form_container" method="POST">
                    <h2 class="text-center">Sign Up</h2>

                    <div class="form-group">
                        <label for="uname">Username:</label><br/>
                        <input type="text" name="uname" id="uname" class="form-control" required/>
                    </div>

                    <div class="form-group">
                        <label for="pwd">Password:</label><br/>
                        <input type="password" name="pwd" id="pwd" class="form-control" required/>
                    </div>

                    <div class="form-group">
                        <label for="accountType">AccountType</label><br/>
                            <input type="text" name="accountType" id="accountType" class="form-control" required>
                    </div>
                    
                    <button type="submit" name="signup" class="btn btn-primary btn-block">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>

    <script src="js/jquery.min.js"></script> 
	<script src="js/bootstrap.min.js"></script> 
	
</body> 
</html>

<?php
    require "header.php";
?>

<body class="login_body">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 col-sm-3 col-xs-1">
            </div>    

            <div class="col-md-4 col-sm-6 col-xs-10">
                <form action="include/loginprocess.php" class="form_container login_form" method="POST">
                    <h2 class="text-center">Account Login</h2>

                    <div class="form-group">
                        <label for="uname">Username:</label><br/>
                        <input type="text" name="uname" id="uname" class="form-control" required/>
                    </div>

                    <div class="form-group">
                        <label for="pwd">Password:</label><br/>
                        <input type="password" name="pwd" id="pwd" class="form-control" required/>
                    </div>

                    <div class="form-group">
                       <span>I'm: </span>
                        <label for="admin">
                            <input type="radio" name="accountType" id="admin" required value="Admin">
                            Admin
                        </label>
                
                        <label for="user">
                            <input type="radio" name="accountType" id="user" required value="User">
                            User
                        </label>
                    </div>
                    
                    <button type="submit" name="login" class="btn btn-primary btn-block">
                        Login
                    </button>

                    <div class="text-center text-danger">
                        <?php 
                            if(isset($_GET["error"])){
                                 if($_GET["error"] == "noUserFound"){
                                     echo "<p><strong>No user found!</strong></p>";
                                 }
                                 else if($_GET["error"] == "wrongType"){
                                    echo "<p><strong>Wrong account type!</strong></p>";
                                 }
                                 else{
                                     echo "<p><strong>Wrong password!</strong></p>";
                                 }
                            }
                        ?>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="js/jquery.min.js"></script> 
	<script src="js/bootstrap.min.js"></script> 
	
</body> 
</html>

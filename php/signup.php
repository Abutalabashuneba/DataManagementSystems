<?php
    session_start();

    //if(!isset($_SESSION["user"])){
    //    header("Location:login.php?redirect=1");
    //}

    require "header.php";
?>

<body class="login_body">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 col-sm-3 col-xs-1">
            </div>    

            <div class="col-md-4 col-sm-6 col-xs-10">
                <form id="signUpForm" class="form_container login_form" method="POST">
                    <h2 class="text-center">Sign Up</h2>

                    <div class="form-group">
                        <label for="uname">Username:</label><br/>
                        <input type="text" name="uname" id="uname" class="form-control" placeholder="Enter username" required/>
                    </div>

                    <div class="form-group">
                        <label for="fullname">Fullname:</label><br/>
                        <input type="text" name="fullname" id="fullname" class="form-control" placeholder="Enter fullname" required/>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label><br/>
                        <input type="email" name="email" id="email" class="form-control" placeholder="Enter email" required/>
                    </div>

                    <div class="form-group">
                        <label for="mobile">Mobile No.</label><br/>
                        <input type="text" name="mobile" id="mobile" class="form-control" placeholder="Enter mobile no" required/>
                    </div>

                    <div class="form-group">
                        <label for="pwd">Password:</label><br/>
                        <input type="password" name="pwd" id="pwd" class="form-control" required/>
                    </div>

                    <div class="form-group">
                        <label for="pwdCon">Confirm Password:</label><br/>
                        <input type="password" name="pwdCon" id="pwdCon" class="form-control" required/>
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
                    
                    <button type="submit" name="signup" class="btn btn-primary btn-block">
                        Sign Up
                    </button>

                    <div class="text-center text-danger">
                        <?php 
                            if(isset($_GET["error"])){
                                 if($_GET["error"] == "userTaken"){
                                     echo "<p><strong>Username existed. Please choose other username!</strong></p>";
                                 }

                                 else if($_GET["error"] == "passNotMatch"){
                                     echo "<p><strong>Password does not match!</strong></p>";
                                 }

                                 else{
                                     echo "<p><strong>SQL error!</strong></p>";
                                 }
                            }
                        ?>
                    </div>

                    <div class="text-center text-success">
                        <?php 
                            if(isset($_GET["signup"])){
                                 if($_GET["signup"] == "success"){
                                     echo "<p>Account successfully created!</p>";
                                 }
                            }
                        ?>
                        <div class="alert alert-success success-message" style="display:none;">Form submitted successfully.</div>
                    </div>

                    <div class="text-primary text-center">
                            <p style="position:relative;top:60px;"><a href="index.php" style="text-decoration:none;"><span style="font-size:20px;">&laquo;</span>Back to Homepage</a></p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php
        require "footer.php";
    ?>
    
    <script src="signup.js"></script>
	
</body> 
</html>

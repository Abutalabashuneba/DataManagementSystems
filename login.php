<!DOCTYPE html> 
<html lang="en"> 
<head> 
	<title>Data Management System</title> 
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initialscale=1.0"/> 
	<link href="css/bootstrap.min.css" rel="stylesheet" />  

    <link rel="stylesheet" href="style.css">
</head> 

<body class="login_body">
    <div class="container-fluid">
        <h1 class="text-center">Data Management System</h1>

        <div class="row">
            <div class="col-md-4">
            </div>    

            <div class="col-md-4">
                <form action="#" class="form_container" method="POST">
                    <h2 class="text-center">Login</h2>

                    <div class="form-group">
                        <label for="uname">Username:</label><br/>
                        <input type="text" name="uname" id="uname" class="form-control"/>
                    </div>

                    <div class="form-group">
                        <label for="pwd">Password:</label><br/>
                        <input type="password" name="pwd" id="pwd" class="form-control"/>
                    </div>

                    <div class="form-group">
                       <span>I'm: </span>
                        <label for="admin">
                            <input type="radio" name="accountType" id="admin" required="required" value="Admin">
                            Admin
                        </label>
                
                        <label for="user">
                            <input type="radio" name="accountType" id="user" value="User">
                            User
                        </label>
                    </div>
                    
                    <button type="submit" name="submit" class="btn btn-primary btn-block">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </div>

    <script src="js/jquery.min.js"></script> 
	<script src="js/bootstrap.min.js"></script> 
	
</body> 
</html>

<?php
$conn = mysqli_connect("localhost","root","", "useraccount");

if(!$conn){
    echo "Unable to connect ".mysql_error();
}

if(isset($_POST["submit"])){
    $username = $_POST["uname"];
    $password = $_POST["pwd"];
    $accType = $_POST["accountType"];
    
    $query = "select * from login where username='$username' and password='$password' and type='$accType'";

    $result = mysqli_query($conn,$query);

    while($row = mysqli_fetch_array($result)){
        if($row["username"]==$username && $row["password"]==$password && $row["type"]=='Admin'){
            header("Location:index.php");
        }
        else if($row["username"]=$username && $row["password"]==$password && $row["type"]=='User'){
            header("Location:sensors.php");
        }
    }
}
?>

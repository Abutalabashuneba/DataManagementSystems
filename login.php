<?php
session_start();

/*000webhost setting
$conn = mysqli_connect("localhost","id13151294_abutalabashuneba","nM*z+j{Bc^5#Qh?H", "id13151294_useraccount");
*/

$conn = mysqli_connect("localhost","root","", "useraccount");

if(!$conn){
    echo "Unable to connect ".mysql_error();
}

$msg = "";

if(isset($_POST["submit"])){
    $username = $_POST["uname"];
    $password = $_POST["pwd"];
    $password = sha1($password);
    $accType = $_POST["accountType"];
    
    $query = "select * from login where username='$username' and password='$password' and type='$accType'";

    $result = mysqli_query($conn,$query);
    $row = mysqli_num_rows($result);

    if($row == 0){
        $msg = "Invalid username/password/accountType";
    }

    while($row = mysqli_fetch_array($result)){
        if($row["username"]==$username && $row["password"]==$password && $row["type"]=='Admin'){
            header("Location:index.html");
        }
        else if($row["username"]==$username && $row["password"]==$password && $row["type"]=='User'){
            header("Location:sensors.html");
        }
    }
}
?>

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
            <div class="col-md-4 col-sm-3 col-xs-1">
            </div>    

            <div class="col-md-4 col-sm-6 col-xs-10">
                <form action="#" class="form_container" method="POST">
                    <h2 class="text-center">Login</h2>

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
                    
                    <button type="submit" name="submit" class="btn btn-primary btn-block">
                        Login
                    </button>

                    <h6 class="text-danger text-center"><?= $msg; ?></h6>
                </form>
            </div>
        </div>
    </div>

    <script src="js/jquery.min.js"></script> 
	<script src="js/bootstrap.min.js"></script> 
	
</body> 
</html>

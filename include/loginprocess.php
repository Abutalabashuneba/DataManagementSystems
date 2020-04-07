<?php
/*000webhost setting
$conn = mysqli_connect("localhost","id13151294_abutalabashuneba","nM*z+j{Bc^5#Qh?H", "id13151294_useraccount");
*/
if(isset($_POST["login"])){
    require "databaseConn.php";

    $username = $_POST["uname"];
    $password = $_POST["pwd"];
    $accType = $_POST["accountType"];
    
    $query = "SELECT * FROM test WHERE username=?;";
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt,$query)){
        header("Location:../login.php?error=sqlerror");
        exit();
    }
    else{
        mysqli_stmt_bind_param($stmt,"s",$username);
        mysqli_stmt_execute($stmt);
        
        $result = mysqli_stmt_get_result($stmt);

        if($row = mysqli_fetch_assoc($result)){
            $pwdCheck = password_verify($password,$row['password']);
            $typeCheck = $row['type'] == $accType;

            if($pwdCheck == false){
                header("Location:../login.php?error=wrongPass");
                exit();
            }
            else if($pwdCheck == true && $typeCheck == true){
                session_start();
                $_SESSION["user"] = $row["username"];
                $_SESSION["type"] = $row["type"];

                header("Location:../index.php?login=success");
                exit();
            }
            else{
                header("Location:../login.php?error=wrongType");
                exit();
            }
        }
        else{
            header("Location:../login.php?error=noUserFound");
            exit();
        }
    }
}

else{
    header("Location:../login.php");
    exit();
}
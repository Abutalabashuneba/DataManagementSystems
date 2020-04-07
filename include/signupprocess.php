<?php
    require "databaseConn.php";

if(isset($_POST[signup])){
    $username = $_POST["uname"];
    $password = $_POST["pwd"];
    $accType = $_POST["accountType"];

    $query = "SELECT username FROM test WHERE username=?;";
    $stmt = mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt,$query)){
        header("Location: ../signup.php?error=sqlerror");
        exit();
    }

    else{
        mysqli_stmt_bind_param($stmt,"s",$username);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        $result = mysqli_stmt_num_rows($stmt);

        if($result > 0){
            header("Location: ../signup.php?error=userTaken");
            exit();
        }

        else{
            $query = "INSERT INTO test (username, password, type) VALUES (?,?,?)";
            $stmt = mysqli_stmt_init($conn);

            if(!mysqli_stmt_prepare($stmt,$query)){
                header("Location: ../signup.php?error=sqlerror");
                exit();
            }
            else{
                $hashpw = password_hash($password,PASSWORD_DEFAULT);

                mysqli_stmt_bind_param($stmt, "sss", $username, $hashpw, $accType);
                mysqli_stmt_execute($stmt);
                header("Location: ../signup.php?signup=success");
                exit();
            }
        }
    }
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}

else{
    header("Location:../signup.php");
    exit();
}
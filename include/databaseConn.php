<?php
    
    $conn = mysqli_connect("localhost","root","", "useraccount");

    if(!$conn){
        echo "Unable to connect ".mysql_error();
    }
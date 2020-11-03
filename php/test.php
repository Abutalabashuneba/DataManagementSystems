<?php
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "http://18.140.137.167/api/v1/data");
    $headers = ["Gateway-API-Key: q6AC9pagsAs057rj3EoAjZAJw2BXkcsK"];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);

    curl_close($ch);

    echo "<pre>{$output}</pre>";
    //$decodeJSON = json_decode($output, true);
    //$test = "hi";
    // echo "<pre>";
    // echo sizeof($decodeJSON["data"]);
    // print_r ($decodeJSON["data"]);
    // echo "</pre>";



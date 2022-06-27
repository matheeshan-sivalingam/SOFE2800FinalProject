
<?php

if (!empty($_POST)){
    $dbhost = "localhost";
    $username = "root";
    $password = "";
    $dbname = "finalProject";
    
    $connection=mysqli_connect ($dbhost,$username,$password,$dbname);
    if (mysqli_connect_errno()) {
        die ("Database connection failed ".mysqli_connect_error()."(".mysqli_connect_errno().")");
    }

    $products = $_POST['data'];
    $cost = $_POST['cost'];


    $SAfname = $_POST['SAfname'];
    $SAlname = $_POST['SAlname'];
    $SAaddress = $_POST['SAaddress'];
    $SAprov = $_POST['SAprov'];
    $SAcity = $_POST['SAcity']; 
    $SApost = $_POST['SApost'];

    $BAfname = $_POST['BAfname'];
    $BAlname = $_POST['BAlname'];
    $BAaddress = $_POST['BAaddress'];
    $BAprov = $_POST['BAprov'];
    $BAcity = $_POST['BAcity']; 
    $BApost = $_POST['BApost'];

    $Email = $_POST['Email'];
    $Phone = $_POST['Phone'];
    
    $CHName = $_POST['CHName'];
    $CardNum = $_POST['CardNum'];
    $CVV = $_POST['CVV'];

    $sql = "INSERT INTO invoice (SAfname, SAlname, SAaddress, SAprov, SAcity,
    SApost, BAfname, BAlname, BAaddress, BAprov, BAcity, BApost, Email, 
    Phone, CHName, CardNum, CVV, Cost, Products) VALUES (
        '{$connection->real_escape_string($_POST['SAfname'])}',
        '{$connection->real_escape_string($_POST['SAlname'])}',
        '{$connection->real_escape_string($_POST['SAaddress'])}',
        '{$connection->real_escape_string($_POST['SAprov'])}',
        '{$connection->real_escape_string($_POST['SAcity'])}',
        '{$connection->real_escape_string($_POST['SApost'])}',
        '{$connection->real_escape_string($_POST['BAfname'])}',
        '{$connection->real_escape_string($_POST['BAlname'])}',
        '{$connection->real_escape_string($_POST['BAaddress'])}',
        '{$connection->real_escape_string($_POST['BAprov'])}',
        '{$connection->real_escape_string($_POST['BAcity'])}',
        '{$connection->real_escape_string($_POST['BApost'])}',
        '{$connection->real_escape_string($_POST['Email'])}',
        '{$connection->real_escape_string($_POST['Phone'])}',
        '{$connection->real_escape_string($_POST['CHName'])}',
        '{$connection->real_escape_string($_POST['CardNum'])}',
        '{$connection->real_escape_string($_POST['CVV'])}',
        '{$connection->real_escape_string($_POST['cost'])}',
        '{$connection->real_escape_string($_POST['data'])}')";

    $insert = $connection->query($sql);
    if ($insert == TRUE) {
        header('Location: purchaseComplete.html');
    }
    else {
        die("Error: {$connection->errorno} : {$connection->error}");
    }
}


    ?>
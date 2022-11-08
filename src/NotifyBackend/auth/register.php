<?php

require '../connection.php';

if(isset($_GET['register'])){

    $email = $_GET['email'];
    $password = $_GET['password'];

    $query = "INSERT INTO users (email,password) VALUES ('$email','$password')";
    $result = mysqli_query($CONNECT,$query);
    echo $result;

}else{
    echo "send data";
}
?>
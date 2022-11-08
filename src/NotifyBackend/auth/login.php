<?php
require '../connection.php';

if (isset($_GET['login'])){

    $email = $_GET['email'];
    $password = $_GET['password'];

    $query = "SELECT id,email FROM users WHERE email='$email' AND password='$password'";
    $run_query = mysqli_query($CONNECT,$query);
    $num = mysqli_num_rows($run_query);
    if($num==1){
        $res = mysqli_fetch_assoc($run_query);
        echo json_encode($res);
    }else{
        echo "failed";
    }
}else{
    echo "send data";
}

?>
<?php
require "../connection.php";

if (isset($_GET['addNotification'])){
   
    $user_id = $_GET['user_id'];
    $notify_date = $_GET['notify_date'];
    $notify_info = $_GET['notify_info'];

    $query = "INSERT INTO notifications (user_id,notify_date,notify_info) VALUES ('$user_id','$notify_date','$notify_info')";
    $run_query = mysqli_query($CONNECT,$query);
    echo $run_query;
}else{
    echo "send data";
}

?>
<?php
require "../connection.php";

if (isset($_GET['updateItem'])){

    $id = $_GET['id'];
    $notify_date = $_GET['notify_date'];
    $notify_info = $_GET['notify_info'];

    $query = "UPDATE notifications SET notify_date = '$notify_date', notify_info = '$notify_info' WHERE id = $id";
    $run_query = mysqli_query($CONNECT,$query);
    echo $run_query;
}else{
    echo "send data";
}

?>
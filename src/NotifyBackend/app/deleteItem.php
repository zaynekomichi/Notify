<?php

require "../connection.php";

if(isset($_GET['deleteItem'])){
    $id = $_GET['id'];

    $query = "DELETE FROM notifications WHERE id = $id";
    $run_query = mysqli_query($CONNECT,$query);
    echo $run_query;
}

?>
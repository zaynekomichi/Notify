<?php
    require "../connection.php";
    if(isset($_GET['allData'])){
        $user_id = $_GET['user_id'];

        $query = "SELECT * FROM notifications WHERE user_id = $user_id";
        $run_query = mysqli_query($CONNECT,$query);
        $result = $run_query->fetch_all(MYSQLI_ASSOC);
        echo json_encode($result);
    }else{
        echo "send Data";
    }

?>
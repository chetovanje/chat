<?php
include('database.php');

$query = "select * from chat order by rand() limit 1";
$q = mysqli_query($db,$query);

$row = mysqli_fetch_assoc($q);
echo "!".$row['message']." - ".$row['user'];

?>
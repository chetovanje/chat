<?php
include('database.php');

$query = "select * FROM(SELECT * FROM chat ORDER BY timestamp DESC LIMIT 50)sub ORDER BY timestamp ASC";
$q = mysqli_query($db, $query);

while($row = mysqli_fetch_assoc($q)) {
        echo $row["timestamp"].'$'.$row["user"].'<'.$row["message"]."\n";
    }

mysqli_close($db);
?>
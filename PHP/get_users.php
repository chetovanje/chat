<?php

include('database.php');

$query = "SELECT * FROM users";
$q = mysqli_query($db, $query);

while($row = mysqli_fetch_assoc($q)) {
        echo $row["user"]."@".$row['color'].'!!';
    }

mysqli_close($db);
?>
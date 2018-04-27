<?php

include('database.php');

$last_message_date = $_GET['last_message_date'];
$check = "SELECT * FROM (SELECT * FROM chat ORDER BY timestamp DESC LIMIT 1)sub where timestamp ='$last_message_date';"; //last message's date
$q1 = mysqli_query($db, $check);
$r = mysqli_num_rows($q1);

if ($r != "0") {
    echo mysqli_num_rows($q1)."!";
}

else{
$query = "select * FROM(SELECT * FROM chat ORDER BY timestamp DESC LIMIT 50)sub ORDER BY timestamp ASC";
$q = mysqli_query($db, $query);

while($row = mysqli_fetch_assoc($q)) {
        echo $row["timestamp"].'$'.$row["user"].'<'.$row["message"]."\n";
    }
}
mysqli_close($db);
?>
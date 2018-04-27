<?php

include('database.php');

$query = "SELECT * FROM Persons";
$q = mysqli_query($db, $query);

$row = mysqli_fetch_assoc($q);

while($row = mysqli_fetch_assoc($q))
{
 echo $row['PersonID'];
}


mysqli_close($conn);
?>

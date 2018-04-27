<?php

include('database.php');

$color = $_GET['color'];
$user = $_GET['user'];

$query = "UPDATE users SET color = '$color'  WHERE user = '$user' ";

if (!mysqli_query($db, $query))
  {
  echo("Error description: " . mysqli_error($db));
  }
  mysqli_close($db);

?>
<?php

include('database.php');

$id = $_GET['id'];
$name = $_GET['name'];
$color = $_GET['color'];

$query = "INSERT INTO users(id, user, color) VALUES('$id','$name','$color')";

if (!mysqli_query($db, $query))
  {
  echo("Error description: " . mysqli_error($db));
  }
  mysqli_close($db);
?>


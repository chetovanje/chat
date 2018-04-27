<?php

include('database.php');

date_default_timezone_set("Europe/Belgrade");

$timestamp = $_GET['timestamp'];
$user = $_GET['user'];
$message = $_GET['message'];

$query = "INSERT INTO chat(timestamp,user,message) VALUES('$timestamp', '$user', '$message')";

if (!mysqli_query($db, $query))
  {
  echo("Error description: " . mysqli_error($db));
  }

  mysqli_close($db);
?>
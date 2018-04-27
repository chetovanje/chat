<?php

include('database.php');

$user = $_GET['ime'];

$query = "DELETE FROM users WHERE user='$user'";

if (!mysqli_query($db, $query)) {
    echo("Error description: " . mysqli_error($db));
}

mysqli_close($db);
?>
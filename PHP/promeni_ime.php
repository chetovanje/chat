<?php
include('database.php');

$novo_ime = $_GET['novo_ime'];
$staro_ime = $_GET['ime'];


$query = "UPDATE users SET user='$novo_ime' WHERE user='$staro_ime'";
$q = mysqli_query($db, $query);
?>


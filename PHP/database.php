<?php

$hostname='localhost';
$user = 'ml12087';
$password = 'dragonnetwork';
$mysql_database = 'user';

$db = mysqli_connect('localhost', $user, $password);  //poslednji argument je default databaza za povezivanje

mysqli_select_db($db, 'ml12087');

 ?>
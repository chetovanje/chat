<?php

//include('database.php')
?>

<?php

$title = $_GET["title"];
$author = $_GET['author'];
$type = $_GET['type'];
$status = $_GET['status'];
$date = date('D-m-y h:i:sa');
//ovo je starija ideja, preko baze podataka
//$query = "INSERT INTO books (title,author,type,status,date) VALUES('$title','$author','$type', '$status','$date')";
//$q = mysqli_query($db, $query);

$myfile = fopen('books.txt', 'a+');
fwrite($myfile, $title." , ".$author." , ".$type." , ".$status." , ".$date."\n");
fclose($myfile);
?>
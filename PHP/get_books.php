<?php
$myfile = fopen('books.txt','r');
echo fread($myfile, filesize('books.txt'));
fclose($myfile);
?>
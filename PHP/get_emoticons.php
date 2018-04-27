<?php

$dir = "../emoji/img/187129-emoticons/png";
$files1 = scandir($dir);

//print_r($files1);

for($i = 2; $i <= sizeof($files1) - 1; $i++)
{
    echo $files1[$i]."\n";
}

?>
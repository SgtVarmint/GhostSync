<?php

$newUserId = $_POST["newUserId"];

$data = $newUserId . "\n";
$myFile = fopen("/var/www/html/data/userIdList.txt", "a") or die("Unable to open file!");
fwrite($myFile, $data);
fclose($myFile);

echo "User Added"

?>
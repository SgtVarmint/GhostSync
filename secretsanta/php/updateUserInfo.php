<?php

$userId = $_POST["userId"];
$userData = $_POST["userData"];

$myfile = fopen("/var/www/html/secretsanta/data/" . $userId . ".txt", "w") or die("Unable to open file!");
fwrite($myfile, $userData);
fclose($myfile);

echo "Success";

?>
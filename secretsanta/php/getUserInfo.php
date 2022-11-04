<?php

$userId = $_POST["userId"];

$file = file_get_contents("../data/" . $userId . ".txt");

echo $file;

?>
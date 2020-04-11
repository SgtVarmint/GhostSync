<?php

$lobbyName = $_POST["lobbyName"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . ".txt", "r") or die("Unable to open file!");
echo fread($myfile, filesize("/var/www/html/lobbies/" . $lobbyName . ".txt"));
$command = "date +%s%3N";
$data = shell_exec($command);
echo "^" . $data;
fclose($myfile);

?>
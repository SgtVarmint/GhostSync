<?php

$lobbyName = $_POST["lobbyName"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . ".txt", "r") or die("Unable to open file!");
echo fread($myfile, filesize("/var/www/html/lobbies/" . $lobbyName . ".txt"));
fclose($myfile);

?>
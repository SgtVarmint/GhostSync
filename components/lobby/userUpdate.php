<?php

$lobbyName = $_POST["lobbyName"];
$userName = $_POST["userName"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . "_USERS.txt", "r") or die("Unable to open file!");
$ fread($myfile, filesize("/var/www/html/lobbies/" . $lobbyName . ".txt"));
fclose($myfile);

?>
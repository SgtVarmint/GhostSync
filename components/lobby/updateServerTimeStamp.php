<?php

$lobbyName = $_POST["lobbyName"];
$timeStamp = $_POST["timeStamp"];
$serverTime = $_POST["serverTime"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . ".txt", "w") or die("Unable to open file!");
fwrite($myfile, $timeStamp . "^" . $serverTime);
fclose($myfile);

?>
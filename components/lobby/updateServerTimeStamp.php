<?php

$lobbyName = $_POST["lobbyName"];
$timeStamp = $_POST["timeStamp"];
$serverTime = $_POST["serverTime"];
$playState = $_POST["playState"];
$filePath = $_POST["filePath"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . ".txt", "w") or die("Unable to open file!");
fwrite($myfile, $timeStamp . "^" . $serverTime . "^" . $playState . "^" . $filePath);
fclose($myfile);

?>
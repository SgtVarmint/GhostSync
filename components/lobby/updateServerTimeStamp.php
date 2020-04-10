<?php

$lobbyName = $_POST["lobbyName"];
$timeStamp = $_POST["timeStamp"];
$userUpdated = $_POST["userUpdated"];

$command = "date +%s%3N";

$serverTime = shell_exec($command);
$playState = $_POST["playState"];
$filePath = $_POST["filePath"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . ".txt", "w") or die("Unable to open file!");
fwrite($myfile, $timeStamp . "^" . $serverTime . "^" . $playState . "^" . $filePath . "^" . $userUpdated);
fclose($myfile);

?>
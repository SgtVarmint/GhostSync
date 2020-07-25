<?php

$trackingInfoString = $_POST["trackingInfoString"];
$lobbyName = $_POST["lobbyName"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . "_TRACKING.txt", "w") or die("Unable to open file!");
fwrite($myfile, $trackingInfoString);
fclose($myfile);

?>
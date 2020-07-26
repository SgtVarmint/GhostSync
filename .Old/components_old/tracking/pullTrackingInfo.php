<?php

$lobbyName = $_POST["lobbyName"];

$file = file_get_contents("/var/www/html/lobbies/" . $lobbyName . "_TRACKING.txt");
#$trackingInfo = explode("\n", $file);

echo $file;

?>
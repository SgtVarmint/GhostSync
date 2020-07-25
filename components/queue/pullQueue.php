<?php

$lobbyName = $_POST["lobbyName"];

$file = file_get_contents("/var/www/html/lobbies/" . $lobbyName . "_QUEUE.txt");

echo $file;

?>
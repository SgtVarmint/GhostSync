<?php

$queueString = $_POST["queueString"];
$lobbyName = $_POST["lobbyName"];

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . "_QUEUE.txt", "w") or die("Unable to open file!");
fwrite($myfile, $queueString);
fclose($myfile);

?>
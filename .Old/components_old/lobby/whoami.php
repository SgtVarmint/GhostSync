<?php

$command = "whoami";
//$command = "ls -1 " . $_POST["rootDir"] . " | tr '\n' '|'";

$data = shell_exec($command);
echo $data;

?>
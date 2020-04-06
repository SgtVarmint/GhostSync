<?php

$command = "ls -1 '" . $_POST["rootDir"] . $_POST["subDir"] . "' | tr '\n' '|'";
//$command = "ls -1 " . $_POST["rootDir"] . " | tr '\n' '|'";

$data = shell_exec($command);
echo $data;

?>
<?php

$command = "ls -R " . $_POST["rootDir"] . " | tr '\t' '\n' | sed 's/^$/--/g'";
$data = shell_exec($command);
echo $data;

?>
<?php

$command = "date +%s%3N";

$data = shell_exec($command);
echo $data;

?>
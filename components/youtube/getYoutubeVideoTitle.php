<?php

$url = $_POST["url"];

$command = "wget -qO- " . $url . " | grep -o '\\\\\"title\\\\\":\\\\\".*\\\\\",\\\\\"lengthSeconds\\\\\":' | sed s/.*:..// | sed s/\\\\\\\\\\\".*//";
//$command = "wget -qO- " . $url . " | sed s/\\// | grep -o '\"title\":\".*\",\"lengthSeconds\":'";

$data = shell_exec($command);

echo $data;

?>
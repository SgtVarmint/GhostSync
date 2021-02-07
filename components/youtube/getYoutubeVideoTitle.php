<?php

$url = $_POST["url"];

$command = "sh getYoutubeVideoTitle.sh " . $url;
//$command = "wget -qO- " . $url . " | sed s/\\// | grep -o '\"title\":\".*\",\"lengthSeconds\":'";

$data = shell_exec($command);

echo $data;

?>
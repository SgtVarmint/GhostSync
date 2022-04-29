<?php

$accessCode = $_POST["accessCode"];
$accessCode = trim($accessCode);

$myfile = fopen("access.txt", "r") or die("Unable to open file!");
$keyFile = fread($myfile, filesize("access.txt"));
fclose($myfile);

$granted = false;

$keys = explode("\n", $keyFile);

foreach ($keys as $key)
{
	if ($accessCode == trim($key))
	{
		$granted = true;
	}
}

if ($granted)
{
	echo "gs:YrehJb5njkXW1lm39yiF@";
}
else
{
	echo "denied";
}

?>
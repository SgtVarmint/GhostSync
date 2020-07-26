<?php

$accessCode = $_POST["accessCode"];
$accessCode = trim($accessCode);

$myfile = fopen("/var/www/html/components/authentication/access.txt", "r") or die("Unable to open file!");
$keyFile = fread($myfile, filesize("/var/www/html/components/authentication/access.txt"));
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
	echo "granted";
}
else
{
	echo "denied";
}

?>
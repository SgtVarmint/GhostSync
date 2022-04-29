<?php
	$accessCode = trim($_POST['accessCode']);
	//figure out a better way to do pathing here
	$myfile = fopen('access.txt', 'r') or die('Unable to open access key file!');
	$keyFile = fread($myfile, filesize('access.txt'));
	fclose($myfile);
	$keys = explode("\r\n", $keyFile);
	echo checkAuth($accessCode, $keys);

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
?>
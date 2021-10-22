<?php
	$accessCode = trim($_POST["accessCode"]);

	$myfile = fopen("access.txt", "r") or die("Unable to open file!");
	$keyFile = fread($myfile, filesize("access.txt"));
	fclose($myfile);

	$keys = array_map('trim', explode("\n", $keyFile));
	in_array($accessCode, $keys) ? print_r("true") : print_r("false");
?>
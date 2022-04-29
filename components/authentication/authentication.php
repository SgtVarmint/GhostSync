<?php
	$accessCode = trim($_POST['accessCode']);
	//figure out a better way to do pathing here
	$myfile = fopen('access.txt', 'r') or die('Unable to open access key file!');
	$keyFile = fread($myfile, filesize('access.txt'));
	fclose($myfile);
	$keys = explode("\r\n", $keyFile);
	echo checkAuth($accessCode, $keys);

	function checkAuth($accessCode, $keys){
		foreach($keys as $key){
			if($accessCode === $key){
				return 'gs:YrehJb5njkXW1lm39yiF';
			}
		}
		return 'denied';
	}
?>
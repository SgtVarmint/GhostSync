<?php

//This value is used to determine if a user is currently in the lobby
$USER_TIMEOUT = 7.0;

$lobbyName = $_POST["lobbyName"];
$userName = $_POST["userName"];
$timeStamp = $_POST["timeStamp"];
$activity = $_POST["activity"];
$queuedReaction = $_POST["queuedReaction"];

$file = file_get_contents("/var/www/html/lobbies/" . $lobbyName . "_USERS.txt");


//Gets current server time
$command = "date +%s%3N | sed 's/...$/.&/'";
$temp = shell_exec($command);
$currentTime = trim($temp);

//This is an array of all users in 'userName^timeStamp^videoTime^activity' format
$userInfo = explode("#", $file);

$newFileContents = "";

$userFound = false;

foreach ($userInfo as $user)
{
	$info = explode("^", $user);
	//$info[0] is the current user's username
	//$info[1] is the current user's timestamp of when they last updated their status
	//$info[2] is the current user's timestamp of their video
	//$info[3] is the current state of the user (active or away)
	//$info[4] is the current user's reaction (if sent) to be shown to the lobby
	
	$difference = (float)$currentTime - (float)$info[1];
	
	if ($info[0] == $userName)
	{
		$userFound = true;
		$newFileContents .= $info[0] . "^" . $currentTime . "^" . $timeStamp . "^" . $activity . "^" . $queuedReaction . "#";
	}
	else if($difference < $USER_TIMEOUT)
	{
		$newFileContents .= $user . "#";
	}
}

if ($userFound == false)
{
	$newFileContents .= $userName . "^" . $currentTime . "^" . $timeStamp . "^" . $activity . "^" . $queuedReaction . "#";
}

$myfile = fopen("/var/www/html/lobbies/" . $lobbyName . "_USERS.txt", "w") or die("Unable to open file!");
fwrite($myfile, $newFileContents);
fclose($myfile);

echo $newFileContents;

?>
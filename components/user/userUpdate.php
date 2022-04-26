<?php
//This value is used to determine if a user is currently in the lobby
$USER_TIMEOUT = 7.0;

$lobbyName = $_POST["lobbyName"];
$userName = $_POST["userName"];
$userId = $_POST["userId"];
$timeStamp = $_POST["timeStamp"];
$activity = $_POST["activity"];
$queuedReaction = $_POST["queuedReaction"];
$userId = $_POST["userId"];

$userFilePath = "/var/www/html/lobbies/" . $lobbyName . "_USERS.txt";
$file = file_get_contents($userFilePath);

//Gets current server time
$currentTime = round(microtime(true)*1000);

//This is an array of all users in 'userName^timeStamp^videoTime^activity' format
$userInfo = explode("#", $file);
$newFileContents = "";
$userFound = false;
$duplicates = -1;

foreach ($userInfo as $user)
{
	$info = explode("^", $user);
	if(count($info) > 1){
		//$info[0] is the current user's username
		//$info[1] is the current user's timestamp of when they last updated their status
		//$info[2] is the current user's timestamp of their video
		//$info[3] is the current state of the user (active or away)
		//$info[4] is the current user's reaction (if sent) to be shown to the lobby
		//$info[5] is the current user's id
		
		$difference = (float)$currentTime - (float)$info[1];		
		if ($info[5] === $userId)
		{
			$userFound = true;
			$newFileContents .= $userName . "^" . $currentTime . "^" . $timeStamp . "^" . $activity . "^" . $queuedReaction . "^" . $userId . "#";
		}
		else if($difference < $USER_TIMEOUT)
		{
			$newFileContents .= $user . "#";
		}
	}
}

if ($userFound == false)
{
	$newFileContents .= $userName . "^" . $currentTime . "^" . $timeStamp . "^" . $activity . "^" . $queuedReaction . "^" . $userId . "#";
}

$myfile = fopen($userFilePath, "w") or die("Unable to open file!");
fwrite($myfile, $newFileContents);
fclose($myfile);

echo $newFileContents;

?>
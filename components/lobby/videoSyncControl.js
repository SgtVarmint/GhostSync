function syncPull()
{
	//This function relays a call to syncVideo(), but can have code added in the future specific to the update timer
	syncVideo();
}

function updateServerTimeStamp()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","updateServerTimeStamp.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	getServerTime();
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&timeStamp=" + document.getElementById("video").currentTime + "&serverTime=" + document.getElementById("serverTime").value + "&playState=" + document.getElementById("playState").value + "&filePath=" + document.getElementById("filePath").value);
}

function syncVideo()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","getServerTimeStamp.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			syncVideoAction(this);
		}
	}
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value);
}

function syncVideoAction(file)
{
	var info = file.responseText.split("^");
	//Index 0 is the video timestamp
	//Index 1 is the server time when it was last updated timestamp
	//Index 2 is the play state: either 'playing' or 'paused'
	//Index 3 is the complete file path URL for the video
	
	if (info[3] != document.getElementById("filePath").value)
	{
		document.getElementById("filePath").value = info[3];
		document.getElementById("videoSource").src = info[3];
		document.getElementById("video").load();
	}
	
	getServerTime();
	
	var timeOffset = document.getElementById("serverTime").value - info[1];
	var newTimeStamp = parseFloat(info[0]) + parseFloat(timeOffset);
	if (timeOffset > 0.3)
	{
		document.getElementById("video").currentTime = newTimeStamp;
	}
	if (info[2] == "playing")
	{
		document.getElementById("video").play();
	}
	else
	{
		document.getElementById("video").pause();
	}
}

function getServerTime()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","getServerTime.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			getServerTimeAction(this);
		}
	}
	xhttp.send();
}

function getServerTimeAction(file)
{
	var temp = file.responseText;
	var serverTime = temp.slice(0, temp.length - 4) + "." + temp.slice(temp.length - 4, temp.length - 1)
	document.getElementById("serverTime").value = serverTime;
}
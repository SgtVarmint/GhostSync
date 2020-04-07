function syncPull()
{
	//This function relays a call to syncVideo(), but can have code added in the future specific to the update timer
	syncVideo();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//This value is to control whether this function should act as if called manually, or from clicking on UI//
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var suppressUpdate = false;
function updateServerTimeStamp()
{
	if (suppressUpdate == true)
	{
		document.getElementById("debug").innerHTML = "suppressed";
		suppressUpdate = false;
	}
	else
	{
		document.getElementById("debug").innerHTML = "allowed";
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST","updateServerTimeStamp.php",true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&timeStamp=" + document.getElementById("video").currentTime + "&playState=" + document.getElementById("playState").value + "&filePath=" + document.getElementById("filePath").value);
	}
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
	////////////////////////
	//Sync Tolerance Value//
	////////////////////////
	var TOLERANCE = .15;
	
	var info = file.responseText.split("^");
	//Index 0 is the video timestamp
	//Index 1 is the server time when it was last updated timestamp
	//Index 2 is the play state: either 'playing' or 'paused'
	//Index 3 is the complete file path URL for the video
	
	
	var storedServerTime = info[1].slice(0, info[1].length - 4) + "." + info[1].slice(info[1].length - 4, info[1].length - 1);
	getServerTime();
	var timeOffset = parseFloat(document.getElementById("serverTime").value) - parseFloat(storedServerTime);
	var newTimeStamp = parseFloat(info[0]) + timeOffset;
	
	if (document.getElementById("filePath").value != info[3])
	{
		document.getElementById("filePath").value = info[3];
		document.getElementById("videoSource").src = info[3];
		document.getElementById("playState").value = "paused";
		document.getElementById("video").load();
	}
	
	if (document.getElementById("video").currentTime > newTimeStamp + TOLERANCE || document.getElementById("video").currentTime < newTimeStamp - TOLERANCE)
	{
		if (info[2] == "playing")
		{
			document.getElementById("video").currentTime = newTimeStamp;
			//document.getElementById("playState").value = "playing";
			suppressUpdate = true;
			document.getElementById("video").play();
			suppressUpdate = false;
		}
		else if (info[2] == "paused")
		{
			//document.getElementById("playState").value = "paused";
			suppressUpdate = true;
			document.getElementById("video").pause();
			suppressUpdate = false;
		}
	}
	else
	{
		if (info[2] == "playing")
		{
			suppressUpdate = true;
			document.getElementById("video").play();
			suppressUpdate = false;
		}
		else if (info[2] == "paused")
		{
			suppressUpdate = true;
			document.getElementById("video").pause();
			suppressUpdate = false;
		}
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
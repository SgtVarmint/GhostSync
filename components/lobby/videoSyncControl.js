//This method is unnecessary, but was put in incase some mediary code is needed when calling before syncing
function syncPull()
{
	syncVideo();
}

//Goes into the lobby file and updates current video timestamp, system time, current playstate, video file being played, and the user who submitted the update
function updateServerTimeStamp()
{

	document.getElementById("debug").innerHTML = "allowed";
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","updateServerTimeStamp.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&timeStamp=" + document.getElementById("video").currentTime + "&playState=" + document.getElementById("playState").value + "&filePath=" + document.getElementById("filePath").value + "&userUpdated=" + localStorage.getItem("userName"));
}

//Ajax portion of sync function
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

//Method stemming from sync video
function syncVideoAction(file)
{
	var info = file.responseText.split("^");
	//Index 0 is the video timestamp
	//Index 1 is the server time when it was last updated timestamp
	//Index 2 is the play state: either 'playing' or 'paused'
	//Index 3 is the complete file path URL for the video
	//Index 4 is the username of who posted the update
	
	var storedServerTime;
	if (info[1] != undefined)
	{
		var fullPath = info[3].split("/");
		var nowPlaying = fullPath[fullPath.length-1];
		document.getElementById("nowPlaying").innerHTML = nowPlaying;
		
		storedServerTime = info[1].slice(0, info[1].length - 4) + "." + info[1].slice(info[1].length - 4, info[1].length - 1);
		getServerTime();
		var timeOffset = parseFloat(document.getElementById("serverTime").value) - parseFloat(storedServerTime);
		var newTimeStamp = parseFloat(info[0]) + timeOffset;
		
		//Checks if a new video was chosen for play, and changes to it if true
		if (document.getElementById("filePath").value != info[3])
		{
			document.getElementById("filePath").value = info[3];
			document.getElementById("videoSource").src = info[3];
			document.getElementById("playState").value = "paused";
			document.getElementById("video").load();
			toast(info[4] + " Chose A New Video");
		}
		//This is the driving force behind the sync function
		//If the video on client is out of sync by greater than or less than the TOLERANCE value (set in config.js file), then video will be synced update
		//This method will also handle pausing and playing;
		if (document.getElementById("video").currentTime > newTimeStamp + TOLERANCE || document.getElementById("video").currentTime < newTimeStamp - TOLERANCE)
		{
			if (info[2] == "playing" && document.getElementById("video").paused)
			{
				document.getElementById("video").currentTime = newTimeStamp;
				document.getElementById("playState").value = "playing";
				document.getElementById("video").play();
				document.getElementById("playButton").innerHTML = "&#x23f8;";
				if (fullscreenEnabled)
					toast(info[4] + " Played The Video..", 3, "#player", "0", "0", "0", "-175px");
				else
					toast(info[4] + " Played The Video..");
			}
			else if (info[2] == "paused" && !document.getElementById("video").paused)
			{
				document.getElementById("playState").value = "paused";
				document.getElementById("video").pause();
				document.getElementById("playButton").innerHTML = "&#x25b6;";
				if (fullscreenEnabled)
					toast(info[4] + " Played The Video..", 3, "#player", "0", "0", "0", "-175px");
				else
					toast(info[4] + " Paused The Video..");
				
			}
		}
		else
		{
			if (info[2] == "playing" && document.getElementById("video").paused)
			{
				//suppressUpdate = true;
				document.getElementById("video").play();
				//suppressUpdate = false;
				document.getElementById("playButton").innerHTML = "&#x23f8;";
				if (fullscreenEnabled)
					toast(info[4] + " Played The Video..", 3, "#player", "0", "0", "0", "-175px");
				else
					toast(info[4] + " Played The Video..");
			}
			else if (info[2] == "paused" && !document.getElementById("video").paused)
			{
				//suppressUpdate = true;
				document.getElementById("video").pause();
				//suppressUpdate = false;
				document.getElementById("playButton").innerHTML = "&#x25b6;";
				if (fullscreenEnabled)
					toast(info[4] + " Paused The Video..", 3, "#player", "0", "0", "0", "-175px");
				else
					toast(info[4] + " Paused The Video..");
			}
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
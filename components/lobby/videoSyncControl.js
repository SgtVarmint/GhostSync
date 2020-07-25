function syncPull()
{
	pullTrackingInfo();
	pullQueue();
	checkForMobile();
	if (!isYoutubeVideo())
	{
		var timestamp = document.getElementById("video").currentTime;
		var duration = document.getElementById("video").duration;
		if (duration - 6 < timestamp)
		{
			playButtonClicked(true);
		}
	}
	syncVideo();
}

//Goes into the lobby file and updates current video timestamp, system time, current playstate, video file being played, and the user who submitted the update
function updateServerTimeStamp(overrideTimestamp = 0.0)
{
	var timeStamp;
	
	if (overrideTimestamp == 0.0)
	{
		timeStamp = isYoutubeVideo() ? youtubePlayer.getCurrentTime() : document.getElementById("video").currentTime;
	}
	else
	{
		timeStamp = overrideTimestamp;
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","updateServerTimeStamp.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&timeStamp=" + timeStamp + "&playState=" + document.getElementById("playState").value + "&filePath=" + document.getElementById("filePath").value + "&userUpdated=" + localStorage.getItem("userName"));
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

var currentTime;
var paused;
var videoDuration;
//Method stemming from sync video
function syncVideoAction(file)
{
	var info = file.responseText.split("^");
	//Index 0 is the video timestamp
	//Index 1 is the server time when it was last updated timestamp
	//Index 2 is the play state: either 'playing' or 'paused'
	//Index 3 is the complete file path URL for the video
	//Index 4 is the username of who posted the update
	//Index 5 is the current system time when request was fetched
	
	//DEBUG SECTION
	var d = document.getElementById("debug");
	////////////////////////////
	//d.style.display = "block";
	////////////////////////////
	d.innerHTML = "";
	
	var storedServerTime;
	var currentServerTime;
	if (info[1] != undefined)
	{
		storedServerTime = info[1].slice(0, info[1].length - 4) + "." + info[1].slice(info[1].length - 4, info[1].length - 1);
		currentServerTime = info[5].slice(0, info[5].length - 4) + "." + info[5].slice(info[5].length - 4, info[5].length - 1);
		var timeOffset = parseFloat(currentServerTime) - parseFloat(storedServerTime);
		var newTimeStamp = parseFloat(info[0]) + timeOffset;
		
		var videoPlayer = document.getElementById("video");
		var aspectRatio = parseFloat(videoPlayer.videoWidth) / parseFloat(videoPlayer.videoHeight);
		d.innerHTML += "Aspect Ratio: " + aspectRatio + "<br>";
		
		//Checks if a new video was chosen for play, and changes it if true
		if (document.getElementById("filePath").value != info[3])
		{
			document.getElementById("filePath").value = info[3];
			
			if (isYoutubeVideo())
			{
				//youtubePlayer.loadVideoById(document.getElementById("filePath").value, 0);
			}
			else
			{
				document.getElementById("videoSource").src = info[3];
				document.getElementById("video").load();
			}
			document.getElementById("playState").value = "paused";
			toast(info[4] + " Chose A New Video");
			
			videoEnded = false;
		}

		//Detect aspect ratio of video and set css class
		if (aspectRatio > 2.0)
		{
			document.getElementById("video").className = fullscreenEnabled ? "widescreenVideo_fullscreen" : "widescreenVideo";
		}
		else if (aspectRatio > 1.5)
		{
			document.getElementById("video").className = fullscreenEnabled ? "fullVideo_fullscreen" : "fullVideo";
		}
		else
		{
			document.getElementById("video").className = fullscreenEnabled ? "standardVideo_fullscreen" : "standardVideo";
		}
		
		//Setting variables based on whether current video is on server or through YouTube
		
		if (isYoutubeVideo())
		{
			currentTime = parseFloat(youtubePlayer.getCurrentTime());
			var state;
			state = youtubePlayer.getPlayerState();
			paused = state == 2 || state == -1 || state == 3;
			
			videoDuration = youtubePlayer.getDuration();
			document.getElementById("seekSlider").value = parseInt((parseFloat(currentTime) / parseFloat(videoDuration)) * 100);
			
			document.getElementById("video").pause();
			document.getElementById("youtubePlayer").style.display = "block";
			document.getElementById("video").style.display = "none";
			
			document.getElementById("seekSlider").style.display = "block";
		}
		else
		{
			currentTime = document.getElementById("video").currentTime;
			paused = document.getElementById("video").paused;
			
			if (youtubePlayer != undefined)
				youtubePlayer.pauseVideo();
			document.getElementById("youtubePlayer").style.display = "none";
			document.getElementById("video").style.display = "block";
		}

		////////////////////////////
		//NOTES
		////////////////////////////
		/*
		
			If the timestamp of the video on the client (currentTime) is either greater than or less than
			the new calculated timestamp where the video should be (newTimeStamp), it should set the video time
			to match
		
			To display basic debug information, uncomment the style.display line under debug section
		
		*/

		//d.innerHTML += "YouTube:<br>";
		//d.innerHTML += "Local Video:<br>";
		d.innerHTML += "Local Pause: " + paused + "<br>";
		d.innerHTML += "Server: " + info[2] + "<br>";
		
		d.innerHTML += "If POE: ";
		
		if (videoEnded == true)
		{
		//	return;
		}
		if ((currentTime > (newTimeStamp + TOLERANCE)) || (currentTime < (newTimeStamp - TOLERANCE)))
		//if (parseInt(info[0]) != parseInt(savedTimeStamp))
		{
			if (info[2] == "playing" && paused)
			{
				d.innerHTML += "1";
				if (isYoutubeVideo())
					youtubePlayer.seekTo(newTimeStamp, true);
				else
					document.getElementById("video").currentTime = newTimeStamp;
				document.getElementById("playState").value = "playing";
				if (isYoutubeVideo())
					youtubePlayer.playVideo();
				else
					document.getElementById("video").play();
				
				document.getElementById("playButton").innerHTML = "&#x23f8;";
				if (fullscreenEnabled)
					toast(info[4] + " Played The Video..", 3, "#player", "25%", "15%", "0", "0");
				else
					toast(info[4] + " Played The Video..");
			}
			else if (info[2] == "paused" && !paused)
			{
				d.innerHTML += "2";
				if (isYoutubeVideo())
					youtubePlayer.seekTo(newTimeStamp, true);
				else
					document.getElementById("video").currentTime = newTimeStamp;
				document.getElementById("playState").value = "paused";
				if (isYoutubeVideo())
					youtubePlayer.pauseVideo();
				else
					document.getElementById("video").pause();
				document.getElementById("playButton").innerHTML = "&#x25b6;";
				if (fullscreenEnabled)
					toast(info[4] + " Paused The Video..", 3, "#player", "25%", "15%", "0", "0");
				else
					toast(info[4] + " Paused The Video..");
				
			}
			else if (info[2] == "playing" && !paused)
			{
				d.innerHTML += "3";
				if (isYoutubeVideo())
				{
					d.innerHTML += "-1";
					youtubePlayer.seekTo(newTimeStamp, true);
					if (youtubePlayer.getPlayerState() != 0)
					{
						youtubePlayer.playVideo();
						if (fullscreenEnabled)
							toast("Syncing..", 3, "#player", "25%", "15%", "0", "0");
						else
							toast("Syncing..");
					}
				}
				else
				{
					d.innerHTML += "-2";
					document.getElementById("video").currentTime = newTimeStamp;
					if (document.getElementById("video").currentTime == !document.getElementById("video").duration)
					{
						document.getElementById("video").play();
						if (fullscreenEnabled)
							toast("Syncing..", 3, "#player", "25%", "15%", "0", "0");
						else
							toast("Syncing..");
					}
				}
			}
			/*
			else if (info[2] == "paused" && document.getElementById("video").paused)
			{
				if (fullscreenEnabled)
					toast(info[4] + " Changed The Timestamp..", 3, "#player", "0", "0", "0", "-175px");
				else
					toast(info[4] + " Changed The Timestamp..");
			}
			*/
		}
		else
		{
			if (info[2] == "playing" && paused)
			{
				d.innerHTML += "4";
				if (isYoutubeVideo())
					youtubePlayer.playVideo();
				else
					document.getElementById("video").play();
				
				document.getElementById("playButton").innerHTML = "&#x23f8;";
				if (fullscreenEnabled)
					toast(info[4] + " Played The Video..", 3, "#player", "25%", "15%", "0", "0");
				else
					toast(info[4] + " Played The Video..");
			}
			else if (info[2] == "paused" && paused)
			{
				d.innerHTML += "5";
				if (isYoutubeVideo())
					youtubePlayer.pauseVideo();
				else
					document.getElementById("video").pause();
				
				document.getElementById("playButton").innerHTML = "&#x25b6;";
				if (fullscreenEnabled)
					toast(info[4] + " Paused The Video..", 3, "#player", "25%", "15%", "0", "0");
				else
					toast(info[4] + " Paused The Video..");
			}
			else if (info[2] == "paused" && !paused)
			{
				d.innerHTML += "6";
				document.getElementById("playState").value = "paused";
				if (isYoutubeVideo())
					youtubePlayer.pauseVideo();
				else
					document.getElementById("video").pause();
				
				document.getElementById("playButton").innerHTML = "&#x25b6;";
				if (fullscreenEnabled)
					toast(info[4] + " Paused The Video..", 3, "#player", "25%", "15%", "0", "0");
				else
					toast(info[4] + " Paused The Video..");
				
			}
			else
			{
				//Everything is on-track
				d.innerHTML += "7";
			}
		}
		
		//Set the title above video player
		if (isYoutubeVideo())
		{
			var nowPlaying = youtubePlayer.getVideoData().title;
		}	
		else
		{
			var fullPath = document.getElementById("filePath").value.split("/");
			var nowPlaying = fullPath[fullPath.length-1];
			document.getElementById("seekSlider").style.display = "none";
		}
		document.getElementById("nowPlaying").innerHTML = nowPlaying;
		d.innerHTML += "<br> End of sync method";
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

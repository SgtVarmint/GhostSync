function syncPull()
{	
	let isYoutube = isYoutubeVideo();
	//Figure out in what files these functions are defined. Please.
	pullTrackingInfo(); // defined in progression.js
	pullQueue();
	checkForMobile();
	var timestamp;
	var duration;

	//Pull current video info
	if (videoFileData_loadedVideo != formatVideoPathForServer(document.getElementById("filePath").value))
	{
		videoFileData_loadedVideo = formatVideoPathForServer(document.getElementById("filePath").value);
		if (!isYoutube)
			if (document.getElementById("filePath").value)
				videoFileData = getVideoInfo(formatVideoPathForServer(document.getElementById("filePath").value));
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

	var playState;

	if (isYoutubeVideo())
	{
		playState = youtubePlayer.paused ? "paused" : "playing";
	}
	else
	{
		playState = document.getElementById("video").paused ? "paused" : "playing";
	}
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","updateServerTimeStamp.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&timeStamp=" + timeStamp + "&playState=" + playState + "&filePath=" + formatVideoPathForServer(document.getElementById("filePath").value) + "&userUpdated=" + localStorage.getItem("userName"));
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

////These variables are used to keep track of local video
//Current time of video element
var currentTime;
//Boolean, when true, means video is paused
var paused;
//Total length of the video currently loaded
var videoDuration;
////

var consecutiveOutOfSyncs = 0;

//Method stemming from sync video
function syncVideoAction(file)
{
	var d = document.getElementById("debug");
	d.innerHTML = "";
	
	
	
	/////////////////////////////////
	//UNCOMMENT TO ENABLE DEBUGGING//
	/////////////////////////////////
	
	//d.style.display = "block";
	
	
	var info = file.responseText.split("^");
	//Index 0 is the video timestamp
	//Index 1 is the server time when it was last updated timestamp
	//Index 2 is the play state: either 'playing' or 'paused'
	//Index 3 is the complete file path URL for the video
	//Index 4 is the username of who posted the update
	//Index 5 is the current system time when request was fetched
	
	var updateUser = info[4];
	var serverTimeStamp = info[0];
	
	var storedServerTime;
	var currentServerTime;
	if (info[1] != undefined && info[3] != "")
	{
		storedServerTime = info[1].slice(0, info[1].length - 4) + "." + info[1].slice(info[1].length - 4, info[1].length - 1);
		currentServerTime = info[5].slice(0, info[5].length - 4) + "." + info[5].slice(info[5].length - 4, info[5].length - 1);
		var timeOffset = parseFloat(currentServerTime) - parseFloat(storedServerTime);
		var newTimeStamp = parseFloat(info[0]) + timeOffset;
		
		var videoPlayer = document.getElementById("video");
		var aspectRatio = parseFloat(videoPlayer.videoWidth) / parseFloat(videoPlayer.videoHeight);
		d.innerHTML += "Aspect Ratio: " + aspectRatio + "<br>";
		
		var serverFilePath = info[3];
		
		if (serverFilePath == "null")
		{
			skipButtonClicked();
			return; //EXIT OUT OF SYNC FUNCTION.  Sync will only begin again once a video is loaded
		}
		
		//Checks if a new video was chosen for play, and changes it if true
		var initialVideoLoaded = false;
		if (document.getElementById("filePath").value != serveVideoPath(serverFilePath))
		{
			jimmyNet = false;
			
			document.getElementById("filePath").value = serveVideoPath(serverFilePath);
			
			if (document.getElementById("filePath").value == "undefined")
				return;
			
			if (isYoutubeVideo())
			{
				youtubePlayer.loadVideoById(document.getElementById("filePath").value, 0);
			}
			else
			{
				document.getElementById("videoSource").src = document.getElementById("filePath").value;
				document.getElementById("video").load();
				/*if (checkPreload())
					preloadVideo(document.getElementById("filePath").value);*/
			}
			
			if (initialVideoLoaded)
				toast(info[4] + " Chose A New Video");
			else
				initialVideoLoaded = true;
			
			videoEnded = false;
		}

		/*
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
		*/
		//document.getElementById("video").className = fullscreenEnabled ? "standardVideo_fullscreen" : "standardVideo";
		
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
		}
		else
		{
			currentTime = document.getElementById("video").currentTime;
			paused = document.getElementById("video").paused;

			videoDuration = videoPlayer.duration;
			document.getElementById("seekSlider").value = parseInt((parseFloat(currentTime) / parseFloat(videoDuration)) * 100);
			
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

		d.innerHTML += "Local: " + (paused ? "paused" : "playing") + "<br>";
		d.innerHTML += "Server: " + info[2] + "<br>";		
		
		
		
		/////////////////////////////
		//SYNC SECTION
		/////////////////////////////
		
		//Check if video is out of sync with server
		var outOfSync = checkForOutOfSync(currentTime, newTimeStamp);
		
		var serverPaused = info[2] == "paused";
		
		if (!serverPaused && !paused) //Happy Play State
		{
			//outOfSyncCount++;
			if (outOfSync && !jimmyNet)
			{			
				consecutiveOutOfSyncs++;

				if (consecutiveOutOfSyncs >= OUT_OF_SYNCS_BEFORE_JIMMY)
				{
					consecutiveOutOfSyncs = 0;
					jimmyNet = true;
					document.getElementById("filePath").value = serveVideoPath(document.getElementById("filePath").value);
					document.getElementById("videoSource").src = document.getElementById("filePath").value;
					document.getElementById("video").load();
					
					console.log("Jimmy mode activated!");
				}
			}
			else if (!jimmyNet)
			{
				consecutiveOutOfSyncs = 0;
			}
			else
			{
				//All is working smoothly
			}
		}
				
		d.innerHTML += "Current Time: " + currentTime + "<br>";
		d.innerHTML += "newTimeStamp: " + (newTimeStamp + TOLERANCE)+ "<br>";
		
		var youtube = isYoutubeVideo();

		if (serverPaused && !paused)
		{
			outOfSync = true;
		}
		
		d.innerHTML += "outOfSync: " + outOfSync + "<br>";
		
		if (outOfSync)
		{
			if (serverPaused)
			{
				setPlayButtonImage(false);
				if (paused)
				{
					d.innerHTML += "pausedTimeStamp: " + pausedTimeStamp + "<br>";
					d.innerHTML += "serverTimeStamp: " + serverTimeStamp + "<br>";
					if (pausedTimeStamp != serverTimeStamp)
					{
						pausedTimeStamp = serverTimeStamp;
						
						if (!youtube)
							videoPlayer.currentTime = serverTimeStamp;
						else
							youtubePlayer.seekTo(serverTimeStamp, true);
						
						//toast("Syncing..");
					}
					else
					{
						if (!youtube)
						{
							videoPlayer.currentTime = serverTimeStamp;
						}
						else
						{
							youtubePlayer.seekTo(serverTimeStamp, true);
						}
					}
				}
				else
				{
					if (!youtube)
					{
						videoPlayer.currentTime = newTimeStamp;
						videoPlayer.pause();
					}
					else
					{
						youtubePlayer.seekTo(newTimeStamp, true);
						youtubePlayer.pauseVideo();
					}
					toast(updateUser + " paused the video..");
				}
			}
			else
			{
				setPlayButtonImage(true);
				if (paused)
				{
					if (!youtube)
					{
						videoPlayer.currentTime = newTimeStamp;
						videoPlayer.play();
					}
					else
					{
						youtubePlayer.seekTo(newTimeStamp, true);
						youtubePlayer.playVideo();
					}
					toast(updateUser + " played the video..")
				}
				else
				{
					if (!youtube)
						videoPlayer.currentTime = newTimeStamp;
					else
						youtubePlayer.seekTo(newTimeStamp, true);
					toast("Syncing..")
				}
			}
		}
		
		let timestamp;
		let duration;
		if (!youtube)
		{
			if (!document.getElementById("video").paused)
				checkForAndSkipAd();
				
			timestamp = document.getElementById("video").currentTime;
			duration = document.getElementById("video").duration;
		}
		else
		{
			if (youtubePlayer.getPlayerState() == 0) //getPlayerState() will return 0 if youtube video is ended
				timestamp = 1;
			else
				timestamp = 0
			duration = 1
		}
	
		if (duration <= timestamp && !serverPaused)
		{
			skipButtonClicked();
		}
		
		//Set the title above video player
		if (isYoutubeVideo())
		{
			var nowPlaying = youtubePlayer.getVideoData().title;
		}	
		else
		{
			var nowPlaying = getVideoNameFromPath();
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

function checkForOutOfSync(currentTime, newTimeStamp)
{
	//If statement is split up for readability (as opposed to using || )
	if (currentTime > (newTimeStamp + parseFloat(TOLERANCE)))
		return true;
	else if (currentTime < (newTimeStamp - parseFloat(TOLERANCE)))
		return true;
	else return false;
}
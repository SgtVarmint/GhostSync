window.onload = function(){
	authenticate();
	TOLERANCE = localStorage.getItem("tolerance");
	if (TOLERANCE == null)
	{
		TOLERANCE = .3;
		localStorage.setItem("tolerance", TOLERANCE);
	}

	if (localStorage.getItem("youtubeDisabled") == null)
	{
		youtubeDisabled = false;
		localStorage.setItem("youtubeDisabled", "false");
	}
	else if (localStorage.getItem("youtubeDisabled") == "true")
	{
		youtubeDisabled = true;
	}
	else
	{
		youtubeDisabled = false;
	}
	document.getElementById("youtubeDisabledToggle").checked = youtubeDisabled;
	document.getElementById("youtubeDisabledToggle").oninput = function(){
		youtubeDisabled = document.getElementById("youtubeDisabledToggle").checked;
		localStorage.setItem("youtubeDisabled", youtubeDisabled ? "true" : "false");
		location.reload();
	};
	
	initYoutube();
	
	document.getElementById("userNameInput").value = localStorage.getItem("userName");
	document.getElementById("toleranceSlider").value = TOLERANCE * 100;
	document.getElementById("toleranceValue").innerHTML = TOLERANCE;

	document.getElementById("changeUsernameButton").onclick = function(){
		localStorage.setItem("userName", document.getElementById("userNameInput").value);
		toast("Username Changed");
		};
	document.getElementById("toleranceSlider").oninput = function(){ 
		TOLERANCE = parseFloat(document.getElementById("toleranceSlider").value) / 100.0;
		localStorage.setItem("tolerance", TOLERANCE);
		document.getElementById("toleranceValue").innerHTML = TOLERANCE;
		};
	
	document.getElementById("userNameInput").addEventListener("keyup", function(event)
	{
		if (event.keyCode === 13)
		{
			event.preventDefault();
			document.getElementById("changeUsernameButton").click();
		}
	});
	
	document.getElementById("youtubeInput").addEventListener("keyup", function(event)
	{
		if (event.keyCode === 13)
		{
			event.preventDefault();
			document.getElementById("youtubeAddToQueueButton").click();
		}
	});
	
	LOBBY_SOUND_SETTING = localStorage.getItem("lobbySounds");
	if (LOBBY_SOUND_SETTING == null)
	{
		LOBBY_SOUND_SETTING = "on";
		localStorage.setItem("lobbySounds", LOBBY_SOUND_SETTING);
	}
	else
	{
		LOBBY_SOUND_SETTING = localStorage.getItem("lobbySounds");
	}
	
	//document.getElementById("lobbySoundsLabel").innerHTML = LOBBY_SOUND_SETTING;
	document.getElementById("lobbySoundsToggle").checked = LOBBY_SOUND_SETTING == "on";
	document.getElementById("lobbySoundsToggle").oninput = function(){
		LOBBY_SOUND_SETTING = document.getElementById("lobbySoundsToggle").checked ? "on" : "off";
		localStorage.setItem("lobbySounds", LOBBY_SOUND_SETTING);
	};
	
	//document.getElementById("video").onseeked = function(){ document.getElementById("video").pause(); document.getElementById("playState").value = "paused"; };//updateServerTimeStamp(); };
	document.getElementById("playButton").onclick = playButtonClicked;
	document.getElementById("fullscreenButton").onclick = fullscreenButtonClicked;
	document.getElementById("skipButton").onclick = skipButtonClicked;
	document.getElementById("seekSlider").oninput = seekSliderSeeked;
	document.getElementById("player").onmousemove = mouseHovered;
	document.getElementById("youtubePlayer").onmousemove = mouseHovered;
	document.getElementById("youtubePlayButton").onclick = playYoutubeVideo;
	document.getElementById("youtubeAddToQueueButton").onclick = addYoutubeVideoToQueue;
	document.getElementById("video").onclick = function(){ document.getElementById("playButton").click(); };
	
	var toolTips = document.getElementsByClassName("toolTip");
	for (var i = 0; i < toolTips.length; i++)
	{
		toolTips[i].onmouseover = toolTipOver;
		toolTips[i].onmouseout = toolTipOut;
	}
	
	document.getElementById("lobbyName").value = localStorage.getItem("lobbyName");
	
	setInterval(syncPull, SYNC_INTERVAL * 1000);
	setInterval(userUpdate, USER_UPDATE_INTERVAL * 1000);
	getDirectoryInfo();	
	checkForMobile();
}
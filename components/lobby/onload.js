window.onload = function(){
	auth();
	
	TOLERANCE = localStorage.getItem("tolerance");
	if (TOLERANCE == null)
	{
		TOLERANCE = .3;
		localStorage.setItem("tolerance", TOLERANCE);
	}
	
	LOBBY_REACTIONS_SETTING = localStorage.getItem("lobbyReactionsSetting");
	if (LOBBY_REACTIONS_SETTING == null)
	{
		LOBBY_REACTIONS_SETTING = "on";
		localStorage.setItem("lobbyReactionsSetting", LOBBY_REACTIONS_SETTING);
	}
	
	initYoutube();
	
	document.getElementById("userNameInput").value = localStorage.getItem("userName");
	document.getElementById("toleranceSlider").value = (TOLERANCE / 5) * 100;
	document.getElementById("toleranceValue").innerHTML = TOLERANCE;

	document.getElementById("changeUsernameButton").onclick = function(){
		localStorage.setItem("userName", formatUsername(document.getElementById("userNameInput").value));
		toast("Username Changed");
		};
	document.getElementById("toleranceSlider").oninput = function(){ 
		TOLERANCE = (parseFloat(document.getElementById("toleranceSlider").value) / 100.0) * 5;
		localStorage.setItem("tolerance", TOLERANCE);
		var toleranceString = "" + TOLERANCE;
		document.getElementById("toleranceValue").innerHTML = toleranceString.substring(0,3);
		};

	PRELOAD = localStorage.getItem("preload");
	if (PRELOAD == null)
	{
		PRELOAD = "off";
		localStorage.setItem("preload", PRELOAD);
		document.getElementById("preloadProgress").className = "hidden";
	}
	else
	{
		PRELOAD = localStorage.getItem("preload");
		document.getElementById("preloadProgress").className = checkPreload() ? "error" : "hidden";
	}
	
	document.getElementById("preloadToggle").checked = PRELOAD == "on";
	document.getElementById("preloadToggle").oninput = function(){
		if (document.getElementById("preloadToggle").checked)
		{
			PRELOAD = "on";
			document.getElementById("preloadProgress").className = "error";
			window.location.reload();
		}
		else
		{
			PRELOAD = "off";
			document.getElementById("preloadProgress").className = "hidden";
			window.location.reload();
		}
		localStorage.setItem("preload", PRELOAD);
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
	
	//Visibility event listener bind
	document.addEventListener("visibilitychange", function()
	{
		if (document.hidden)
		{
			awayMode(); //activity.js
		}
		else
		{
			activeMode(); //activity.js
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
	
	document.getElementById("reactionsToggle").checked = LOBBY_REACTIONS_SETTING == "on";
	document.getElementById("reactionsToggle").oninput = function(){
		LOBBY_REACTIONS_SETTING = document.getElementById("reactionsToggle").checked ? "on" : "off";
		localStorage.setItem("lobbyReactionsSetting", LOBBY_REACTIONS_SETTING);
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
	document.getElementById("reactionButton").onclick = reactionButtonClicked;
	document.getElementById("closeReactionMenuButton").onclick = function(){ document.getElementById("reactionButton").click(); };
	document.getElementById("reactionMenuFavoritesButton").onclick = showFavoriteEmojis;
	document.getElementById("reactionMenuAllButton").onclick = showAllEmojis;
	
	var toolTips = document.getElementsByClassName("toolTip");
	for (var i = 0; i < toolTips.length; i++)
	{
		toolTips[i].onmouseover = toolTipOver;
		toolTips[i].onmouseout = toolTipOut;
	}
	
	document.getElementById("lobbyName").value = localStorage.getItem("lobbyName");
	
	initializeReactionMenu();
	
	setInterval(syncPull, SYNC_INTERVAL * 1000);
	setInterval(userUpdate, USER_UPDATE_INTERVAL * 1000);
	getDirectoryInfo();	
	checkForMobile();
}
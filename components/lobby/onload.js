window.onload = function(){
	
	TOLERANCE = localStorage.getItem("tolerance");
	if (TOLERANCE == null)
	{
		TOLERANCE = .3;
		localStorage.setItem("tolerance", TOLERANCE);
	}

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
	
	document.getElementById("video").onseeked = function(){ document.getElementById("video").play(); updateServerTimeStamp(); };
	document.getElementById("playButton").onclick = playButtonClicked;
	document.getElementById("fullscreenButton").onclick = fullscreenButtonClicked;
	document.getElementById("player").onmousemove = mouseHovered;
	
	document.getElementById("lobbyName").value = localStorage.getItem("lobbyName");
	
	setInterval(syncPull, SYNC_INTERVAL * 1000);
	setInterval(userUpdate, USER_UPDATE_INTERVAL * 1000);
	getDirectoryInfo();
	
}
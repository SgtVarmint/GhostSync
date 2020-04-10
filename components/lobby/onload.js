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
	
	document.getElementById("video").onseeked = updateServerTimeStamp;
	document.getElementById("playButton").onclick = playButtonClicked;
	document.getElementById("fullscreenButton").onclick = fullscreenButtonClicked;
	document.getElementById("video").onmousemove = mouseHovered;
	
	document.getElementById("lobbyName").value = localStorage.getItem("lobbyName");
	
	setInterval(syncPull, SYNC_INTERVAL * 1000);
	setInterval(userUpdate, USER_UPDATE_INTERVAL * 1000);
	getDirectoryInfo();
	
}
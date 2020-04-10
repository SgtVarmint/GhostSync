window.onload = function(){
	
	//document.getElementById("video").onpause = function(){ document.getElementById("playState").value = "paused"; updateServerTimeStamp(); };
	//document.getElementById("video").onplay = function(){ document.getElementById("playState").value = "playing"; updateServerTimeStamp(); };
	document.getElementById("video").onseeked = updateServerTimeStamp;
	document.getElementById("playButton").onclick = playButtonClicked;
	document.getElementById("fullscreenButton").onclick = fullscreenButtonClicked;
	document.getElementById("video").onmousemove = mouseHovered;
	//document.getElementById("video").onpause = function(){ document.getElementById("playState").value = "paused"; document.getElementById("pushUpdate").value = parseInt(document.getElementById("pushUpdate").value) + 1; };
	//document.getElementById("video").onplay = function(){ document.getElementById("playState").value = "playing"; document.getElementById("pushUpdate").value = parseInt(document.getElementById("pushUpdate").value) + 1; };
	//document.getElementById("video").onseeked = function(){ document.getElementById("pushUpdate").value = parseInt(document.getElementById("pushUpdate").value) + 1; };
	
	document.getElementById("lobbyName").value = localStorage.getItem("lobbyName");
	
	setInterval(syncPull, SYNC_INTERVAL * 1000);
	setInterval(userUpdate, USER_UPDATE_INTERVAL * 1000);
	getDirectoryInfo();
	
}
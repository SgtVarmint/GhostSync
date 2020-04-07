var TIMER_INTERVAL = 1;

window.onload = function(){
	
	document.getElementById("video").onpause = function(){ document.getElementById("playState").value = "paused"; updateServerTimeStamp(); };
	document.getElementById("video").onplay = function(){ document.getElementById("playState").value = "playing"; updateServerTimeStamp(); };
	document.getElementById("video").onseeked = function(){ updateServerTimeStamp(); };
	
	document.getElementById("lobbyName").value = localStorage.getItem("lobbyName");
	
	setInterval(syncPull, TIMER_INTERVAL * 1000);
	//setInterval(userUpdate, 5000);
	getDirectoryInfo();
	
}
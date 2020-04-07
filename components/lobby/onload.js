window.onload = function(){
	setInterval(syncPull, 1000);
	getDirectoryInfo();
	
	document.getElementById("video").onpause = function(){ document.getElementById("playState").value = "paused"; updateServerTimeStamp(); };
	document.getElementById("video").onplay = function(){ document.getElementById("playState").value = "playing"; updateServerTimeStamp(); };
	document.getElementById("video").onseeked = function(){ updateServerTimeStamp(); };
	
}
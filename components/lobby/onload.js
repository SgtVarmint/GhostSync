var TIMER_INTERVAL = 1;

window.onload = function(){
	
	document.getElementById("video").onpause = function(){ document.getElementById("playState").value = "paused"; updateServerTimeStamp(); };
	document.getElementById("video").onplay = function(){ document.getElementById("playState").value = "playing"; updateServerTimeStamp(); };
	document.getElementById("video").onseeked = function(){ updateServerTimeStamp(); };
	
	var timer = setInterval(syncPull, TIMER_INTERVAL * 1000);
	getDirectoryInfo();
	
}
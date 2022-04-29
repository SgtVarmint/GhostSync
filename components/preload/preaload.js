function preloadVideo(videoPath)
{
	document.getElementById("preloadProgress").className = "inProgress";
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", videoPath, true);
	xhttp.responseType = "blob";
	
	xhttp.onload = function(){
		if (this.status === 200)
		{
			var video = URL.createObjectURL(this.response);
			document.getElementById("videoSource").src = video;
			document.getElementById("preloadProgress").className = "done";
		}
	}
	
	xhttp.onerror = function(){
		document.getElementById("preloadProgress").className = "error";
	}
	
	xhttp.send();
}

function checkPreload()
{
	if (PRELOAD == "on")
		return true;
	else
		return false;
}
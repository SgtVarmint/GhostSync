function playButtonClicked()
{
	if (document.getElementById("video").paused)
	{
		document.getElementById("video").play();
		document.getElementById("playState").value = "playing";
		document.getElementById("playButton").innerHTML = "&#x23f8;";
		updateServerTimeStamp();
	}
	else
	{
		document.getElementById("video").pause();
		document.getElementById("playState").value = "paused";
		document.getElementById("playButton").innerHTML = "&#x25b6;";
		updateServerTimeStamp();
	}
}

function fullscreenButtonClicked()
{
	if (fullscreenEnabled)
	{
		document.exitFullscreen();
		fullscreenEnabled = false;
		document.getElementById("playButton").style.position = "relative";
		document.getElementById("playButton").style.top = "0%";
		document.getElementById("playButton").style.left = "0%";
		document.getElementById("playButton").style.display = "block";
		
		document.getElementById("fullscreenButton").style.position = "relative";
		document.getElementById("fullscreenButton").style.top = "0%";
		document.getElementById("fullscreenButton").style.left = "0%";
		document.getElementById("fullscreenButton").style.display = "block";
				
		document.getElementById("video").className = "";
	}
	else
	{
		document.getElementById("player").requestFullscreen();
		fullscreenEnabled = true;
		document.getElementById("playButton").style.position = "absolute";
		document.getElementById("playButton").style.top = "92%";
		document.getElementById("playButton").style.left = "45%";
		document.getElementById("playButton").style.display = "none";
		
		document.getElementById("fullscreenButton").style.position = "absolute";
		document.getElementById("fullscreenButton").style.top = "92%";
		document.getElementById("fullscreenButton").style.left = "50%";
		document.getElementById("fullscreenButton").style.display = "none";
		
		//Detect if video is widescreen
		var videoPlayer = document.getElementById("video");
		var aspectRatio = parseFloat(videoPlayer.videoWidth) / parseFloat(videoPlayer.videoHeight);
		
		if (aspectRatio > 2.0)
		{
			document.getElementById("video").className = "widescreenVideo";
		}
	}
		
}
var controlsTimeout;
function mouseHovered()
{
	if (fullscreenEnabled)
	{
		window.clearTimeout(controlsTimeout);
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		controlsTimeout = setTimeout(hideControls, FULLSCREEN_CONTROLS_TIMEOUT * 1000);
	}
	else
	{
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
	}
}

function hideControls()
{
	if (fullscreenEnabled)
	{
		document.getElementById("playButton").style.display = "none";
		document.getElementById("fullscreenButton").style.display = "none";
	}
	else
	{
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
	}
}

function showControlsNotFullscreen()
{
	document.getElementById("playButton").style.display = "inline";
	document.getElementById("fullscreenButton").style.display = "inline";
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        showControlsNotFullscreen();
    }
};
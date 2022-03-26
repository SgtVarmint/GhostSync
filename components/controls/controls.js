//For reactions button, see reactions.js

function hideButtonClicked()
{
	bindBackgroundFadeClick("return null;");
	enableBackgroundFade();
	if (theaterMode)
	{
		theaterMode = false;
	}
	else
	{
		theaterMode = true;
	}
}

function lockButtonClicked()
{
	if (!controlsLocked)
	{
		lockControls();
		controlsLocked = true;
	}
	else
	{
		unlockControls();
		controlsLocked = false;
	}
}

function lockControls()
{
	document.getElementById("playButton").disabled = true;
	document.getElementById("playButton").className = "controlsDisabled";
	document.getElementById("skipButton").className = "controlsDisabled";
	document.getElementById("skipButton").disabled = true;
	document.getElementById("seekSlider").disabled = true;
}

function unlockControls()
{
	document.getElementById("playButton").disabled = false;
	document.getElementById("playButton").className = "controls";
	document.getElementById("skipButton").className = "controls";
	document.getElementById("skipButton").disabled = false;
	document.getElementById("seekSlider").disabled = false;
}

function skipButtonClicked()
{
	let queueItem = new Array();
	let videoTimestamp = new Array();
	if (queue.length > 0)
	{
		queueItem = queue[0].split("^")[0];
		videoTimestamp = queue[0].split("^")[1];
	}
	if (queue.length > 0 && queueItem != "undefined" && queueItem != undefined)
	{
		if (queueItem.includes("watch?v="))
			playYoutubeVideo(queueItem, true);
		else
			playVideo(queueItem, videoTimestamp, true, true);
		shiftQueue();
		updateQueueDOM();
	}
	else
	{
		if (isYoutubeVideo())
		{
			youtubePlayer.pauseVideo();
			document.getElementById("video").style.display = "block";
			document.getElementById("youtubePlayer").style.display = "none";
		}
		var videoElement = document.getElementById("video");
		var videoSourceElement = document.getElementById("videoSource");
		document.getElementById("filePath").value = "null";
		playButtonClicked(true);
		videoSourceElement.removeAttribute("src");
		videoElement.load();
		document.getElementById("nowPlaying").innerHTML = "Nothing Is Playing Yet..";
	}
	
	updateTracking();
}

function playButtonClicked(pause = false)
{
	if (pause == true)
	{
		document.getElementById("video").pause();
		document.getElementById("playState").value = "paused";
		document.getElementById("playButton").innerHTML = "&#x25b6;";
		videoEnded = true;
		updateServerTimeStamp();
		return;
	}
	if (isYoutubeVideo())
	{
		var state = youtubePlayer.getPlayerState()
		//Paused or buffering
		if (state == 2 || state == 3)
		{
			youtubePlayer.playVideo();
			document.getElementById("playState").value = "playing";
			document.getElementById("playButton").innerHTML = "&#x23f8;";
			updateServerTimeStamp();
		}
		//Playing or any other state
		else
		{
			youtubePlayer.pauseVideo();
			document.getElementById("playState").value = "paused";
			document.getElementById("playButton").innerHTML = "&#x25b6;";
			updateServerTimeStamp();
		}
	}
	else
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
			pausedTimeStamp = document.getElementById("video").currentTime;
			updateServerTimeStamp();
		}
	}
	updateTracking();
}

function fullscreenButtonClicked()
{
	if (fullscreenEnabled)
	{
		document.exitFullscreen();
		fullscreenEnabled = false;
		
		document.getElementById("reactionButton").style.position = "relative";
		document.getElementById("reactionButton").style.top = "0%";
		document.getElementById("reactionButton").style.left = "0%";
		document.getElementById("reactionButton").style.display = "inline";
		document.getElementById("reactionMenuContainer").style.top = "60%";
		document.getElementById("reactionPanel").style.top = "15%"
		document.getElementById("reactionPanel").style.left = "60%"
		document.getElementById("reactionPanel").style.height = "500px";
		document.getElementById("reactionPanel").style.width = "400px";
		document.getElementById("reactionPanel").style.fontSize = "2em";
		
		document.getElementById("playButton").style.position = "relative";
		document.getElementById("playButton").style.top = "0%";
		document.getElementById("playButton").style.left = "0%";
		document.getElementById("playButton").style.display = "inline";
		
		document.getElementById("fullscreenButton").style.position = "relative";
		document.getElementById("fullscreenButton").style.top = "0%";
		document.getElementById("fullscreenButton").style.left = "0%";
		document.getElementById("fullscreenButton").style.display = "inline";
		
		document.getElementById("seekSlider").style.position = "relative";
		document.getElementById("seekSlider").style.top = "0%";
		document.getElementById("seekSlider").style.left = "0%";
		document.getElementById("seekSlider").style.display = "block";
		document.getElementById("seekSlider").style.opacity = "1";
		
		document.getElementById("skipButton").style.position = "relative";
		document.getElementById("skipButton").style.top = "0%";
		document.getElementById("skipButton").style.left = "0%";
		document.getElementById("skipButton").style.display = "inline";
		
		document.getElementById("lockButton").style.position = "relative";
		document.getElementById("lockButton").style.top = "0%";
		document.getElementById("lockButton").style.left = "0%";
		document.getElementById("lockButton").style.display = "inline";

		/*	
		if (aspectRatio > 2.0)
		{
			document.getElementById("video").className = "widescreenVideo";
		}
		else if (aspectRatio > 1.5)
		{
			document.getElementById("video").className = "fullVideo";
		}
		else
		{
			document.getElementById("video").className = "standardVideo";
		}
		*/
		
		document.getElementById("video").className = "standardVideo";
		
		//if (isYoutubeVideo())
		{
			document.getElementById("youtubePlayer").className = "youtubeNormal";
		}
	}
	else
	{
		document.getElementById("player").requestFullscreen();
		fullscreenEnabled = true;
		
		document.getElementById("reactionButton").style.position = "absolute";
		document.getElementById("reactionButton").style.top = "92%";
		document.getElementById("reactionButton").style.left = "40%";
		document.getElementById("reactionButton").style.display = "none";
		document.getElementById("reactionMenuContainer").style.top = "55%";
		document.getElementById("reactionPanel").style.top = "15%"
		document.getElementById("reactionPanel").style.left = "70%"
		document.getElementById("reactionPanel").style.height = "800px";
		document.getElementById("reactionPanel").style.width = "550px";
		document.getElementById("reactionPanel").style.fontSize = "3em";
		
		document.getElementById("playButton").style.position = "absolute";
		document.getElementById("playButton").style.top = "92%";
		document.getElementById("playButton").style.marginTop = "5px";
		document.getElementById("playButton").style.left = "45%";
		document.getElementById("playButton").style.display = "none";
		
		document.getElementById("fullscreenButton").style.position = "absolute";
		document.getElementById("fullscreenButton").style.top = "92%";
		document.getElementById("fullscreenButton").style.left = "50%";
		document.getElementById("fullscreenButton").style.display = "none";
		
		document.getElementById("skipButton").style.position = "absolute";
		document.getElementById("skipButton").style.top = "92%";
		document.getElementById("skipButton").style.left = "54%";
		document.getElementById("skipButton").style.display = "none";
		
		document.getElementById("lockButton").style.position = "absolute";
		document.getElementById("lockButton").style.top = "92%";
		document.getElementById("lockButton").style.left = "59%";
		document.getElementById("lockButton").style.display = "none";
		
		document.getElementById("seekSlider").style.position = "absolute";
		document.getElementById("seekSlider").style.top = "97%";
		document.getElementById("seekSlider").style.left = "0";
		document.getElementById("seekSlider").style.display = "none";
		document.getElementById("seekSlider").style.opacity = "0.4";

		
		if (isYoutubeVideo())
		{
			document.getElementById("youtubePlayer").className = "youtubeFull";
		}
		
		/*
		//Detect if video is widescreen
		var videoPlayer = document.getElementById("video");
		var aspectRatio = parseFloat(videoPlayer.videoWidth) / parseFloat(videoPlayer.videoHeight);
		
		if (aspectRatio > 2.0)
		{
			document.getElementById("video").className = "widescreenVideo_fullscreen";
		}
		else if (aspectRatio > 1.5)
		{
			document.getElementById("video").className = "fullVideo_fullscreen";
		}
		else
		{
			document.getElementById("video").className = "standardVideo_fullscreen";
		}
		*/
		
		document.getElementById("video").className = "standardVideo_fullscreen";
	}
		
}
var controlsTimeout;
function mouseHovered()
{
	if (fullscreenEnabled)
	{
		window.clearTimeout(controlsTimeout);
		document.getElementById("reactionButton").style.display = "inline";
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		document.getElementById("skipButton").style.display = "inline";
		document.getElementById("lockButton").style.display = "inline";
		document.getElementById("seekSlider").style.display = "inline";
		controlsTimeout = setTimeout(hideControls, FULLSCREEN_CONTROLS_TIMEOUT * 1000);
	}
	else
	{
		document.getElementById("reactionButton").style.display = "inline";
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		document.getElementById("skipButton").style.display = "inline";
		document.getElementById("lockButton").style.display = "inline";
		document.getElementById("seekSlider").style.display = "inline";
	}
}

function hideControls()
{
	if (fullscreenEnabled)
	{
		document.getElementById("reactionButton").style.display = "none";
		document.getElementById("playButton").style.display = "none";
		document.getElementById("fullscreenButton").style.display = "none";
		document.getElementById("skipButton").style.display = "none";
		document.getElementById("lockButton").style.display = "none";
		document.getElementById("seekSlider").style.display = "none";
	}
	else
	{
		document.getElementById("reactionButton").style.display = "inline";
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		document.getElementById("skipButton").style.display = "inline";
		document.getElementById("lockButton").style.display = "inline";
		document.getElementById("seekSlider").style.display = "inline";
	}
}

function showControlsNotFullscreen()
{
	document.getElementById("reactionButton").style.display = "inline";
	document.getElementById("playButton").style.display = "inline";
	document.getElementById("fullscreenButton").style.display = "inline";
	document.getElementById("skipButton").style.display = "inline";
	document.getElementById("lockButton").style.display = "inline";
	document.getElementById("seekSlider").style.display = "inline";
}

document.onkeypress = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        showControlsNotFullscreen();
    }
};

function seekSliderSeeked()
{
	if (isYoutubeVideo())
	{
		var newTimeStamp = (parseFloat(document.getElementById("seekSlider").value) / 100) * parseFloat(youtubePlayer.getDuration());
		youtubePlayer.seekTo(newTimeStamp, true);
	}
	else
	{
		var newTimeStamp = (parseFloat(document.getElementById("seekSlider").value) / 100) * parseFloat(document.getElementById("video").duration);
		document.getElementById("video").currentTime = newTimeStamp;
	}
	updateServerTimeStamp(newTimeStamp);
	updateTracking();
}

function setPlayButtonImage(playing)
{
	//if playing is false, sets the button to the 'pause' button
	//if playing is true, sets the button to the 'play' button
	if (playing)
	{
		document.getElementById("playButton").innerHTML = "&#x23f8;";
	}
	else
	{
		document.getElementById("playButton").innerHTML = "&#x25b6;";
	}
}
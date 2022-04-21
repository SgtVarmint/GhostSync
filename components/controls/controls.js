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

		document.getElementById("reactionButton_fullscreen").id = "reactionButton";
		document.getElementById("reactionMenuContainer_fullscreen").id = "reactionMenuContainer";
		document.getElementById("reactionPanel_fullscreen").id = "reactionPanel";
		document.getElementById("playButton_fullscreen").id = "playButton";
		document.getElementById("fullscreenButton_fullscreen").id = "fullscreenButton";
		document.getElementById("seekSlider_fullscreen").id = "seekSlider";
		document.getElementById("skipButton_fullscreen").id = "skipButton";
		document.getElementById("lockButton_fullscreen").id = "lockButton";
	}
	else
	{
		document.getElementById("player").requestFullscreen();
		fullscreenEnabled = true;
		
		document.getElementById("reactionButton").id = "reactionButton_fullscreen";
		document.getElementById("reactionMenuContainer").id = "reactionMenuContainer_fullscreen";
		document.getElementById("reactionPanel").id = "reactionPanel_fullscreen";
		document.getElementById("playButton").id = "playButton_fullscreen";
		document.getElementById("fullscreenButton").id = "fullscreenButton_fullscreen";
		document.getElementById("seekSlider").id = "seekSlider_fullscreen";
		document.getElementById("skipButton").id = "skipButton_fullscreen";
		document.getElementById("lockButton").id = "lockButton_fullscreen";
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
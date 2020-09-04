function skipButtonClicked()
{
	updateTracking();
	if (queue.length > 0 && queue[0] != "undefined" && queue[0] != undefined)
	{
		if (queue[0].includes("watch?v="))
			playYoutubeVideo(queue[0], true);
		else
			videoBrowserVideoClick(queue[0], 0, true, true);
		shiftQueue();
		updateQueueDOM();
	}
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
		
		document.getElementById("skipButton").style.position = "relative";
		document.getElementById("skipButton").style.top = "0%";
		document.getElementById("skipButton").style.left = "0%";
		document.getElementById("skipButton").style.display = "inline";

				
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
		
		//if (isYoutubeVideo())
		{
			document.getElementById("youtubePlayer").className = "youtubeNormal";
		}
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
		
		document.getElementById("seekSlider").style.position = "absolute";
		document.getElementById("seekSlider").style.top = "97%";
		document.getElementById("seekSlider").style.left = "0";
		document.getElementById("seekSlider").style.display = "none";
		
		document.getElementById("skipButton").style.display = "none";

		
		if (isYoutubeVideo())
		{
			document.getElementById("youtubePlayer").className = "youtubeFull";
		}
		
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
		if (isYoutubeVideo())
			document.getElementById("seekSlider").style.display = "inline";
		controlsTimeout = setTimeout(hideControls, FULLSCREEN_CONTROLS_TIMEOUT * 1000);
	}
	else
	{
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		if (isYoutubeVideo())
			document.getElementById("seekSlider").style.display = "inline";
	}
}

function hideControls()
{
	if (fullscreenEnabled)
	{
		document.getElementById("playButton").style.display = "none";
		document.getElementById("fullscreenButton").style.display = "none";
		document.getElementById("seekSlider").style.display = "none";
	}
	else
	{
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		//if (isYoutubeVideo())
			document.getElementById("seekSlider").style.display = "inline";
	}
}

function showControlsNotFullscreen()
{
	document.getElementById("playButton").style.display = "inline";
	document.getElementById("fullscreenButton").style.display = "inline";
	//if (isYoutubeVideo())
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
}

function setPlayButtonImage(playing)
{
	//if playing is false, set the button to the 'pause' button
	//if playing is true, set the button to the 'play' button
	if (playing)
	{
		document.getElementById("playButton").innerHTML = "&#x23f8;";
	}
	else
	{
		document.getElementById("playButton").innerHTML = "&#x25b6;";
	}
}
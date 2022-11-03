//For reactions button, see reactions.js

function hideButtonClicked()
{
	bindBackgroundFadeClick("return null;");
	enableBackgroundFade();
	if (theaterMode)
	{
		theaterMode = false;
		if (hideButtonRightToggle)
		{
			hideButtonRightClicked();
		}
		//document.getElementById("userqueue_wrapper").classList.remove("userqueue_closed");
		//document.getElementById("userqueue_wrapper").classList.remove("userqueue_opened");
	}
	else
	{
		theaterMode = true;

		//document.getElementById("userqueue_wrapper").classList.add("userqueue_closed");
		//document.getElementById("userqueue_wrapper").style.display = "none";
	}
}

function hideButtonRightClicked()
{

	function enableBackgroundFade()
	{
		document.getElementById("backgroundFade").className = "fade_in";
		document.getElementById("backgroundFade").style.display = "block";
	}
	
	function disableBackgroundFade()
	{
		document.getElementById("backgroundFade").className = "fade_out";
		setTimeout(function(){ 
				document.getElementById("backgroundFade").style.display = "none";
				}, 200);
	}

	if (hideButtonRightToggle)
	{
		document.getElementById("userqueue_wrapper").classList.add("userqueue_closed");
		document.getElementById("userqueue_wrapper").classList.remove("userqueue_opened");

		document.getElementById("hideButtonRightContainer").classList.add("hideButtonRightContainerClosed");
		document.getElementById("hideButtonRightContainer").classList.remove("hideButtonRightContainerOpened");

		hideButtonRightToggle = false;

		document.getElementById("hideButtonRight").src = "/graphics/HideButtonLong.png";

		disableBackgroundFade();

		setTimeout(function(){ document.getElementById("userqueue_wrapper").style.display = "none"; }, 200);
	}
	else
	{
		document.getElementById("userqueue_wrapper").classList.add("userqueue_opened");
		document.getElementById("userqueue_wrapper").classList.remove("userqueue_closed");

		document.getElementById("hideButtonRightContainer").classList.add("hideButtonRightContainerOpened");
		document.getElementById("hideButtonRightContainer").classList.remove("hideButtonRightContainerClosed");

		hideButtonRightToggle = true;

		document.getElementById("hideButtonRight").src = "/graphics/HideButtonLongOpen.png";

		bindBackgroundFadeClick("hideButtonRightClicked()");
		enableBackgroundFade();

		document.getElementById("userqueue_wrapper").style.display = "block";
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

function subtitleButtonClicked()
{
	if (SUBTITLES_ENABLED)
	{
		SUBTITLES_ENABLED = false;
		document.getElementById("subtitleText").innerHTML = "";
		localStorage.setItem("subtitles", "off");
		document.getElementById("subtitleButton").classList.add("subtitleButton_disabled");
	}
	else
	{
		SUBTITLES_ENABLED = true;
		localStorage.setItem("subtitles", "on");
		document.getElementById("subtitleButton").classList.remove("subtitleButton_disabled");
	}
}

function lockControls()
{
	document.getElementById("playButton").disabled = true;
	document.getElementById("playButton").classList.add("controlsDisabled");
	document.getElementById("skipButton").classList.add("controlsDisabled");
	document.getElementById("skipButton").disabled = true;
	document.getElementById("seekSlider").disabled = true;
}

function unlockControls()
{
	document.getElementById("playButton").disabled = false;
	document.getElementById("playButton").classList.remove("controlsDisabled");
	document.getElementById("skipButton").classList.remove("controlsDisabled");
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
			setPlayButtonImage(true);
			updateServerTimeStamp();
		}
		//Playing or any other state
		else
		{
			youtubePlayer.pauseVideo();
			setPlayButtonImage(false);
			updateServerTimeStamp();
		}
	}
	else
	{
		if (document.getElementById("video").paused)
		{
			document.getElementById("video").play();
			setPlayButtonImage(true);
			updateServerTimeStamp();
		}
		else
		{
			document.getElementById("video").pause();
			setPlayButtonImage(false);
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

		document.getElementById("reactionButton").classList.remove("reactionButton_fullscreen");
		document.getElementById("reactionMenuContainer").classList.remove("reactionMenuContainer_fullscreen");
		document.getElementById("reactionPanel").classList.remove("reactionPanel_fullscreen");
		document.getElementById("playButton").classList.remove("playButton_fullscreen");
		document.getElementById("fullscreenButton").classList.remove("fullscreenButton_fullscreen");
		document.getElementById("seekSlider").classList.remove("seekSlider_fullscreen");
		document.getElementById("skipButton").classList.remove("skipButton_fullscreen");
		document.getElementById("lockButton").classList.remove("lockButton_fullscreen");
		document.getElementById("subtitleButton").classList.remove("subtitleButton_fullscreen");
		//
		document.getElementById("youtubePlayer").classList.add("youtube_standardscreen");
		document.getElementById("youtubePlayer").classList.remove("youtube_fullscreen");

		document.getElementById("video").classList.add("video_standardscreen");
		document.getElementById("video").classList.remove("video_fullscreen");

		document.getElementById("subtitleText").classList.add("subtitleText_standardscreen");
		document.getElementById("subtitleText").classList.remove("subtitleText_fullscreen");
	}
	else
	{
		document.getElementById("player").requestFullscreen();
		fullscreenEnabled = true;
		
		document.getElementById("reactionButton").classList.add("reactionButton_fullscreen");
		document.getElementById("reactionMenuContainer").classList.add("reactionMenuContainer_fullscreen");
		document.getElementById("reactionPanel").classList.add("reactionPanel_fullscreen");
		document.getElementById("playButton").classList.add("playButton_fullscreen");
		document.getElementById("fullscreenButton").classList.add("fullscreenButton_fullscreen");
		document.getElementById("seekSlider").classList.add("seekSlider_fullscreen");
		document.getElementById("skipButton").classList.add("skipButton_fullscreen");
		document.getElementById("lockButton").classList.add("lockButton_fullscreen");
		document.getElementById("subtitleButton").classList.add("subtitleButton_fullscreen");
		//
		document.getElementById("youtubePlayer").classList.add("youtube_fullscreen");
		document.getElementById("youtubePlayer").classList.remove("youtube_standardscreen");

		document.getElementById("video").classList.add("video_fullscreen");
		document.getElementById("video").classList.remove("video_standardscreen");

		document.getElementById("subtitleText").classList.add("subtitleText_fullscreen");
		document.getElementById("subtitleText").classList.remove("subtitleText_standardscreen");
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
		document.getElementById("subtitleButton").style.display = "inline";
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
		document.getElementById("subtitleButton").style.display = "inline";
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
		document.getElementById("subtitleButton").style.display = "none";
		document.getElementById("seekSlider").style.display = "none";
	}
	else
	{
		document.getElementById("reactionButton").style.display = "inline";
		document.getElementById("playButton").style.display = "inline";
		document.getElementById("fullscreenButton").style.display = "inline";
		document.getElementById("skipButton").style.display = "inline";
		document.getElementById("lockButton").style.display = "inline";
		document.getElementById("subtitleButton").style.display = "inline";
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
		document.getElementById("playButton").classList.add("playButton_playing");
		document.getElementById("playButton").classList.remove("playButton_paused");
	}
	else
	{
		document.getElementById("playButton").innerHTML = "&#x25b6;";
		document.getElementById("playButton").classList.add("playButton_paused");
		document.getElementById("playButton").classList.remove("playButton_playing");
	}
}
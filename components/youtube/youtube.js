var tag = document.createElement('script');

function initYoutube()
{
	if (!youtubeDisabled)
	{
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}
}

function onYouTubeIframeAPIReady()
{
	youtubePlayer = new YT.Player('youtubePlayer', {
//		height: '390',
//		width: '640',
		videoId: '',
		cookieFlags: 'sameSite=none',
		events: {
			'onReady': onYoutubePlayerReady,
			'onStateChange': onYoutubePlayerStateChange,
			'onError': onYoutubeError
		  }
	});
}

function youtubeButton()
{
	bindBackgroundFadeClick("youtubeButton()");
	removeToastMessage();
	if (document.getElementById("youtubeMenu").style.display == "block")
	{
<<<<<<< HEAD
		setTimeout(function(){ document.getElementById("youtubeMenu").style.display = "none"; }, 200);
=======
		disableBackgroundFade();
		setTimeout(function(){ 
			document.getElementById("youtubeMenu").style.display = "none";
			enablePointerEventsInMenus();
			}, 200);
>>>>>>> staging
		document.getElementById("youtubeMenu").className = "popupWindow_out";
		document.getElementById("youtubeInput").value = "";
	}
	else
	{
		enableBackgroundFade();
		setTimeout(function(){
			document.getElementById("settings").style.display = "none";
			document.getElementById("browser").style.display = "none";
		}, 200);
		document.getElementById("settings").className = "popupWindow_out";
		document.getElementById("browser").className = "popupWindow_out";
		document.getElementById("youtubeMenu").className = "popupWindow_in";
		document.getElementById("youtubeMenu").style.display = "block";
		document.getElementById("youtubeInput").focus();
	}
}

function playYoutubeVideo(urlOverride = "", overridePlaystateToPlay = false)
{
	if (youtubeDisabled)
	{
		toast("YouTube is disabled in settings");
		return;
	}
	else if (!youtubeReady)
	{
		toast("YouTube player not ready");
		return;
	}
	else
	{
		var fullUrl = document.getElementById("youtubeInput").value.split("watch?v=")[1];
		var youtubeVideoId = "";
		if (urlOverride.length > 0 && urlOverride.split("watch?v=").length == 2)
		{
			youtubeVideoId = urlOverride.split("watch?v=")[1];
			disableBackgroundFade();
		}
		else
		{
			if (fullUrl != undefined)// && fullUrl.length == 11) //WARNING:  This number is 11 because it is how long video IDs are right now in 2020.  If this is ever changed, this won't work
			{
				youtubeVideoId = document.getElementById("youtubeInput").value.split("watch?v=")[1];
				disableBackgroundFade();
			}
			else
			{
				toast("Invalid YouTube Video URL");
				return;
			}
		}
		
		document.getElementById("filePath").value = youtubeVideoId;
		youtubePlayer.loadVideoById(youtubeVideoId, 0);
		document.getElementById("youtubeInput").value = "";
		document.getElementById("youtubeMenu").style.display = "none";
		document.getElementById("youtubePlayer").style.display = "block";
		document.getElementById("video").style.display = "none";
		document.getElementById("playButton").innerHTML = "&#x23f8;";
		document.getElementById("playState").value = !overridePlaystateToPlay ? "paused" : "playing";
		
		updateServerTimeStamp(.01);
	}
}

function onYoutubePlayerReady(event)
{
	if (!youtubeDisabled)
		youtubeReady = true;
}

function onYoutubePlayerStateChange()
{
	
}

function onYoutubeError()
{
	//alert("Video Unavailable");
}

function isYoutubeVideo()
{
	if (youtubeDisabled || !youtubeReady)
		return false;
	if (document.getElementById("filePath").value.charAt(0) == "/" ||
		document.getElementById("filePath").value == "" ||
		document.getElementById("filePath").value == "null" ||
		document.getElementById("filePath").value == "undefined")
		return false;
	else
		return true;
}

function getYoutubeVideoTitle(url)
{
	var title = "";
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/youtube/getYoutubeVideoTitle.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			title = this.responseText;
		}
	};
	xhttp.send("url=" + url);
	return title;
}
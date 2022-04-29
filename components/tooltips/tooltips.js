function toolTipOver()
{
	var message = getToolTipMessage(this.id);
	var box = document.createElement("div");
	box.id = "activeToolTip";
	box.position = "absolute";
	var position = this.getBoundingClientRect();
	var p = document.createElement("p");
	p.innerHTML = message;
	box.appendChild(p);
	this.appendChild(box);
}

function toolTipOut()
{
	document.getElementById("activeToolTip").parentNode.removeChild(document.getElementById("activeToolTip"));
}

function getToolTipMessage(id)
{
	switch(id){
		case "usernameTip":
			return "Changing username will result in your old username lingering for a moment in the lobby (which will make it appear as though someone new joined before your old username expires)";
			break;
		case "soundsTip":
			return "This toggles whether you will hear lobby sounds when someone leaves or joins the lobby";
			break;
		case "toleranceTip":
			return "Adjust this slider to suit your connection.  The lower the number, the more 'in-sync' with the lobby you will be, but it may cause issues if your network latency is high.  Increase this value if you are having sync-buffering issues";
			break;
		case "authTip":
			return "An authentication key is required to access this site.  If you think you should have access to this site but do not, contact Ghostmij17#4572 through Discord";
			break;
		case "disableYoutubeTip":
			return "YouTube may cause issues with some browsers and settings.  If YouTube isn't working and/or the videos being played from server are not syncing properly, disabling YouTube may fix the issue";
			break;
<<<<<<< HEAD
=======
		case "preloadTip":
			return "Toggling will refresh the page.  Enabling will allow GhostSync to download the entire video.  Useful if you are having trouble watching a video without buffering, but this will also use more bandwidth and might cause more bufferring until the video is fully downloaded (video is fully downloaded when the orange dot turns green)";
			break;
		case "reactionsTip":
			return "Disabling this will prevent reactions from appearing on your screen";
			break;
		case "slowConnectionTip":
			return "With this setting enabled, videos will always load their lower-quality versions (when available) to ensure a smooth experience on slow connections.  This setting is useful if your connection consistently has trouble playing videos  (Note:  Lower quality versions of videos are automatically loaded, even with this setting off, if your connection has trouble loading a video.  Enabling this setting will ensure the lower quality version of the video is always loaded)";
			break;
		default:
			return "This is the default tooltip text, meaning the developer was too dumb to remember to add a tooltip :)  Make sure to give them shit";
>>>>>>> staging
	}
}
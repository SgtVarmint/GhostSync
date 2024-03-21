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
			return "Set a new username";
		case "soundsTip":
			return "This toggles whether you will hear lobby sounds when someone leaves or joins the lobby";
		case "toleranceTip":
			return "This value shouldn't need adjusted unless your connection has a very high latency.  Increasing this value can fix sync-bufferring issues when high latency is the culprit";
		case "authTip":
			return "An authentication key is required to access this site.  If you think you should have access to this site but do not, contact Mikau (@ghostmij17) through Discord";
		case "disableYoutubeTip":
			return "YouTube may cause issues with some browsers and settings.  If YouTube isn't working and/or the videos being played from server are not syncing properly, disabling YouTube may fix the issue";
		case "preloadTip":
			return "Toggling will refresh the page.  Enabling will allow GhostSync to download the entire video.  Useful if you are having trouble watching a video without buffering, but this will also use more bandwidth and might cause more bufferring until the video is fully downloaded (video is fully downloaded when the orange dot turns green)";
		case "reactionsTip":
			return "Disabling this will prevent reactions from appearing on your screen";
		case "slowConnectionTip":
			return "Forces the loading of low-quality versions of videos (when available)";
		default:
			return "This is the default tooltip text, meaning the developer was too dumb to remember to add a tooltip :)  Make sure to give them shit";
	}
}
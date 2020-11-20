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
			return "Adjust this slider to suit your connection.  The lower the number, the more 'in-sync' with the lobby you will be, but it may cause issues if your network is slow.  Increase this value if you are having sync-buffering issues";
			break;
		case "authTip":
			return "An authentication key is required to access this site.  If you think you should have access to this site but do not, contact Ghostmij17#4572 through Discord";
			break;
		case "disableYoutubeTip":
			return "YouTube may cause issues with some browsers and settings.  If YouTube isn't working and/or the videos being played from server are not syncing properly, disabling YouTube may fix the issue";
			break;
		case "preloadTip":
			return "Enabling will allow video to buffer the entire video.  Useful if video buffers often, but will use more bandwith up-front.  (requires page refresh or new video to take effect)";
			break;
	}
}
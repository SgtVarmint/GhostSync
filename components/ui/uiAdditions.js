function resetNavButtons()
{
	document.getElementById("videoBrowserButton").innerHTML = "Video Browser";
	document.getElementById("videoBrowserButton").style.color = "white";
	
	document.getElementById("youtubeButton").innerHTML = "Youtube";
	document.getElementById("youtubeButton").style.color = "white";
	
	document.getElementById("settingsButton").innerHTML = "Settings";
	document.getElementById("settingsButton").style.color = "white";
}

function enablePointerEventsInMenus()
{
	document.getElementById("browser").style.pointerEvents = "auto";
	document.getElementById("youtubeMenu").style.pointerEvents = "auto";
	document.getElementById("settings").style.pointerEvents = "auto";
}

function disablePointerEventsInMenus()
{
	document.getElementById("browser").style.pointerEvents = "none";
	document.getElementById("youtubeMenu").style.pointerEvents = "none";
	document.getElementById("settings").style.pointerEvents = "none";
}
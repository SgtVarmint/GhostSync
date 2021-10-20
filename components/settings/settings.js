function settingsButton()
{
	if (document.getElementById("settings").style.display == "block")
	{
		setTimeout(function(){ 
			document.getElementById("settings").style.display = "none";
			enablePointerEventsInMenus();
			}, 200);
		document.getElementById("settings").className = "popupWindow_out";
		
		disablePointerEventsInMenus();
		resetNavButtons();
	}
	else
	{
		setTimeout(function(){
			document.getElementById("browser").style.display = "none";
			document.getElementById("youtubeMenu").style.display = "none";
			enablePointerEventsInMenus();
		}, 200);
		document.getElementById("browser").className = "popupWindow_out";
		document.getElementById("youtubeMenu").className = "popupWindow_out";
		document.getElementById("settings").style.display = "block";
		document.getElementById("settings").className = "popupWindow_in";
		
		disablePointerEventsInMenus();
		resetNavButtons();
		document.getElementById("settingsButton").innerHTML = "Close";
		document.getElementById("settingsButton").style.color = "blue";
	}
}
function settingsButton()
{
	bindBackgroundFadeClick("settingsButton()");
	if (document.getElementById("settings").style.display == "block")
	{
		setTimeout(function(){ document.getElementById("settings").style.display = "none"; }, 200);
		document.getElementById("settings").className = "popupWindow_out";
	}
	else
	{
		enableBackgroundFade();
		removeToastMessage();
		setTimeout(function(){
			document.getElementById("browser").style.display = "none";
			document.getElementById("youtubeMenu").style.display = "none";
		}, 200);
		document.getElementById("browser").className = "popupWindow_out";
		document.getElementById("youtubeMenu").className = "popupWindow_out";
		document.getElementById("settings").style.display = "block";
		document.getElementById("settings").className = "popupWindow_in";
	}
}
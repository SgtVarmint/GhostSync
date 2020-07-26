function settingsButton()
{
	if (document.getElementById("settings").style.display == "block")
	{
		document.getElementById("settings").style.display = "none";
	}
	else
	{
		document.getElementById("settings").style.display = "block";
		document.getElementById("browser").style.display = "none";
		document.getElementById("youtubeMenu").style.display = "none";
	}
}
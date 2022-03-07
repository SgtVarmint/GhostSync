function serveInteractPrompt()
{
	var interactCheck = document.createElement("div");
	interactCheck.id = "interactCheck";
	interactCheck.innerHTML = "<br><br><br><br><br><br><br><br><br><span>Click Anywhere</span>";
	
	interactCheck.onclick = function(){
		document.getElementById("interactCheck").className = "fade_out";
		setTimeout(function(){ document.getElementById("interactCheck").parentNode.removeChild(document.getElementById("interactCheck")); }, 175);
	};
	
	document.body.appendChild(interactCheck);
}

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

function bindBackgroundFadeClick(functionName)
{
	document.getElementById("backgroundFade").setAttribute("onclick", "javascript:" + functionName + ";");
}

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
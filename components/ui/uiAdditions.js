function serveInteractPrompt()
{
	var interactCheck = document.createElement("div");
	interactCheck.id = "interactCheck";
	
	interactCheckInnerDiv = document.createElement("div");
	interactCheckInnerDiv.innerHTML = "Click Anywhere";
	
	interactCheck.onclick = function(){
		document.getElementById("interactCheck").className = "fade_out";
		setTimeout(function(){ document.getElementById("interactCheck").parentNode.removeChild(document.getElementById("interactCheck")); }, 175);
	};
	
	interactCheck.appendChild(interactCheckInnerDiv);
	document.body.appendChild(interactCheck);
}

 function resetNavButtons()
 {
 	if (!mobile)
 	{
 		document.getElementById("videoBrowserButton").innerHTML = "Video Browser";
		document.getElementById("videoBrowserButton").style.color = "white";
		
 		document.getElementById("youtubeButton").innerHTML = "Youtube";
 		document.getElementById("youtubeButton").style.color = "white";
		
 		document.getElementById("settingsButton").innerHTML = "Settings";
 		document.getElementById("settingsButton").style.color = "white";
 	}
 	else
 	{
 		document.getElementById("videoBrowserButton").innerHTML = "&#x2630;";
 		document.getElementById("videoBrowserButton").style.color = "white";
		
 		document.getElementById("youtubeButton").innerHTML = "&#x25b6;";
		document.getElementById("youtubeButton").style.color = "white";
		
 		document.getElementById("settingsButton").innerHTML = "&#9881;";
 		document.getElementById("settingsButton").style.color = "white";
 	}
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

function enableTheaterMode()
{
	
}

function disableTheaterMode()
{
	
}
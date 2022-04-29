window.onload = function(){
	
	checkForMobileHome();
	
	document.getElementById("lobbyInput").value = localStorage.getItem("lobbyName");
	document.getElementById("userInput").value = localStorage.getItem("userName");
	document.getElementById("lobbyButton").onclick = lobbyButtonClick;
	
	document.getElementById("lobbyInput").addEventListener("keyup", function(event)
	{
		if (event.keyCode === 13)
		{
			event.preventDefault();
			document.getElementById("userInput").focus();
		}
	});
	
	document.getElementById("userInput").addEventListener("keyup", function(event)
	{
		if (event.keyCode === 13)
		{
			event.preventDefault();
			document.getElementById("lobbyButton").click();
		}
	});
	
	document.getElementById("authText").addEventListener("keyup", function(event)
	{
		if (event.keyCode === 13)
		{
			event.preventDefault();
			document.getElementById("authButton").click();
		}
	});
	
	var toolTips = document.getElementsByClassName("toolTip");
	for (var i = 0; i < toolTips.length; i++)
	{
		toolTips[i].onmouseover = toolTipOver;
		toolTips[i].onmouseout = toolTipOut;
	}

	document.getElementById("authButton").onclick = authButtonClick;
	document.getElementById("authText").value = localStorage.getItem("access");
	performAJAXCall("home");
	updateBuildInfo();
}
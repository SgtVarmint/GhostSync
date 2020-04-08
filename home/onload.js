window.onload = function(){
	
	document.getElementById("lobbyInput").value = localStorage.getItem("lobbyName");
	document.getElementById("lobbyButton").onclick = lobbyButtonClick;
	
	document.getElementById("lobbyInput").addEventListener("keyup", function(event)
	{
		if (event.keyCode === 13)
		{
			event.preventDefault();
			document.getElementById("lobbyButton").click();
		}
	});

	
}
function lobbyButtonClick()
{
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	document.location.href = "/components/lobby/lobby.html"
}
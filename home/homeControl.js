function lobbyButtonClick()
{
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	localStorage.setItem("userName", document.getElementById("userInput").value);
	document.location.href = "/components/lobby/lobby.html"
}
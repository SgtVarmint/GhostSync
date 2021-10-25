function lobbyButtonClick()
{
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	localStorage.setItem("userName", document.getElementById("userInput").value);
	document.location.href = "/components/lobby/lobby.html"
}

function authenticationButton()
{
	if (document.getElementById("auth").style.display == "block")
	{
		document.getElementById("auth").style.display = "none";
	}
	else
	{
		document.getElementById("auth").style.display = "block";
		document.getElementById("authText").focus();
	}
}
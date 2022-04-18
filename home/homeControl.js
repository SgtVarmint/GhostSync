function lobbyButtonClick()
{
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	localStorage.setItem("userName", formatUsername(document.getElementById("userInput").value));
	
	//Check if user already has Id
	let userId = localStorage.getItem("userId");
	if (userId == null)
	{
		let userIdList = getUserIdList();
		let newId = "";
		while(true)
		{
			//Give user new Id
			newId = "" + getRandomNumber(10);
			if (!userIdList.includes(newId))
				break;
		}
		localStorage.setItem("userId", newId);

	}
		
	redirect("components/lobby/lobby.html");
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
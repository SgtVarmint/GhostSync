function lobbyButtonClick() {
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	localStorage.setItem("userName", formatUsername(document.getElementById("userInput").value));

	//Check if user already has Id
	let userId = localStorage.getItem("userId");
	let userIdList = getUserIdList();
	if (userId != null)
	{
		if (!userIdList.includes(userId))
		{
			addNewUserIdToList(userId);
		}
	}
	else if (userId == null)
	{
		let newId = "";
		while (true) {
			//Give user new Id
			newId = "" + getRandomNumber(10);
			if (!userIdList.includes(newId))
				break;
		}
		addNewUserIdToList(newId);
		localStorage.setItem("userId", newId);

	}

	redirect("components/lobby/lobby.html");
}

function authenticationButton()
{
	document.getElementById("auth").classList.toggle("hidden");
	document.getElementById("authText").focus();
}
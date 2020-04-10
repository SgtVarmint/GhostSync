function userUpdate()
{
	var lobby = document.getElementById("lobbyName").value;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","userUpdate.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			userUpdateAction(this);
		}
	}
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&userName=" + localStorage.getItem("userName"));
}

function userUpdateAction(file)
{
	var userInfo = file.responseText.split("#");
	var currentUsers = document.getElementsByClassName("user");
	var userListNeedsUpdated = false;
	
	if (userInfo.length - 1 == currentUsers.length)
	{
		for (var i = 0; i < userInfo.length - 1; i++)
		{
			var info = userInfo[i].split("^");
			if (info[0] != currentUsers[i].innerHTML)
			{
				userListNeedsUpdated = true;
				break;
			}
		}
	}
	else if (userInfo.length -1 > currentUsers.length)
	{
		userListNeedsUpdated = true;
		playSound("TA.mp3");
	}
	else
	{
		userListNeedsUpdated = true;
		playSound("BB.mp3");
	}
	
	if (userListNeedsUpdated)
	{
		document.getElementById("userList").innerHTML = "";
		for (var i = 0; i < userInfo.length - 1; i++)
		{
			var info = userInfo[i].split("^");
			var li = document.createElement("li");
			li.className = "user";
			li.innerHTML = info[0];
			document.getElementById("userList").appendChild(li);
		}
	}
	closeLoader();
}

function playSound(fileName)
{
	var soundFile = new Audio("/sounds/" + fileName)
	soundFile.volume = .25;
	soundFile.play();
}
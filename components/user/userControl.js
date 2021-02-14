function userUpdate()
{
	var timeStamp = isYoutubeVideo() ? youtubePlayer.getCurrentTime() : document.getElementById("video").currentTime;
	var activity = userActive ? "1" : "0";
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/user/userUpdate.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			userUpdateAction(this);
		}
	}
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&userName=" + localStorage.getItem("userName") + "&timeStamp=" + timeStamp + "&activity=" + activity + "&queuedReaction=" + queuedReaction);
	queuedReaction = "none";
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
			else if (info[4] != "none")
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
			var temp = parseInt(info[2]);
			var minutes = temp / 60;
			var seconds = temp % 60;
			if (seconds < 10)
				seconds = "0" + seconds;
			var hrTimeStamp = parseInt(minutes) + ":" + seconds;
			var statusColor = info[3] == "1" ? "green" : "orange";
			
			//This line builds the individual user li innerHTML
			li.innerHTML = "<span style='font-style: bolder; color: " + statusColor + "'>&#8226;</span> " + info[0] + " - " + hrTimeStamp;
			if (info[4] != "none" && info[4] != "")
			{
				processIncomingReaction(info[0], info[4]);
			}
			document.getElementById("userList").appendChild(li);
		}
	}
	closeLoader();
}

function playSound(fileName)
{
	if (LOBBY_SOUND_SETTING == "on")
	{
		var soundFile = new Audio("/sounds/" + fileName)
		soundFile.volume = .25;
		soundFile.play();
	}
}
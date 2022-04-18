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
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&userName=" + localStorage.getItem("userName") + "&timeStamp=" + timeStamp + "&activity=" + activity + "&queuedReaction=" + queuedReaction + "&userId=" + localStorage.getItem("userId"));
	queuedReaction = "none";
}

function userUpdateAction(file)
{
	//info[0] is the current user's username
	//info[1] is the current user's timestamp of when they last updated their status
	//info[2] is the current user's timestamp of their video
	//info[3] is the current state of the user (active or away)
	//info[4] is the current user's reaction (if sent) to be shown to the lobby
	//info[5] is the current user's id
	
	var userInfo = file.responseText.split("#");
	var currentUsers = document.getElementsByClassName("user");
	var userListNeedsUpdated = false;
	
	console.log(userInfo.length + "    " + currentUsers.length);
	
	if (userInfo.length - 1 == currentUsers.length)
	{
		for (var i = 0; i < userInfo.length - 1; i++)
		{
			let info = userInfo[i].split("^");
			let currentUserFound = false;
			for (let j = 0; j < currentUsers.length; j++)
			{
				console.log(info[5] + "     " + currentUsers[j].id);
				if (info[5] == currentUsers[j].id)
				{
					currentUserFound = true;
					break;
				}
			}
			
			if (!currentUserFound)
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
			let usersAlreadyInDOM = document.getElementsByClassName("user");
			
			var info = userInfo[i].split("^");
			var li = document.createElement("li");
			
			if (info[5] == localStorage.getItem("userId"))
				li.className = "user activeUser";
			else
				li.className = "user";
			li.id = info[5];
			li.name = info[0];
			var temp = parseInt(info[2]);
			var minutes = temp / 60;
			var seconds = temp % 60;
			if (seconds < 10)
				seconds = "0" + seconds;
			
			let userName = info[0];
			
			var hrTimeStamp = convertMinutesToHours(parseInt(minutes)) + "<span style='font-size: .7em'>:" + seconds + "</span>";
			var statusColor = info[3] == "1" ? "green" : "orange";
			
			let duplicateUserCount = 0;
			let duplicateDesignation = "";
			
			for (let j = 0; j < usersAlreadyInDOM.length; j++)
			{
				if (usersAlreadyInDOM[j].name == userName)
					duplicateUserCount++;
			}
			
			if (duplicateUserCount > 0)
				duplicateDesignation = "(" + duplicateUserCount + ")"
			
			//This line builds the individual user li innerHTML
			li.innerHTML = "<span style='font-style: bolder; color: " + statusColor + "'>&#8226;</span> " + userName + duplicateDesignation + " - " + hrTimeStamp;
			if (info[4] != "none" && info[4] != "")
			{
				processIncomingReaction(info[0], info[4]);
			}
			document.getElementById("userList").appendChild(li);
		}
		
		/*Uncomment this portion of code to add test users to user list
		for (var i = 0; i < 10; i++)
		{
			var li = document.createElement("li");
			li.innerHTML = "<span style='font-style: bolder; color: " + "green" + "'>&#8226;</span> " + "Test User" + " - " + "0:00";
			document.getElementById("userList").appendChild(li);
		}
		*/
	}
	closeLoader();
}

function getUserIdList()
{
	let fileText = "";
	let fileLocation = "/data/userIdList.txt";
	let xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		fileText = this.responseText;
	}
	xhttp.open("GET", "" + fileLocation, false);
	xhttp.send();
		
	return fileText.split("\n");
}

function addNewUserIdToList(newUserId)
{
	let xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/user/addNewUserId.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("newUserId=" + newUserId);
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
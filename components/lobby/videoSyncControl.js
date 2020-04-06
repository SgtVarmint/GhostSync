//This function should only be used by host
function updateServerTimeStamp()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","updateServerTimeStamp.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	getServerTime();
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value + "&timeStamp=" + document.getElementById("video").currentTime + "&serverTime=" + document.getElementById("serverTime").value);
}

//This function should only be used by guests
function syncVideo()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","getServerTimeStamp.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			syncVideoAction(this);
		}
	}
	xhttp.send("lobbyName=" + document.getElementById("lobbyName").value);
}

function syncVideoAction(file)
{
	var times = file.responseText.split("^");
	//Index 0 is the video timestamp
	//Index 1 is the server time when host updated timestamp
	getServerTime();
	
	var timeOffset = document.getElementById("serverTime").value - times[1];
	var newTimeStamp = parseFloat(times[0]) + parseFloat(timeOffset);
	
	document.getElementById("video").currentTime = newTimeStamp;
	document.getElementById("video").play();
}

function getServerTime()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","getServerTime.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			getServerTimeAction(this);
		}
	}
	xhttp.send();
}

function getServerTimeAction(file)
{
	var temp = file.responseText;
	var serverTime = temp.slice(0, temp.length - 4) + "." + temp.slice(temp.length - 4, temp.length - 1)
	document.getElementById("serverTime").value = serverTime;
}
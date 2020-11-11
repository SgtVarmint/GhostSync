//This method handles updating tracking on the client, but ends with a call to server to update server file
function updateTracking()
{
	//No tracking for YouTube videos
	if (isYoutubeVideo())
		return;

	var titleAlreadyTrackedIndex = -1;
	for (var i = 0; i < trackingInfo.length; i++)
	{
		if (trackingInfo[i][0] == document.getElementById("filePath").value)
		{
			titleAlreadyTrackedIndex = i;
			break;
		}
	}
	var currentTime = document.getElementById("video").currentTime;
	var duration = document.getElementById("video").duration;
	var percentageFinished = parseFloat(currentTime) / parseFloat(duration);
	var progressNumber = "-1";

	if (percentageFinished >= 0.0 && percentageFinished <= 0.05)
	{
		progressNumber = "0";
		videoEnded = false;
	}
	else if(percentageFinished > 0.05 && percentageFinished <= 0.50)
	{
		progressNumber = "1";
		videoEnded = false;
	}
	else if(percentageFinished > 0.50 && percentageFinished <= 0.75)
	{
		progressNumber = "2";
		videoEnded = false;
	}
	else if(percentageFinished > 0.75 && percentageFinished <= 0.95)
	{
		progressNumber = "3";
		videoEnded = false;
	}
	else if(percentageFinished > 0.95)
	{
		progressNumber = "4";
		videoEnded = true;
	}
	
	if (titleAlreadyTrackedIndex != -1 && !videoEnded)
	{
		trackingInfo[titleAlreadyTrackedIndex][1] = currentTime;
		trackingInfo[titleAlreadyTrackedIndex][2] = progressNumber;
	}
	else if (titleAlreadyTrackedIndex != -1 && videoEnded)
	{
		trackingInfo[titleAlreadyTrackedIndex][1] = 0;
		trackingInfo[titleAlreadyTrackedIndex][2] = progressNumber;
	}
	else
	{
		var newTitle = new Array();
		newTitle[0] = document.getElementById("filePath").value;
		newTitle[1] = document.getElementById("video").currentTime;
		newTitle[2] = progressNumber;
		trackingInfo.push(newTitle);
	}
	updateTrackingInfo();
}

//This method is for updating the server tracking file, not the local tracking info
function updateTrackingInfo()
{
	//Compile the array into string format for storing on file
	var trackingInfoString = "";
	for (var i = 0; i < trackingInfo.length - 1; i++)
	{
		trackingInfoString += trackingInfo[i][0];
		trackingInfoString += "^";
		trackingInfoString += trackingInfo[i][1];
		trackingInfoString += "^";
		trackingInfoString += trackingInfo[i][2];
		trackingInfoString += "\n";
	}
	trackingInfoString += trackingInfo[trackingInfo.length - 1][0];
	trackingInfoString += "^";
	trackingInfoString += trackingInfo[trackingInfo.length - 1][1];
	trackingInfoString += "^";
	trackingInfoString += trackingInfo[trackingInfo.length - 1][2];
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/progression/updateTrackingInfo.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			//(this);
		}
	}
	xhttp.send("trackingInfoString=" + trackingInfoString + "&lobbyName=" + localStorage.getItem("lobbyName"));
}

function pullTrackingInfo()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/progression/pullTrackingInfo.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			pullTrackingInfoAction(this);
		}
	}
	xhttp.send("lobbyName=" + localStorage.getItem("lobbyName"));
}

function pullTrackingInfoAction(file)
{
	var fileInfo = file.responseText.split("\n");
	trackingInfo = new Array();
	for (var i = 0; i < fileInfo.length; i++)
	{
		trackingInfo[i] = fileInfo[i].split("^");
	}
}

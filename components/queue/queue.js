//This function handles sending an update to the queue to the server
//This should be called EVERY time an update to the queue is made on the client
function updateQueue()
{
	//Compile the array into string format for storing on file
	var queueString = "";
	for (var i = 0; i < queue.length - 1; i++)
	{
		queueString += queue[i];
		queueString += "\n";
	}
	queueString += queue[queue.length - 1];
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/queue/updateQueue.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			console.log("Queue update pushed to server");
		}
	}
	xhttp.send("queueString=" + queueString + "&lobbyName=" + localStorage.getItem("lobbyName"));
}

function addCurrentVideoToQueue()
{
	let videoPath = formatVideoPathForServer(document.getElementById("filePath").value);
	let timestamp = document.getElementById("video").currentTime;
	let newQueueItem = videoPath + "^" + timestamp;
	if (queue.length > 0 && queue[0].includes(videoPath))
	{
		toast("The current video is already queued to play next!")
		return;
	}
	else if (queue.length == 0)
	{
		return;
	}
	queue.unshift(newQueueItem);
	updateQueue();
	toast("Current video added to the front of the queue");
	updateQueueDOM();
}

function shiftQueue()
{
	queue.shift();
	updateQueue();
}

function pushQueue(title)
{
	queue.push(title);
	updateQueue();
	updateQueueDOM();
}

//This function handles getting the queue from the server and loading it into the application for the client
//This works much like how the users and progression tracking works from a data perspective
function pullQueue()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/queue/pullQueue.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			pullQueueInfo(this);
		}
	};
	xhttp.send("lobbyName=" + localStorage.getItem("lobbyName"));
}

var queueDOMNeedsUpdate = true;
var initialQueueLoaded = false;
function pullQueueInfo(file)
{
	//Get queue and load it into memory
	var fileInfo = file.responseText.split("\n");
	if (fileInfo[0] != "" && fileInfo[0] != "undefined")
	{
		//Check if next video has changed from server
		if (fileInfo[0] != queue[0] || fileInfo.length != queue.length)
		{
			queue = new Array();
			for (var i = 0; i < fileInfo.length; i++)
			{
				queue.push(fileInfo[i]);
			}
			queueDOMNeedsUpdate = true;
		}
	}
	else if (fileInfo[0] == "undefined")
	{
		if (queue.length > 0)
		{
			queue = new Array();
			queueDOMNeedsUpdate = true;
		}
	}
		
	if (queueDOMNeedsUpdate)
	{
		if (initialQueueLoaded)
			toast("Queue updated..");
		else
			initialQueueLoaded = true;
		updateQueueDOM();
		queueDOMNeedsUpdate = false;
	}
}

function updateQueueDOM()
{
	//Display the queue on page
	document.getElementById("queueArea").style.visibility = "visible";
	document.getElementById("queue").style.display = "block";
	document.getElementById("queue").innerHTML = "";
	
	//var newText = document.createElement("span");
	//newText.innerHTML = "Next Up..";
	//document.getElementById("queue").appendChild(newText);
	
	//document.getElementById("queue").appendChild(document.createElement("hr"));
	
	//var clearButton = document.createElement("a");
	//clearButton.innerHTML = "Clear Queue";
	//clearButton.href = "javascript:clearButtonClicked();";
	//document.getElementById("queue").appendChild(clearButton);
	
	//document.getElementById("queue").appendChild(document.createElement("hr"));
	
	if (queue.length > 0)
	{
		for (var i = 0; i < queue.length; i++)
		{
			let queueItem = queue[i].split("^")[0];
			let videoTimestamp = queue[i].split("^")[1] == null ? 0 : queue[i].split("^")[1];
			var video = document.createElement("a");
			if (!queueItem.includes("watch?v="))
			{
				video.innerHTML += queueItem != "undefined" ? queueItem.split("/")[queueItem.split("/").length - 1].replace(/\.[^/.]+$/, "") : "Queue is empty";
			}
			else
			{
				//Check lookup table to see if youtube video has already been matched
				var titleIndex = -1;
				for (var j = 0; j < youtubeLookupTable.length; j++)
				{
					if (youtubeLookupTable[j][0] == queueItem)
					{
						titleIndex = j;
						break;
					}
				}
				if (titleIndex == -1)
				{
					var fetchedTitle = getYoutubeVideoTitle(queueItem);
					video.innerHTML = "(YT) " + fetchedTitle;
					var newArray = new Array();
					newArray.push(queueItem);
					newArray.push(fetchedTitle);
					youtubeLookupTable.push(newArray);
				}
				else
				{
					video.innerHTML = "(YT) " + youtubeLookupTable[titleIndex][1];
				}
			}
			video.innerHTML = "- " + video.innerHTML;
			video.href = queueItem != "undefined" ? 'javascript:queueVideoClicked("' + queueItem + '", ' + i + ', ' + videoTimestamp + ');' : "javascript:return null;";
			document.getElementById("queue").appendChild(video);
			document.getElementById("queue").appendChild(document.createElement("br"));
		}
	}
	else
	{
		queue = new Array();
		var video = document.createElement("a");
		video.href = "javascript:return null;";
		document.getElementById("queue").appendChild(video);
	}
}

function queueVideoClicked(video, index, timestamp = 0)
{
	var message;
	if (video.includes("www.youtube.com"))
	{
		var titleIndex = -1;
		for (var i = 0; i < youtubeLookupTable.length; i++)
		{
			if (youtubeLookupTable[i][0] == video)
			{
				titleIndex = i;
				break;
			}
		}
		if (titleIndex != -1)
		{
			message = youtubeLookupTable[titleIndex][1];
		}
		else
		{
			message = video;
		}
	}
	else
	{
		message = video.split("/")[video.split("/").length - 1].replace(/\.[^/.]+$/, "");
	}

	customQueuePopup(message, index, timestamp);
}

function removeQueueVideo(indexToRemove)
{
	queue.splice(indexToRemove, 1);
	updateQueue();
		
	toast("Video removed from queue");
	updateQueueDOM();
}

function pushToFrontOfQueue(indexToPush)
{
	var tempVideo = queue[indexToPush];
	queue.splice(indexToPush, 1);
	queue.unshift(tempVideo);
	updateQueue();
	toast("Video moved to top of queue");
	updateQueueDOM();
}

function pushToBackOfQueue(indexToPush)
{
	var tempVideo = queue[indexToPush];
	queue.splice(indexToPush, 1);
	pushQueue(tempVideo);
	toast("Video moved to back of queue");
}

function clearButtonClicked()
{
	ghostConfirm("This will completely wipe the current queue.&nbsp;&nbsp;Are you sure you want to do this?", "clearQueue");
}

function clearQueue(confirm)
{
	if (confirm)
	{
		queue = new Array();
		updateQueue();
		updateQueueDOM();
		toast("Queue has been cleared");
	}
	else
	{
		//Cancel clicked
	}
}

function addToQueueClicked(video)
{
	if (queue[0] == "undefined" || queue[0] == undefined)
		queue = new Array();
	pushQueue(video);
	toast("Video added to queue");
}

function addYoutubeVideoToQueue()
{
	if (!document.getElementById("youtubeInput").value.includes("watch?v="))
	{
		toast("Invalid YouTube Video URL");
		return;
	}
	
	if (queue[0] == "undefined" || queue[0] == undefined)
		queue = new Array();
	pushQueue(document.getElementById("youtubeInput").value);
	document.getElementById("youtubeInput").value = "";
	document.getElementById("youtubeMenu").style.display = "none";
	
	resetnavButtons();
	disableBackgroundFade();
	
	toast("Video added to queue");
}

function customQueuePopup(message, index, timestamp, elementToAppendTo = "body", margTop = "15%", margLeft = "13%", margRight = "13%", styleTop = "100")
{
	removeCustomQueuePopup();
	
	let seconds = parseInt(timestamp);
	let minutes = seconds / 60;
	let remainingSeconds = seconds % 60;
	if (remainingSeconds < 10)
		remainingSeconds = "0" + remainingSeconds;
	let hoursMinutes = convertMinutesToHours(minutes);
	
	var confirmDiv = document.createElement("div");

	var messageDiv = document.createElement("div");
	messageDiv.innerHTML = "<h3>" + message + "</h3><p>" + hoursMinutes + "<span style='font-size: .9em'>:" + remainingSeconds + "</span></p>";
	confirmDiv.appendChild(messageDiv);
	
	var buttonDiv = document.createElement("div");
	
	var moveToFrontButton = document.createElement("a");
	moveToFrontButton.innerHTML = "Move To Front";
	moveToFrontButton.href = "javascript:pushToFrontOfQueue(" + index + "); removeCustomQueuePopup();";
	moveToFrontButton.className = "defaultButton";
	moveToFrontButton.style.margin = "10px";
	buttonDiv.appendChild(moveToFrontButton);
	
	var moveToBackButton = document.createElement("a");
	moveToBackButton.innerHTML = "Move To Back";
	moveToBackButton.href = "javascript:pushToBackOfQueue(" + index + "); removeCustomQueuePopup();";
	moveToBackButton.className = "defaultButton";
	moveToBackButton.style.margin = "10px";
	buttonDiv.appendChild(moveToBackButton);
	
	var removeButton = document.createElement("a");
	removeButton.innerHTML = "Remove";
	removeButton.href = "javascript:removeQueueVideo(" + index + ") ; removeCustomQueuePopup();";
	removeButton.className = "defaultButton";
	removeButton.style.margin = "10px";
	buttonDiv.appendChild(removeButton);
	
	var cancelButton = document.createElement("a");
	cancelButton.innerHTML = "Cancel";
	cancelButton.href = "javascript:removeCustomQueuePopup();";
	cancelButton.className = "defaultButton";
	cancelButton.style.margin = "10px";
	buttonDiv.appendChild(cancelButton);
	
	confirmDiv.appendChild(buttonDiv);

	//if (!mobile) --deprecated
	if (true)
	{
		confirmDiv.id = "confirmDiv";
		confirmDiv.style.position = "fixed";
		confirmDiv.style.width = "74%";
		confirmDiv.style.background = "rgba(79, 79, 79, 0.8)";
		confirmDiv.style.border = "2px solid white";
		confirmDiv.style.textAlign = "center";
		confirmDiv.style.marginTop = margTop;
		confirmDiv.style.marginLeft = margLeft;
		confirmDiv.style.marginRight = margRight;
		confirmDiv.style.padding = "20px";
		confirmDiv.style.borderRadius = "10px";
		confirmDiv.style.color = "white";
		confirmDiv.style.top = styleTop;
	}
	else
	{
		confirmDiv.id = "confirmDiv";
		confirmDiv.style.position = "fixed";
		confirmDiv.style.width = "74%";
		confirmDiv.style.background = "rgba(79, 79, 79, 0.8)";
		confirmDiv.style.textAlign = "center";
		confirmDiv.style.marginTop = margTop;
		confirmDiv.style.marginLeft = margLeft;
		confirmDiv.style.marginRight = margRight;
		confirmDiv.style.padding = "20px";
		confirmDiv.style.borderRadius = "10px";
		confirmDiv.style.border = "2px solid white";
		confirmDiv.style.fontSize = "3em";
		confirmDiv.style.color = "white";
		confirmDiv.style.top = "500";
	}
	
	document.querySelector(elementToAppendTo).appendChild(confirmDiv);
}

function removeCustomQueuePopup()
{
	if (document.getElementById("confirmDiv") != null)
		document.getElementById("confirmDiv").parentNode.removeChild(document.getElementById("confirmDiv"));
}
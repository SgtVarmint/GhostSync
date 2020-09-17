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
		toast("Queue updated..");
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
	
	var newText = document.createElement("span");
	newText.innerHTML = "Next Up..";
	document.getElementById("queue").appendChild(newText);
	
	document.getElementById("queue").appendChild(document.createElement("hr"));
	
	var clearButton = document.createElement("a");
	clearButton.innerHTML = "Clear Queue";
	clearButton.href = "javascript:clearButtonClicked();";
	document.getElementById("queue").appendChild(clearButton);
	
	document.getElementById("queue").appendChild(document.createElement("hr"));
	
	if (queue.length > 0)
	{
		for (var i = 0; i < queue.length; i++)
		{
			var video = document.createElement("a");
			if (!queue[i].includes("watch?v="))
			{
				video.innerHTML += queue[i] != "undefined" ? queue[i].split("/")[queue[i].split("/").length - 1] : "Queue is empty";
			}
			else
			{
				//Check lookup table to see if youtube video has already been matched
				var titleIndex = -1;
				for (var j = 0; j < youtubeLookupTable.length; j++)
				{
					if (youtubeLookupTable[j][0] == queue[i])
					{
						titleIndex = j;
						break;
					}
				}
				if (titleIndex == -1)
				{
					var fetchedTitle = getYoutubeVideoTitle(queue[i]);
					video.innerHTML = "(YT) " + fetchedTitle;
					var newArray = new Array();
					newArray.push(queue[i]);
					newArray.push(fetchedTitle);
					youtubeLookupTable.push(newArray);
				}
				else
				{
					video.innerHTML = "(YT) " + youtubeLookupTable[titleIndex][1];
				}
			}
			video.innerHTML = "- " + video.innerHTML;
			video.href = queue[i] != "undefined" ? 'javascript:queueVideoClicked("' + queue[i] + '", ' + i + ');' : "javascript:return null;";
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

function queueVideoClicked(video, index)
{	
	customQueuePopup(video, index);
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

function clearButtonClicked()
{
	ghostConfirm("This will COMPLETELY wipe the current queue.&nbsp;&nbsp;Are you sure you want to do this?", "clearQueue");
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
	document.getElementById("browser").style.display = "none";
	toast("Video added to queue");
}

function addYoutubeVideoToQueue()
{
	if (queue[0] == "undefined" || queue[0] == undefined)
		queue = new Array();
	pushQueue(document.getElementById("youtubeInput").value);
	document.getElementById("youtubeInput").value = "";
	document.getElementById("youtubeMenu").style.display = "none";
	toast("Video added to queue");
}

function customQueuePopup(message, index, elementToAppendTo = "body", margTop = "15%", margLeft = "13%", margRight = "13%", styleTop = "100")
{
	var confirmDiv = document.createElement("div");

	var messageDiv = document.createElement("div");
	messageDiv.innerHTML = message;
	confirmDiv.appendChild(messageDiv);
	
	var buttonDiv = document.createElement("div");
	
	var moveToFrontButton = document.createElement("a");
	moveToFrontButton.innerHTML = "Play Next";
	moveToFrontButton.href = "javascript:pushToFrontOfQueue(" + index + "); removeCustomQueuePopup();";
	moveToFrontButton.className = "defaultButton";
	moveToFrontButton.style.margin = "10px";
	buttonDiv.appendChild(moveToFrontButton);
	
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

	if (!mobile)
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
	document.getElementById("confirmDiv").parentNode.removeChild(document.getElementById("confirmDiv"));
}
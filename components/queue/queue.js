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

function pullQueueInfo(file)
{
	//Get queue and load it into memory
	var fileInfo = file.responseText.split("\n");
	if (fileInfo[0] != "" || fileInfo[0] == "undefined")
	{
		//Check if next video has changed from server
		if (fileInfo[0] != queue[0] || fileInfo.length != queue.length)
		{
			queue = new Array();
			for (var i = 0; i < fileInfo.length; i++)
			{
				queue.push(fileInfo[i]);
			}
		}
	}
	updateQueueDOM();
	
}

function updateQueueDOM()
{
	//Display the queue on page
	document.getElementById("queue").innerHTML = "";
	if (queue[0] != undefined)
	{
		document.getElementById("queueArea").style.visibility = "visible";
		document.getElementById("queue").style.display = "block";
		document.getElementById("queue").innerHTML = "<span>Next Up..</span><hr>";
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
					video.innerHTML = fetchedTitle
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
		updateQueue();
		var video = document.createElement("a");
		video.href = "javascript:return null;";
		document.getElementById("queueArea").style.visibility = "visible";
		document.getElementById("queue").style.display = "block";
		document.getElementById("queue").innerHTML = "<span>Next Up..</span><hr>";
		document.getElementById("queue").appendChild(video);
	}
}

var indexToRemove = 0;

function queueVideoClicked(video, index)
{
	indexToRemove = index;
	ghostConfirm("Remove " + video + " video from the queue?", "removeQueueVideo");
}

function removeQueueVideo(confirmed)
{
	if (confirmed)
	{
		queue.splice(indexToRemove, 1);
		updateQueue();
		
		toast("Video removed from queue");
		updateQueueDOM();
	}
	else
	{
		//Cancel was clicked
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

//Deprecated
function queueButtonClicked()
{
	if (document.getElementById("queue").style.display == "block")
	{
		document.getElementById("queue").style.display = "none";
	}
	else
	{
		document.getElementById("queue").style.display = "block";
		document.getElementById("browser").style.display = "none";
		document.getElementById("settings").style.display = "none";
		document.getElementById("youtubeMenu").style.display = "none";
		getDirectoryInfo();
	}
}

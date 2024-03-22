function videoBrowserButton()
{
	bindBackgroundFadeClick("videoBrowserButton()");
	removeToastMessage();
	updateTracking();
	if (document.getElementById("browser").style.display == "block")
	{
		disableBackgroundFade();
		setTimeout(function(){
			document.getElementById("browser").style.display = "none"; 
			enablePointerEventsInMenus();
			}, 200);
		document.getElementById("browser").className = "popupWindow_out";
		
		disablePointerEventsInMenus();
		resetNavButtons();
	}
	else
	{
		if (!document.getElementById("thumbnail"))
			serveMissingVideoInfo();
		enableBackgroundFade();
		setTimeout(function(){
			document.getElementById("settings").style.display = "none";
			document.getElementById("youtubeMenu").style.display = "none";
			enablePointerEventsInMenus();
		}, 200);
		document.getElementById("youtubeMenu").className = "popupWindow_out";
		document.getElementById("settings").className = "popupWindow_out";
		document.getElementById("browser").style.display = "block";
		document.getElementById("browser").className = "popupWindow_in";
		
		disablePointerEventsInMenus();
		resetNavButtons();
		document.getElementById("videoBrowserButton").innerHTML = "Close";
		document.getElementById("videoBrowserButton").style.color = "blue";
	}
	
	//Update tracking color info without needing to go up a directory and then back in
	
	var currentPath = document.getElementById("currentDirectory").value.split("/");
	var currentDirectory = currentPath[currentPath.length - 2];
	var uploadsFolder = false;
	if (currentDirectory == "Uploads")
		uploadsFolder = true;
	
	getDirectoryInfo(uploadsFolder);
}

function getDirectoryInfo(uploadsFolder = false)
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","getDirectoryInfo.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			updateVideoBrowser(this, uploadsFolder);
		}
	}

	let workingDir = rootDir() + document.getElementById("currentDirectory").value;
	xhttp.send("workingDirectory=" + workingDir);
}

function updateVideoBrowser(file, uploadsFolder = false)
{
	var contents = JSON.parse(file.responseText);
	var videoBrowser = document.getElementById("videoBrowser");
	videoBrowser.innerHTML = "";
	
	//If this folder is the uploads folder, add button to allow uploads
	if (uploadsFolder)
	{
		buildUploadButton();
	}
	
	//Check if this folder contains Season folders and sort them
	if (contents.length >= 10 && (contents[0].includes("Season ") || contents[1].includes("Season ")))
	{
		contents = sortSeasons(contents);
	}
	
	//Check if this folder contains dated gameplay files and sort them
	for (let i = 0; i < contents.length - 1; i++)
	{
		if (contents[i].search(/[0-9]\-[0-9]/) != -1)
		{
			contents = sortDatedGameplay(contents);
		}
	}
		
	for (var i = 0; i < contents.length - 1; i++)
	{
		let isAlreadyInQueue = videoInQueue();
		
		var newSection = document.createElement("div");
		if (contents[i].includes("."))
		{	
			if (contents[i].includes("_AuthTouch"))
			{
				return;
			}

			var newVideo = document.createElement("a");
			newVideo.innerHTML = contents[i].replace(/\.[^/.]+$/, "");
			newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '");';
			newVideo.ondblclick = function(){ playVideo(); };
			newVideo.className = "videoBrowserVideo";
			
			var addToQueue = document.createElement("a");
			addToQueue.innerHTML = "+";
			var tempFileLocation = rootDir() + document.getElementById("currentDirectory").value + contents[i];

			if (!isAlreadyInQueue)
			{
				addToQueue.onclick = function()
				{ 
					this.style.backgroundColor = "#1e3949"; 
					this.onclick = function(){ 
						toast("This video is already in the queue"); 
						return false; 
					}; 
				};
			}
			else
			{
				addToQueue.style.backgroundColor = "#1e3949";
				addToQueue.onclick = function()
				{ 
					toast("This video is already in the queue"); 
					return false; 
				};
			}

			addToQueue.className = "addToQueue";
			addToQueue.href = 'javascript:addToQueueClicked("' + tempFileLocation + '");';
			
			//This section handles updating the tracking info for each video
			var fullPath = rootDir() + document.getElementById("currentDirectory").value + contents[i];
			fullPath = fullPath.replace(/\ /g, "%20");

			handleProgressionInfo();
			
			newSection.appendChild(addToQueue);
			newSection.appendChild(newVideo);
		}
		else
		{
			if (contents[i].charAt(0) == '_')
				continue;
			var newDir = document.createElement("a");
			newDir.innerHTML = contents[i];
			newDir.href = 'javascript:videoBrowserDirClick("' + contents[i] + '");';
			newDir.className = "videoBrowserDir";
			newSection.appendChild(newDir);
		}
		videoBrowser.appendChild(newSection);
		videoBrowser.scrollIntoView();
		//videoBrowser.appendChild(document.createElement("br"));
	}
}

function buildUploadButton()
{
	let newSection = document.createElement("div");
	//This label will be tied to the file input element
	let uploadButton = document.createElement("button");
	//This input will be hidden
	let hiddenFileInput = document.createElement("input");
	
	uploadButton.onclick = function()
	{ 
		document.getElementById("fileInput").click() 
	};
	uploadButton.innerHTML = "Upload Video(s)";
	
	hiddenFileInput.id = "fileInput";
	hiddenFileInput.onchange = function(e)
	{
		e.preventDefault();
		document.getElementById("browser").style.display = "none";
		
		resetNavButtons();
		
		if (this.files.length > 0)
		{
			uploadFile();
		}
		else
		{
			toast("Upload cancelled");
		}
	}
	
	hiddenFileInput.type = "file";
	hiddenFileInput.name = "file";
	hiddenFileInput.multiple = true;
	hiddenFileInput.style.display = "none";
	
	newSection.className = "fileUploadSection";
	uploadButton.className = "defaultButton";
	hiddenFileInput.className = "fileUploadSection";
	
	newSection.appendChild(uploadButton);
	newSection.appendChild(hiddenFileInput);
	
	videoBrowser.appendChild(newSection);
}

function sortSeasons(folders, desc = false)
{
	let sortedFolders = new Array();
	//sortedFolders = folders;
	if (desc)
	{
		for (let i = folders.length - 1; i >= 0; i--)
		{
			for (let j = 0; j < folders.length - 1; j++)
			{
				if (folders[j] == "Season " + i)
				{
					sortedFolders.push(folders[j]);
					break;
				}
			}
		}
	}
	else
	{
		for (let i = 0; i < folders.length; i++)
		{
			for (let j = 0; j < folders.length - 1; j++)
			{
				if (folders[j] == "Season " + i)
				{
					sortedFolders.push(folders[j]);
					break;
				}
			}
		}
	}
	sortedFolders.push(""); //Push empty last index to match what server gets
	return sortedFolders;
}

function sortDatedGameplay(contents, asc = false)
{
	let sortedContents = new Array();
	
	let contentDates = new Array();
	
	for (let i = 0; i < contents.length - 1; i++)
	{
		let dateString = contents[i].split(" ")[0];
		contentDates.push({date: getDateFromGameplayString(dateString), index: i});
	}
	
	contentDates.sort((a, b) => b.date - a.date)
	
	if (asc)
	{
		for (let i = contents.length - 1; i >= 0; i--)
		{
			let newIndex = contentDates[i].index;
			sortedContents.push(contents[newIndex]);
		}
	}
	else
	{
		for (let i = 0; i < contents.length - 1; i++)
		{
			let newIndex = contentDates[i].index;
			sortedContents.push(contents[newIndex]);
		}
	}
	
	sortedContents.push("");
	return sortedContents;
}

function getDateFromGameplayString(dateString)
{
	//dateInfo[0] = month
	//dateInfo[1] = day
	//dateInfo[2] = year (last two digits)	
	let dateInfo = dateString.split("-");
	
	let year = parseInt("20" + dateInfo[2]);
	let month = parseInt(dateInfo[0]);
	let day = parseInt(dateInfo[1]);
	
	return new Date(year, month, day);
}

function videoInQueue(video)
{
	for (var j = 0; j < queue.length; j++)
	{
		if (queue[j].split("/")[queue[j].split("/").length - 1].includes(video))
		{
			return true;
		}
	}

	return false;
}

function handleProgressionInfo()
{
	var progressColor0 = "white";
	var progressColor1 = "#7dafff";
	var progressColor2 = "#7dafff";
	var progressColor3 = "#7dafff";
	var progressColor4 = "#b8b8b8";
	
	for (var j = 0; j < trackingInfo.length; j++)
	{
		var temp = trackingInfo[j][0].replace(/\ /g, "%20");
		if (fullPath.trim() == temp)
		{
			if (trackingInfo[j][2] == "0")
			{
				newVideo.style.color = progressColor0;
			}
			else if (trackingInfo[j][2] == "1")
			{
				newVideo.style.color = progressColor1;
			}
			else if (trackingInfo[j][2] == "2")
			{
				newVideo.style.color = progressColor2;
			}
			else if (trackingInfo[j][2] == "3")
			{
				newVideo.style.color = progressColor3;
			}
			else if (trackingInfo[j][2] == "4")
			{
				newVideo.style.color = progressColor4;
			}
			
			newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '", ' + trackingInfo[j][1] + ');';
			addToQueue.href = 'javascript:addToQueueClicked("' + tempFileLocation + '^' + trackingInfo[j][1] + '");';
			
			newVideo.ondblclick = function(){ playVideo(); };
		}
	}
}

function videoBrowserDirClick(inputDir)
{
	document.getElementById("currentDirectory").value += inputDir + "/";
	
	var uploadsFolder = false;
	if (inputDir == "Uploads")
		uploadsFolder = true;
	
	getDirectoryInfo(uploadsFolder);
}

function videoBrowserVideoClick(inputVideo, timestamp = 0, overrideFileLocationLogic = false, overridePlaystateToPlay = false)
{
	var fileLocation = "";
	if (!overrideFileLocationLogic)
		fileLocation = rootDir() + document.getElementById("currentDirectory").value + inputVideo;
	else
		fileLocation = inputVideo;
	
	document.getElementById("selectedVideoTimestamp").value = timestamp;
	
	document.getElementById("selectedVideoTitle").value = inputVideo;
			
	serveVideoInfo(fileLocation, timestamp = timestamp, overridePlaystateToPlay = overridePlaystateToPlay);
}

function playVideo(video = "pullFromDOM", timestamp = 0, overridePlaystateToPlay = "paused")
{
	jimmyNet = false;
	
	var fileLocation = "";
	
	if (video == "pullFromDOM")
	{
		video = document.getElementById("selectedVideoTitle").value;
		timestamp = parseInt(document.getElementById("selectedVideoTimestamp").value);
	}
	
	//Format video file path if input was only title
	if (!video.includes("/"))
		fileLocation = rootDir() + document.getElementById("currentDirectory").value + video;
	else
		fileLocation = video;
		
	document.getElementById("filePath").value = serveVideoPath(fileLocation);
		
	document.getElementById("videoSource").src = serveVideoPath(fileLocation);
	///////////////
	//This gets the file extension and sets the video source type
	//For mov and mkv files, the type seems to have to be set to video/mp4 regardless
	//DESPITE THIS, this can just be left blank and HTML knows how to handle the extension
	///////////////
	//var temp = inputVideo.split(".");
	//document.getElementById("videoSource").type = "video/" + temp[temp.length - 1] == "mkv" || temp[temp.length - 1] == "mov" ? "mp4" : temp[temp.length - 1];
	document.getElementById("video").load();
	/*if (checkPreload())
		preloadVideo(document.getElementById("filePath").value);*/
	document.getElementById("browser").style.display = "none";
	document.getElementById("video").style.display = "block";
	document.getElementById("youtubePlayer").style.display = "none";
	
	resetNavButtons();
	disableBackgroundFade();
	
	if (timestamp != 0)
	{
		var videoDuration = document.getElementById("video").duration;
		if (timestamp >= videoDuration - 4) //-4 was added for a few second buffer room at end of video for this to trigger
		{
			var newTimeStamp = 0;
			document.getElementById("video").currentTime = newTimeStamp;
			updateServerTimeStamp(newTimeStamp);
		}
		else
			document.getElementById("video").currentTime = timestamp;
	}
	
	document.getElementById("playButton").innerHTML = "&#x25b6;";
	videoEnded = true;
	updateServerTimeStamp();
	
}

function goBack()
{
	var currDir = document.getElementById("currentDirectory").value;
	if (currDir == "/")
		videoBrowserButton();
	var newDir = "/";
	var temp = currDir.split("/");
	for (var i = 1; i < temp.length-2; i++)
	{
		newDir += temp[i];
		newDir += "/";
	}
	document.getElementById("currentDirectory").value = newDir;
	getDirectoryInfo();
	serveMissingVideoInfo();
}
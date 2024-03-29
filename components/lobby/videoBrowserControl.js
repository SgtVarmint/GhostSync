function fetchMetadata()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","fetchMetadata.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			parseMetadata(this);
		}
	}
	xhttp.send("rootDir=" + rootDir());
}

function parseMetadata(file)
{
	var output = "";
	var dirInfo = file.responseText.split(":");
	for (var i = 0; i < dirInfo.length; i++)
	{
		var item = document.createElement("a");
		item.innerHTML = dirInfo[i];
		item.style.display = "block";
		document.getElementById("videoBrowser").appendChild(item);
	}
}

function videoBrowserButton()
{
	updateTracking();
	if (document.getElementById("browser").style.display == "block")
	{
		setTimeout(function(){ document.getElementById("browser").style.display = "none"; }, 200);
		document.getElementById("browser").className = "popupWindow_out";
	}
	else
	{
		setTimeout(function(){
			document.getElementById("settings").style.display = "none";
			document.getElementById("youtubeMenu").style.display = "none";
		}, 200);
		document.getElementById("youtubeMenu").className = "popupWindow_out";
		document.getElementById("settings").className = "popupWindow_out";
		document.getElementById("browser").style.display = "block";
		document.getElementById("browser").className = "popupWindow_in";
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
	xhttp.send("rootDir=" + rootDir() + "&subDir=" + document.getElementById("currentDirectory").value);
}

function updateVideoBrowser(file, uploadsFolder = false)
{
	var contents = file.responseText.split("|");
	var videoBrowser = document.getElementById("videoBrowser");
	videoBrowser.innerHTML = "";
	
	var progressColor0 = "white";
	var progressColor1 = "#7dafff";
	var progressColor2 = "#7dafff";
	var progressColor3 = "#7dafff";
	var progressColor4 = "#b8b8b8";
	
	//If this folder is the uploads folder, add button to allow uploads
	if (uploadsFolder)
	{
		var newSection = document.createElement("div");
		//This label will be tied to the file input element
		var newButton = document.createElement("button");
		//This input will be hidden
		var newInput = document.createElement("input");
		
		newButton.onclick = function(){ document.getElementById("fileInput").click() };
		newButton.innerHTML = "Upload Video(s)";
		
		newInput.id = "fileInput";
		newInput.onchange = function(e){
		e.preventDefault();
		document.getElementById("browser").style.display = "none";
		if (this.files.length > 0)
			uploadFile();
		else
			toast("Upload cancelled");
		}
		
		newInput.type = "file";
		newInput.name = "file";
		newInput.multiple = true;
		newInput.style.display = "none";
		
		newSection.className = "fileUploadSection";
		newButton.className = "defaultButton";
		newInput.className = "fileUploadSection";
		
		newSection.appendChild(newButton);
		newSection.appendChild(newInput);
		
		videoBrowser.appendChild(newSection);
	}

	for (var i = 0; i < contents.length - 1; i++)
	{
		var isAlreadyInQueue = false;
		for (var j = 0; j < queue.length; j++)
		{
			if (queue[j].split("/")[queue[j].split("/").length - 1] == contents[i])
			{
				isAlreadyInQueue = true;
				break;
			}
		}
		var newSection = document.createElement("div");
		if (contents[i].includes("."))
		{	
			var newVideo = document.createElement("a");
			newVideo.innerHTML = contents[i].replace(/\.[^/.]+$/, "");
			newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '");';
			newVideo.className = "videoBrowserVideo";
			
			var addToQueue = document.createElement("a");
			addToQueue.innerHTML = "+";
			var tempFileLocation = rootDir() + document.getElementById("currentDirectory").value + contents[i];
			if (!isAlreadyInQueue)
			{
				addToQueue.href = 'javascript:addToQueueClicked("' + tempFileLocation + '");';
				addToQueue.onclick = function(){ this.style.backgroundColor = "#1e3949"};
			}
			else
			{
				addToQueue.style.backgroundColor = "#1e3949";
				addToQueue.href = 'javascript:return null;';
				addToQueue.onclick = function(){ toast("This video is already in the queue"); };
			}
			addToQueue.className = "addToQueue";
			
			//This section handles updating the tracking info for each video
			var fullPath = rootDir() + document.getElementById("currentDirectory").value + contents[i];
			fullPath = fullPath.replace(/\ /g, "%20");
			for (var j = 0; j < trackingInfo.length; j++)
			{
				var temp = trackingInfo[j][0].replace(/\ /g, "%20");
				if (fullPath.trim() == temp)
				{
					if (trackingInfo[j][2] == "0")
					{
						newVideo.style.color = progressColor0;
						newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '", ' + trackingInfo[j][1] + ');';
					}
					else if (trackingInfo[j][2] == "1")
					{
						newVideo.style.color = progressColor1;
						newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '", ' + trackingInfo[j][1] + ');';
					}
					else if (trackingInfo[j][2] == "2")
					{
						newVideo.style.color = progressColor2;
						newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '", ' + trackingInfo[j][1] + ');';
					}
					else if (trackingInfo[j][2] == "3")
					{
						newVideo.style.color = progressColor3;
						newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '", ' + trackingInfo[j][1] + ');';
					}
					else if (trackingInfo[j][2] == "4")
					{
						newVideo.style.color = progressColor4;
					}
					
					newVideo.href = 'javascript:videoBrowserVideoClick("' + contents[i] + '", ' + trackingInfo[j][1] + ');';
				}
			}
			
			newSection.appendChild(addToQueue);
			newSection.appendChild(newVideo);
		}
		else
		{
			var newDir = document.createElement("a");
			newDir.innerHTML = contents[i];
			newDir.href = 'javascript:videoBrowserDirClick("' + contents[i] + '");';
			newDir.className = "videoBrowserDir";
			newSection.appendChild(newDir);
		}
		videoBrowser.appendChild(newSection);
		//videoBrowser.appendChild(document.createElement("br"));
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
	document.getElementById("filePath").value = fileLocation;
	document.getElementById("playState").value = !overridePlaystateToPlay ? "paused" : "playing";
		
	document.getElementById("videoSource").src = fileLocation;
	///////////////
	//This gets the file extension and sets the video source type
	//For mov and mkv files, the type seems to have to be set to video/mp4 regardless
	//DESPITE THIS, this can just be left blank and HTML knows how to handle the extension
	///////////////
	//var temp = inputVideo.split(".");
	//document.getElementById("videoSource").type = "video/" + temp[temp.length - 1] == "mkv" || temp[temp.length - 1] == "mov" ? "mp4" : temp[temp.length - 1];
	document.getElementById("video").load();
	document.getElementById("browser").style.display = "none";
	document.getElementById("video").style.display = "block";
	document.getElementById("youtubePlayer").style.display = "none";
	
	
	
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
	
	//Detect if video is widescreen
	var videoPlayer = document.getElementById("video");
	var aspectRatio = parseFloat(videoPlayer.videoWidth) / parseFloat(videoPlayer.videoHeight);
	if (aspectRatio > 2.0)
	{
		document.getElementById("video").className = fullscreenEnabled ? "widescreenVideo" : "widescreenVideo_fullscreen";
	}
	else if (aspectRatio > 1.5)
	{
		document.getElementById("video").className = fullscreenEnabled ? "fullVideo_fullscreen" : "fullVideo";
	}
	else
	{
		document.getElementById("video").className = fullscreenEnabled ? "standardVideo_fullscreen" : "standardVideo";
	}
}

function goBack()
{
	var currDir = document.getElementById("currentDirectory").value;
	var newDir = "/";
	var temp = currDir.split("/");
	for (var i = 1; i < temp.length-2; i++)
	{
		newDir += temp[i];
		newDir += "/";
	}
	document.getElementById("currentDirectory").value = newDir;
	getDirectoryInfo();
}

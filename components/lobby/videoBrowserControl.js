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

function getDirectoryInfo()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","getDirectoryInfo.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			updateVideoBrowser(this);
		}
	}
	xhttp.send("rootDir=" + rootDir() + "&subDir=" + document.getElementById("currentDirectory").value);
}

function updateVideoBrowser(file)
{
	var contents = file.responseText.split("|");
	var videoBrowser = document.getElementById("videoBrowser");
	videoBrowser.innerHTML = "";
	for (var i = 0; i < contents.length; i++)
	{
		if (contents[i].includes("."))
		{
			var newVideo = document.createElement("a");
			newVideo.innerHTML = contents[i];
			newVideo.href = "javascript:videoBrowserVideoClick('" + contents[i] + "');";
			videoBrowser.appendChild(newVideo);
		}
		else
		{
			var newDir = document.createElement("a");
			newDir.innerHTML = contents[i];
			newDir.href = "javascript:videoBrowserDirClick('" + contents[i] + "');";
			videoBrowser.appendChild(newDir);
		}
		videoBrowser.appendChild(document.createElement("br"));
	}
}

function videoBrowserDirClick(inputDir)
{
	document.getElementById("currentDirectory").value += inputDir + "/";
	getDirectoryInfo();
}

function videoBrowserVideoClick(inputVideo)
{
	///////////////////////////////////////////
	//This URL needs changed to the host's IP//
	///////////////////////////////////////////
	var fileLocation = "http://24.3.91.68" + rootDir() + document.getElementById("currentDirectory").value + inputVideo;
	fileLocation = fileLocation.replace(/\ /g, "%20");
	
	document.getElementById("filePath").value = fileLocation;
	document.getElementById("playState").value = "paused";
	
	updateServerTimeStamp();
	
	document.getElementById("videoSource").src = fileLocation;
	var temp = inputVideo.split(".");
	document.getElementById("videoSource").type = "video/" + temp[1];
	document.getElementById("video").load();
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
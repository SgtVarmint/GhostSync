function serveVideoInfo(videoPath, timestamp, overridePlaystateToPlay)
{
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	sidePanelDiv.innerHTML = "";
	startSidePanelLoader();

	var videoInfo = getVideoInfo(videoPath);
	
	var thumbnailElement = document.createElement("img");
	thumbnailElement.style.width = "100%";
	thumbnailElement.src = videoInfo.thumbnailUrl;
	thumbnailElement.id = "thumbnail";
	thumbnailElement.onerror = function(){ thumbnailElement.src = DEFAULT_THUMBNAIL; };
	thumbnailElement.onload = function(){ stopSidePanelLoader(); };
	var videoNameElement = document.createElement("span");
	videoNameElement.style.width = "100%";
	videoNameElement.innerHTML = getVideoNameFromPath(videoPath);
	
	var buttonDiv = document.createElement("div");
	buttonDiv.className = "infoDiv";
	var playButton = document.createElement("button");
	playButton.innerHTML = "Play Now";
	playButton.className = "videoInfoButton";
	playButton.style.width = "50%";
	playButton.onclick = function(){ playVideo(videoPath, timestamp = timestamp, overridePlaystateToPlay = overridePlaystateToPlay); };
	buttonDiv.appendChild(playButton);
	
	var hrElement = document.createElement("hr");
	
	var descriptionElement = document.createElement("p");
	descriptionElement.innerHTML = videoInfo.details;
	
	var videoInfoSpan = document.createElement("span");
	videoInfoSpan.id = "videoInfoSpan";
	videoInfoSpan.style.display = "none";
	
	videoInfoSpan.appendChild(thumbnailElement);
	videoInfoSpan.appendChild(videoNameElement);
	videoInfoSpan.appendChild(buttonDiv);
	videoInfoSpan.appendChild(hrElement);
	videoInfoSpan.appendChild(descriptionElement);
	
	sidePanelDiv.appendChild(videoInfoSpan);
}

function serveMissingVideoInfo()
{	
	if (document.getElementById("thumbnail") != undefined && document.getElementById("thumbnail").src.includes(DEFAULT_THUMBNAIL))
		return;
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	sidePanelDiv.innerHTML = "";
	startSidePanelLoader();
	var thumbnailDiv = document.createElement("div");
	var videoInfoDiv = document.createElement("div");
		
	var thumbnailElement = document.createElement("img");
	thumbnailElement.style.width = "100%";
	thumbnailElement.src = DEFAULT_THUMBNAIL;
	thumbnailElement.id = "thumbnail";
	thumbnailElement.onload = function(){ stopSidePanelLoader(); };
	
	var descriptionElement = document.createElement("p");
	descriptionElement.innerHTML = DEFAULT_BROWSER_MESSAGE;
	
	var videoInfoSpan = document.createElement("span");
	videoInfoSpan.id = "videoInfoSpan";
	videoInfoSpan.style.display = "none";
	
	videoInfoSpan.appendChild(thumbnailElement);
	videoInfoSpan.appendChild(descriptionElement);
	
	sidePanelDiv.appendChild(videoInfoSpan);
}

function startSidePanelLoader()
{
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	
	var loaderDiv = document.createElement("div");
	loaderDiv.style.width = "100%";
	loaderDiv.style.height = "100%";
	loaderDiv.style.padding = "0";
	loaderDiv.style.position = "relative";
	loaderDiv.style.backgroundColor = "rgba(79, 79, 79)";
	loaderDiv.style.color = "white";
	loaderDiv.innerHTML = "<div id=\"loaderSidePanel\"><div id='spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>";
	loaderDiv.id = "sidePanelLoader";
	
	sidePanelDiv.appendChild(loaderDiv);
}

function stopSidePanelLoader()
{
	var sidePanelLoader = document.getElementById("sidePanelLoader");

	sidePanelLoader.parentNode.removeChild(sidePanelLoader);
	
	document.getElementById("videoInfoSpan").style.display = "block";
}
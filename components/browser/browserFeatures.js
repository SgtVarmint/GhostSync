/*
	what does this file do? please comment your code
*/

function serveVideoInfo(videoPath, timestamp, overridePlaystateToPlay) {
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	sidePanelDiv.innerHTML = "";
	startSidePanelLoader();

	var videoInfo = getVideoInfo(videoPath);

	var thumbnailElement = document.createElement("img");
	thumbnailElement.id = "thumbnail";
	thumbnailElement.src = videoInfo.thumbnailUrl;
	thumbnailElement.onerror = function () {
		thumbnailElement.src = DEFAULT_THUMBNAIL;
	};
	thumbnailElement.onload = function () {
		stopSidePanelLoader();
	};

	var videoNameElement = document.createElement("span");
	videoNameElement.classList.add("wide")
	videoNameElement.innerHTML = getVideoNameFromPath(videoPath);

	var videoDateElement = document.createElement("span");
	videoDateElement.id = "videoDate"
	videoDateElement.innerHTML = "Released in " + videoInfo.releaseDate;

	var buttonDiv = document.createElement("div");
	buttonDiv.className = "infoDiv";
	
	var playButton = document.createElement("button");
	playButton.innerHTML = "Play Now";
	playButton.className = "videoInfoButton";
	playButton.onclick = function () {
		playVideo(videoPath, timestamp = timestamp, overridePlaystateToPlay = overridePlaystateToPlay);
	};
	buttonDiv.appendChild(playButton);

	var hrElement = document.createElement("hr");

	var descriptionElement = document.createElement("p");
	descriptionElement.innerHTML = videoInfo.details;

	var videoInfoSpan = document.createElement("span");
	videoInfoSpan.id = "videoInfoSpan";
	videoInfoSpan.classList.add("hidden")

	videoInfoSpan.appendChild(thumbnailElement);
	videoInfoSpan.appendChild(videoNameElement);
	if (videoInfo.releaseDate != "") {
		videoInfoSpan.appendChild(document.createElement("br"));
		videoInfoSpan.appendChild(videoDateElement);
	}
	videoInfoSpan.appendChild(buttonDiv);
	videoInfoSpan.appendChild(hrElement);
	videoInfoSpan.appendChild(descriptionElement);

	sidePanelDiv.appendChild(videoInfoSpan);
}

function serveMissingVideoInfo() {
	if (document.getElementById("thumbnail") != undefined && document.getElementById("thumbnail").src.includes(DEFAULT_THUMBNAIL))
		return;
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	sidePanelDiv.innerHTML = "";
	startSidePanelLoader();
	var thumbnailDiv = document.createElement("div");
	var videoInfoDiv = document.createElement("div");

	var thumbnailElement = document.createElement("img");
	thumbnailElement.id = "thumbnail";
	thumbnailElement.src = DEFAULT_THUMBNAIL;
	thumbnailElement.onload = function () {
		stopSidePanelLoader();
	};

	var descriptionElement = document.createElement("p");
	descriptionElement.innerHTML = DEFAULT_BROWSER_MESSAGE;

	var videoInfoSpan = document.createElement("span");
	videoInfoSpan.id = "videoInfoSpan";
	videoInfoSpan.classList.add("hidden")
	videoInfoSpan.appendChild(thumbnailElement);
	videoInfoSpan.appendChild(descriptionElement);

	sidePanelDiv.appendChild(videoInfoSpan);
}
//this is the circle side loader
function startSidePanelLoader() {
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	// i hate you jon why on earth do you make an id as the last thing you do,
	var loaderDiv = document.createElement("div");
	loaderDiv.id = "sidePanelLoader";
	loaderDiv.innerHTML = "<div id=\"loaderSidePanel\"><div id='spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>";
	sidePanelDiv.appendChild(loaderDiv);
}

function stopSidePanelLoader() {
	var sidePanelLoader = document.getElementById("sidePanelLoader");

	sidePanelLoader.parentNode.removeChild(sidePanelLoader);

	document.getElementById("videoInfoSpan").classList.remove("hidden");
}
//tHiS mEtHoD cReAtEs AnD aPpEnDs ThE vIdEo MeTaDaTa DeTaIlS tO tHe SiDe PaNeL wItHiN vIdEo BrOwSeR
function serveVideoInfo(videoPath, timestamp, overridePlaystateToPlay) {
	var sidePanelDiv = document.getElementById("videoBrowserSidePanel");
	sidePanelDiv.innerHTML = "";
	startSidePanelLoader();

	var videoInfo = getVideoInfo(videoPath);

	let thumbnailUrl = "";
	if (videoInfo.thumbnailUrl != DEFAULT_THUMBNAIL)
	{
		thumbnailUrl = videoInfo.thumbnailUrl;
	}
	else
	{
		thumbnailUrl = DEFAULT_THUMBNAIL_GRAYED;
		generateDefaultThumbnailFromVideo(videoPath);
	}

	var thumbnailElement = document.createElement("img");
	thumbnailElement.id = "thumbnail";
	thumbnailElement.src = thumbnailUrl;
	thumbnailElement.onload = function () {
		stopSidePanelLoader();
	};

	var subtitlesAvailableElement = document.createElement("div");
	if (videoInfo.subtitleData.length > 0)
		subtitlesAvailableElement.innerHTML = "&#x1f4ac;<br>";

	var videoNameElement = document.createElement("div");
	videoNameElement.classList.add("wide")
	videoNameElement.innerHTML = getVideoNameFromPath(videoPath);

	var videoDateElement = document.createElement("div");
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

	var videoInfoSpan = document.createElement("div");
	videoInfoSpan.id = "videoInfoSpan";
	videoInfoSpan.classList.add("hidden")

	videoInfoSpan.appendChild(thumbnailElement);
	videoInfoSpan.appendChild(subtitlesAvailableElement);
	videoInfoSpan.appendChild(videoNameElement);
	if (videoInfo.releaseDate != "") {
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

async function generateDefaultThumbnailFromVideo(videoPath)
{
	//This method currently uses timeouts to allow the client time to load
	//the video and then seek to a timestamp before trying to grab the thumbnail image
	//This means there is always a 1 second delay for the thumbail to generate
	//If video fails to load and throws error, it will default to default thumbnail
	//In the future, it would be nice to not rely on delay/sleep and instead wait for
	//the video to be loaded, and then wait for it to finish seeking

	let thumbnailVideo = document.getElementById("videoDefaultThumbnailSource");
	let videoElement = document.getElementById("videoDefaultThumbnailVideo");
    let canvasElement = document.getElementById("videoDefaultThumbnailCanvas");
	let canvasContext = canvasElement.getContext("2d");

	try //Try generating thumbnail from video
	{
		thumbnailVideo.src = videoPath;
		videoElement.load();

		await new Promise(r => setTimeout(r, 500));

		let halfTime = videoElement.duration / 3;
		videoElement.currentTime = halfTime;

		await new Promise(r => setTimeout(r, 500));

		canvasElement.width = videoElement.videoWidth;
		canvasElement.height = videoElement.videoHeight;

		canvasContext.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);
		defaultThumbnailFromVideo = canvasElement.toDataURL();

		document.getElementById("thumbnail").src = defaultThumbnailFromVideo;
	}
	catch(exception) //Took too long - just return the default thumbnail
	{
		document.getElementById("thumbnail").src = DEFAULT_THUMBNAIL;
	}
}
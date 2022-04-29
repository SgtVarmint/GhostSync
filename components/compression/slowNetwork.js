function serveVideoPath(videoPath)
{
	if (videoPath.includes("Videos/Gameplay/"))
		return videoPath;
	if (jimmyNet || JIMMYNET_SETTING_TOGGLED)
		videoPath = videoPath.replace("Videos/", "Videos/_LowRes/");
	
	return videoPath;
}

function formatVideoPathForServer(videoPath)
{
	videoPath = videoPath.replace("Videos/_LowRes/", "Videos/");
	return videoPath;
}
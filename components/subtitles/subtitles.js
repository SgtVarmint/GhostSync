function checkForAndDisplaySubtitles()
{
	if (SUBTITLES_ENABLED && !isYoutubeVideo())
	{
        if (videoFileData == null || videoFileData.subtitleData == null)
            return;

        let subtitleFound = false;
		let currentTime = document.getElementById("video").currentTime;
		let timingOffset = 0.5;
		for (let i = 0; i < videoFileData.subtitleData.length; i++)
		{
			if (currentTime + timingOffset > videoFileData.subtitleData[i][0] &&
				currentTime + timingOffset < videoFileData.subtitleData[i][1])
				{
                    subtitleFound = true;
					document.getElementById("subtitleText").innerHTML = videoFileData.subtitleData[i][2];
					break;
				}
		}

        if (!subtitleFound)
        {
            document.getElementById("subtitleText").innerHTML = "";
        }
	}
}
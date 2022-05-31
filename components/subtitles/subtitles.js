var SUBTITLES_ENABLED = true;
function checkForAndDisplaySubtitles()
{
	if (SUBTITLES_ENABLED && !isYoutubeVideo())
	{
        let subtitleFound = false;
		let currentTime = document.getElementById("video").currentTime;
		for (let i = 0; i < videoFileData.subtitleData.length; i++)
		{
			if (currentTime > videoFileData.subtitleData[i][0] &&
				currentTime < videoFileData.subtitleData[i][1])
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
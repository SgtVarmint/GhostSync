function checkForAndSkipAd()
{
	if (ADSKIP_ENABLED)
	{
		let currentTime = document.getElementById("video").currentTime;
		for (let i = 0; i < videoFileData.adBlocks.length; i++)
		{
			if (currentTime > videoFileData.adBlocks[i][0] &&
				currentTime < videoFileData.adBlocks[i][1])
				{
					document.getElementById("video").currentTime = videoFileData.adBlocks[i][1];
					updateServerTimeStamp(videoFileData.adBlocks[i][1]);
					toast("Ad Skipped");
					updateTracking();
					break;
				}
		}
	}
}
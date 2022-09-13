function documentKeyPress(event)
{
    let skipLength = 10.0;

    if (event.keyCode == 37)//Left Arrow
    {
        if (!isYoutubeVideo())
        {
            let currentTime = document.getElementById("video").currentTime;
            let newTimeStamp = currentTime - skipLength;
            document.getElementById("video").currentTime = newTimeStamp;
            updateServerTimeStamp(newTimeStamp);
        }
        else
        {
            let currentTime = youtubePlayer.getCurrentTime();
            let newTimeStamp = currentTime - skipLength;
            youtubePlayer.seekTo(newTimeStamp, true);
            updateServerTimeStamp(newTimeStamp);
        }
    }
    else if (event.keyCode == 39)//Right Arrow
    {
        if (!isYoutubeVideo())
        {
            let currentTime = document.getElementById("video").currentTime;
            let newTimeStamp = currentTime + skipLength;
            document.getElementById("video").currentTime = newTimeStamp;
            updateServerTimeStamp(newTimeStamp);
        }
        else
        {
            let currentTime = youtubePlayer.getCurrentTime();
            let newTimeStamp = currentTime + skipLength;
            youtubePlayer.seekTo(newTimeStamp, true);
            updateServerTimeStamp(newTimeStamp);
        }
    }
    else if (event.keyCode == 40)//Down Arrow
    {
        playButtonClicked();
    }
    else if (event.keyCode == 38)//Up Arrow
    {
        skipButtonClicked();
    }
}
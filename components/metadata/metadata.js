function getVideoInfo(videoPath)
{
	var metadata = getMetadata(videoPath);
	
	if (metadata == null)
		return {
			details: "",
			thumbnailUrl: "",
			releaseDate: "",
			adBlocks: new Array(),
			subtitleData: new Array()
		};
	
	var detailsArray = metadata.split("\n");
	var thumbnailMetadata = getMetadataValue(detailsArray, "Thumbnailurl").replace(/\\/g, "");
    var videoInfo = {
		details:  getMetadataValue(detailsArray, "comment"),
		thumbnailUrl: thumbnailMetadata == "" ? DEFAULT_THUMBNAIL : thumbnailMetadata,
		releaseDate: getMetadataValue(detailsArray, "Date").split("-")[0],
		adBlocks: getAdBlockData(detailsArray),
		subtitleData: getSubtitleData(detailsArray)
		};
		
	return videoInfo;
}

function getAdBlockData(array)
{
	var returnArray = new Array();
	for (var i = 0; i < array.length; i++)
	{
		if (array[i].includes("title=Advertisement"))
		{
			returnArray.push([parseFloat(array[i-2].split("=")[1]) / 1000, parseFloat(array[i-1].split("=")[1]) / 1000]); 
		}
	}
	
	return returnArray;
}

function getSubtitleData(array)
{
	//index[x][0] is start time of subtitle
	//index[x][1] is end time of subtitle
	//index[x][2] is the subtitle text
	var returnArray = new Array();
	processAsVTT = false;

	for (var i = 0; i < array.length; i++)
	{
		if (array[i].includes("WEBVTT"))
		{
			processAsVTT = true;
			break;
		}
	}

	if (processAsVTT) //Standard WebVTT file format
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i].includes("-->"))
			{
				let subtitleArray = new Array();

				let timestampArray = array[i].split(" ");
				//timestampArray[0] is start time string
				//timestampArray[2] is end time string

				subtitleArray.push(parseTimestampToMs(timestampArray[0]));
				subtitleArray.push(parseTimestampToMs(timestampArray[2]));

				let subtitleText = "";

				let counter = i;
				while (array[counter+1] != undefined && !array[++counter].includes("-->"))
				{
					//Strip the metadata line of all \r

					let lineText = array[counter].replace("\r", "");
					lineText = lineText.replace("\n", "");
					lineText = lineText.replace("\\", "");
					if (lineText != "")
					{
						let newLine = true;
						if (subtitleText == "")
							newLine = false;

						if (newLine)
							subtitleText += "\n";
						subtitleText += lineText;
					}
					if (counter >= array.length - 1)
						endSearch = true;
				}
				subtitleArray.push(subtitleText);
				
				returnArray.push(subtitleArray);
			}
		}
	}
	else //Non-standard (recorded from PlayOn)
	{
		let englishFound = false;

		for (var i = 0; i < array.length; i++)
		{
			if (array[i].includes("comment="))
			{
				break;
			}

			if (array[i].includes("Language: eng"))
			{
				englishFound = true;
			}

			if (array[i].includes("-->") && englishFound)
			{
				let subtitleArray = new Array();

				let timestampArray = array[i].split(" ");
				//timestampArray[0] is start time string
				//timestampArray[2] is end time string

				subtitleArray.push(parseTimestampToMs(timestampArray[0]));
				subtitleArray.push(parseTimestampToMs(timestampArray[2]));

				let subtitleText = "";

				let counter = i;
				while (!array[++counter].includes("-->") && !array[counter + 1].includes("SubsTrack") && !array[counter + 1].includes("Thumbnailurl="))
				{
					//Strip the metadata line of all \r

					let lineText = array[counter].replace("\r", "");
					lineText = lineText.replace("\n", "");
					lineText = lineText.replace("\\", "");
					if (lineText != "")
					{
						let newLine = true;
						if (subtitleText == "")
							newLine = false;

						if (newLine)
							subtitleText += "\n";
						subtitleText += lineText;
					}
					if (counter >= array.length - 1)
						endSearch = true;
				}
				subtitleArray.push(subtitleText);
				
				returnArray.push(subtitleArray);
			}
		}
	}

	return returnArray;
}

function getMetadataValue(array, key)
{
	for (var i = 0; i < array.length; i++)
	{
		if (array[i].includes(key + "="))
		{
			return array[i].split(key + "=")[1];
		}
	}
	return "";
}

function getMetadata(videoPath)
{
	if (videoPath.includes("/Uploads/") ||
		videoPath.includes("/Gameplay/") ||
		videoPath.includes("null"))
		return null;
	var metadataFileLocation = videoPath.replace("/Videos", "/Videos/_metadata");
	var metadataFileLocation = metadataFileLocation.replace(".mp4", ".txt");
	var metadata;
	var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		metadata = this.responseText;
	}
	xhttp.open("GET", "" + metadataFileLocation, false);
	xhttp.send();
	
	return metadata;
}

function parseTimestampToMs(timestampString)
{
	var timestampMs = 0.0;
	
	let timestampArray = timestampString.split(":");

	let hours = timestampArray[0];
	let minutes = timestampArray[1];
	let seconds = timestampArray[2];

	timestampMs += parseFloat(seconds);
	timestampMs += parseFloat(minutes) * 60.0;
	timestampMs += parseFloat(hours) * 3600.0;

	return timestampMs;
}
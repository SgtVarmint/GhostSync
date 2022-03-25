function getVideoInfo(videoPath)
{
	var metadata = getMetadata(videoPath);
	
	if (metadata == null)
		return {
			details: "",
			thumbnailUrl: "",
			releaseDate: "",
			adBlocks: new Array()
		};
	
	var detailsArray = metadata.split("\n");
	var thumbnailMetadata = getMetadataValue(detailsArray, "Thumbnailurl").replace(/\\/g, "");
    var videoInfo = {
		details:  getMetadataValue(detailsArray, "comment"),
		thumbnailUrl: thumbnailMetadata == "" ? DEFAULT_THUMBNAIL : thumbnailMetadata,
		releaseDate: getMetadataValue(detailsArray, "Date").split("-")[0],
		adBlocks: getAdBlockData(detailsArray)
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
	if (videoPath.includes("/Uploads/"))
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
function getVideoInfo(videoPath)
{
	var metadata = getMetadata(videoPath);
	var detailsArray = metadata.split("\n");
	var thumbnailMetadata = getMetadataValue(detailsArray, "Thumbnailurl").replace(/\\/g, "");
    var videoInfo = {
		details:  getMetadataValue(detailsArray, "comment"),
		thumbnailUrl: thumbnailMetadata == "" ? DEFAULT_THUMBNAIL : thumbnailMetadata
		};
		
	return videoInfo;
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
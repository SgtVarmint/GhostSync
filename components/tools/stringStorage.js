function convertEmojiArrayToStorageFormat(inputArray)
{
	var storageString = "";
	if (inputArray.length != 0)
	{
		for (var i = 0; i < inputArray.length - 1; i++)
		{
			storageString += inputArray[i];
			storageString += "^";
		}
		storageString += inputArray[inputArray.length - 1];
	}
	return storageString;
}

function convertStorageFormatToEmojiArray(inputString)
{
	if (inputString != null)
		favoriteEmojis = inputString.split("^");
}

function getVideoNameFromPath(path = "empty")
{
	var fullPath;
	if (path == "empty")
		fullPath = document.getElementById("filePath").value;
	else
		fullPath = path;
	
	var splitPath = fullPath.split("/");
	var titleWithExtension = splitPath[splitPath.length - 1];
	var videoName = titleWithExtension.replace(/\.[^/.]+$/, "");
	
	return videoName;
}
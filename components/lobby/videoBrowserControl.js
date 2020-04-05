function fetchMetadata()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","fetchMetadata.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			parseMetadata(this);
		}
	}
	xhttp.send("rootDir=" + rootDir());
}

function parseMetadata(file)
{
	var output = "";
	var dirInfo = file.responseText.split(":");
	for (var i = 0; i < dirInfo.length; i++)
	{
		var item = document.createElement("a");
		item.innerHTML = dirInfo[i];
		item.style.display = "block";
		document.getElementById("videoBrowser").appendChild(item);
	}
}
fetchMetadata();
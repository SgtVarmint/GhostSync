function uploadFile()
{
	toast("Keep window open while uploading file(s)");
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/upload/upload.php",true);
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			console.log(this.responseText);
		}
	}
	
	//PROGRESS BAR CODE
	xhttp.addEventListener('progress', function(e)
	{
		//When upload is finished, clean up..
		toast("Upload Done!");
		document.getElementById("uploadProgress").parentNode.removeChild(document.getElementById("uploadProgress"));
		if (document.getElementById("currentDirectory").value.includes("/Uploads/"))
		{
			alert("hit");
			getDirectoryInfo(true);
		}
    }, false);
			
	if ( xhttp.upload )
	{
        xhttp.upload.onprogress = function(e) {
        var done = e.position || e.loaded, total = e.totalSize || e.total;
		if (!document.getElementById("uploadProgress")) //Exists?
		{
			var progress = document.createElement("progress");
			progress.id = "uploadProgress";
			progress.max = "100";
			document.querySelector("body").appendChild(progress);
		}
		var progressValue = (Math.floor(done/total*1000)/10);
		document.getElementById("uploadProgress").value = progressValue;
        console.log('Upload progress: ' + done + ' / ' + total + ' = ' + progressValue + '%');
    };
    }
	
	var files = document.getElementById("fileInput").files;
	var formData = new FormData();
	
	for (var i = 0; i < files.length; i++)
	{
		formData.append("files[]", files[i]);
	}
	
	xhttp.send(formData);
}
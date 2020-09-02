function uploadFile()
{
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/upload/upload.php",true);
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			console.log(this.responseText);
		}
	}
	
	
	var file = document.getElementById("fileInput").files[0];

	xhttp.addEventListener('progress', function(e) {
                var done = e.position || e.loaded, total = e.totalSize || e.total;
                console.log('Upload progress: ' + (Math.floor(done/total*1000)/10) + '%');
            }, false);
			
	if ( xhttp.upload ) {
                xhttp.upload.onprogress = function(e) {
                    var done = e.position || e.loaded, total = e.totalSize || e.total;
                    console.log('Upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
                };
    }
	
	var formData = new FormData();
	formData.append("file", file);
	
	xhttp.send(formData);
}
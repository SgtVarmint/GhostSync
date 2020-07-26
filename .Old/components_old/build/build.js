function updateBuildInfo()
{	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET","/components/build/build_version.txt",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			document.getElementById("versionNumber").innerHTML = this.responseText;
		}
	}
	xhttp.send();
}
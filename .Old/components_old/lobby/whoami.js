function whoami()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","whoami.php",true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			alert(this.responseText);
		}
	}
	xhttp.send();
}
whoami();
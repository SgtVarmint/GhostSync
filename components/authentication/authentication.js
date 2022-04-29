function authenticate()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/authentication/authentication.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			if (this.responseText == "denied")
			{
				location.href = "/index.html";
				console.log("User does not have access to site");
			}
			else
			{
				console.log("Sucessfully Authenticated");
				let xhttp2 = new XMLHttpRequest();
				xhttp2.open("GET", "http://" + localStorage.getItem("auth") + document.location.href.split("http://")[1].split("/")[0] + "/Videos/AuthTouch.txt");
				xhttp2.send();
			}
		}
	}
	xhttp.send("accessCode=" + localStorage.getItem("access"));
}

function homeAuth()
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/authentication/authentication.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			if (this.responseText == "denied")
			{
				document.getElementById("lobbyButton").onclick = function(){ toast("You are not authenticated for access to this site", 2, "body", "5%", "13%", "13%", "0"); };
				console.log("User does not have access to site");
			}
			else
			{
				document.getElementById("lobbyButton").disabled = false;
				localStorage.setItem("auth", this.responseText);
				console.log("Sucessfully Authenticated");
			}
		}
	}
	xhttp.send("accessCode=" + localStorage.getItem("access"));
}

function authButtonClick()
{
	localStorage.setItem("access", document.getElementById("authText").value);
	location.reload();
}

function redirect(path)
{
	let temp = document.location.href.split("http://")[1];
	temp = temp.split("/")[0];
	temp += "/";
	document.location.assign("http://" + localStorage.getItem("auth") + temp + path);
}
function auth(){
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/components/authentication/authentication.php",false);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.response === 'false'){
				document.getElementById("lobbyButton").onclick = function(){ toastMessage("You are not authenticated for access to this site", 2, "body", "5%", "13%", "13%", "0"); };
				return false;
			}
			return true;
		}
	}
	xhttp.send("accessCode=" + localStorage.getItem("access"));
}

function authButtonClick()
{
	localStorage.setItem("access", document.getElementById("authText").value);
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	localStorage.setItem("userName", document.getElementById("userInput").value);
	location.reload();
}
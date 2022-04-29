function performAJAXCall(requester){
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/components/authentication/authentication.php", false);
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			switch(requester){
				case "home":
					homeAuth(this.responseText);
					break;
				case "authenticate":
					authAuth(this.responseText);
					break;
			}
		}
	};
	xhttp.send("accessCode=" + localStorage.getItem("access"));
}

function homeAuth(responseText){
	if(responseText === 'denied'){
		document.getElementById("lobbyButton").onclick = function(){
			toastMessage("You are not authenticated for access to this site", 2, "body", "5%", "13%", "13%", "0");
		};
	} else{
		document.getElementById("lobbyButton").disabled = false;
		localStorage.setItem("auth", responseText);
	}
}

function authAuth(responseText){
	if(responseText === "denied"){
		location.href = "/index.html";
	} else{
		let xhttp2 = new XMLHttpRequest();
		xhttp2.open("GET", "http://" + localStorage.getItem("auth") + document.location.href.split("http://")[1].split("/")[0] + "/Videos/AuthTouch.txt");
		xhttp2.send();
	}
}

function authButtonClick()
{
	localStorage.setItem("access", document.getElementById("authText").value);
	localStorage.setItem("lobbyName", document.getElementById("lobbyInput").value.toUpperCase());
	localStorage.setItem("userName", document.getElementById("userInput").value);
	location.reload();
}

function redirect(path)
{
	let temp = document.location.href.split("http://")[1];
	temp = temp.split("/")[0];
	temp += "/";
	document.location.assign("http://" + localStorage.getItem("auth") + temp + path);
}
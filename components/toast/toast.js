function toast(message, timeout = 1.5)
{
	var toastDiv = document.createElement("div");
	toastDiv.id = "toastDiv";
	toastDiv.style.position = "fixed";
	toastDiv.style.width = "74%";
	toastDiv.style.background = "rgba(79, 79, 79, 0.5)";
	toastDiv.style.textAlign = "center";
	toastDiv.style.marginTop = "15%";
	toastDiv.style.marginLeft = "13%";
	toastDiv.style.marginRight = "13%";
	toastDiv.style.padding = "20px";
	toastDiv.style.borderRadius = "10px";
	toastDiv.innerHTML = message;
	toastDiv.style.color = "white";
	
	document.querySelector("body").appendChild(toastDiv);
	setTimeout(removeToastMessage, timeout * 1000.0);
}

function removeToastMessage()
{
	document.querySelector("body").removeChild(document.getElementById("toastDiv"));
}
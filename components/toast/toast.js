function toast(message, timeout = 2, elementToAppendTo = "body", margTop = "15%", margLeft = "13%", margRight = "13%", styleTop = "100")
{
	var toastDiv = document.createElement("div");
	if (!mobile)
	{
		toastDiv.id = "toastDiv";
		toastDiv.style.position = "fixed";
		toastDiv.style.width = "74%";
		toastDiv.style.background = "rgba(79, 79, 79, 0.5)";
		toastDiv.style.textAlign = "center";
		toastDiv.style.marginTop = margTop;
		toastDiv.style.marginLeft = margLeft;
		toastDiv.style.marginRight = margRight;
		toastDiv.style.padding = "20px";
		toastDiv.style.borderRadius = "10px";
		toastDiv.innerHTML = message;
		toastDiv.style.color = "white";
		toastDiv.style.top = styleTop;
	}
	else
	{
		toastDiv.id = "toastDiv";
		toastDiv.style.position = "fixed";
		toastDiv.style.width = "74%";
		toastDiv.style.background = "rgba(79, 79, 79, 0.5)";
		toastDiv.style.textAlign = "center";
		toastDiv.style.marginTop = margTop;
		toastDiv.style.marginLeft = margLeft;
		toastDiv.style.marginRight = margRight;
		toastDiv.style.padding = "20px";
		toastDiv.style.borderRadius = "10px";
		toastDiv.innerHTML = message;
		toastDiv.style.fontSize = "3em";
		toastDiv.style.color = "white";
		toastDiv.style.top = "500";
	}
	
	document.querySelector(elementToAppendTo).appendChild(toastDiv);
	setTimeout(removeToastMessage, timeout * 1000.0);
}

function removeToastMessage()
{
	//document.querySelector(elementToAppendToG).removeChild(document.getElementById("toastDiv"));
	document.getElementById("toastDiv").parentNode.removeChild(document.getElementById("toastDiv"));
}
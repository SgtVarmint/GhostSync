function ghostConfirm(message, methodToRun, elementToAppendTo = "body", margTop = "15%", margLeft = "13%", margRight = "13%", styleTop = "100")
{
	removeGhostConfirm();
	
	var confirmDiv = document.createElement("div");

	var messageDiv = document.createElement("div");
	messageDiv.innerHTML = message;
	confirmDiv.appendChild(messageDiv);
	
	var buttonDiv = document.createElement("div");
	
	var yesButton = document.createElement("a");
	yesButton.innerHTML = "Yes";
	yesButton.href = "javascript:" + methodToRun + "(true); removeGhostConfirm();";
	yesButton.className = "defaultButton";
	yesButton.style.margin = "10px";
	buttonDiv.appendChild(yesButton);
	
	var noButton = document.createElement("a");
	noButton.innerHTML = "Cancel";
	noButton.href = "javascript:" + methodToRun + "(false); removeGhostConfirm();";
	noButton.className = "defaultButton";
	noButton.style.margin = "10px";
	buttonDiv.appendChild(noButton);
	
	confirmDiv.appendChild(buttonDiv);

	//if (!mobile) --deprecated
	if (true)
	{
		confirmDiv.id = "confirmDiv";
		confirmDiv.style.position = "fixed";
		confirmDiv.style.width = "74%";
		confirmDiv.style.background = "rgba(79, 79, 79, 0.8)";
		confirmDiv.style.border = "2px solid white";
		confirmDiv.style.textAlign = "center";
		confirmDiv.style.marginTop = margTop;
		confirmDiv.style.marginLeft = margLeft;
		confirmDiv.style.marginRight = margRight;
		confirmDiv.style.padding = "20px";
		confirmDiv.style.borderRadius = "10px";
		confirmDiv.style.color = "white";
		confirmDiv.style.top = styleTop;
	}
	else
	{
		confirmDiv.id = "confirmDiv";
		confirmDiv.style.position = "fixed";
		confirmDiv.style.width = "74%";
		confirmDiv.style.background = "rgba(79, 79, 79, 0.8)";
		confirmDiv.style.textAlign = "center";
		confirmDiv.style.marginTop = margTop;
		confirmDiv.style.marginLeft = margLeft;
		confirmDiv.style.marginRight = margRight;
		confirmDiv.style.padding = "20px";
		confirmDiv.style.borderRadius = "10px";
		confirmDiv.style.border = "2px solid white";
		confirmDiv.style.fontSize = "3em";
		confirmDiv.style.color = "white";
		confirmDiv.style.top = "500";
	}
	
	document.querySelector(elementToAppendTo).appendChild(confirmDiv);
}

function removeGhostConfirm()
{
	if (document.getElementById("confirmDiv") != null)
		document.getElementById("confirmDiv").parentNode.removeChild(document.getElementById("confirmDiv"));
}
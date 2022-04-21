function ghostConfirm(message, methodToRun, elementToAppendTo = "body")
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
	buttonDiv.appendChild(yesButton);
	
	var noButton = document.createElement("a");
	noButton.innerHTML = "Cancel";
	noButton.href = "javascript:" + methodToRun + "(false); removeGhostConfirm();";
	noButton.className = "defaultButton";
	buttonDiv.appendChild(noButton);
	
	confirmDiv.id = "confirmDiv";
	confirmDiv.appendChild(buttonDiv);
	
	document.querySelector(elementToAppendTo).appendChild(confirmDiv);
}

function removeGhostConfirm()
{
	if (document.getElementById("confirmDiv") != null)
		document.getElementById("confirmDiv").parentNode.removeChild(document.getElementById("confirmDiv"));
}
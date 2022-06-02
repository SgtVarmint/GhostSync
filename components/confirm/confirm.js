function ghostConfirm(message, methodToRun, includeTextBox = false, elementToAppendTo = "body")
{
	removeGhostConfirm();
	
	var confirmDiv = document.createElement("div");

	var messageDiv = document.createElement("div");
	messageDiv.innerHTML = message;
	confirmDiv.appendChild(messageDiv);
	
	var buttonDiv = document.createElement("div");
	
	var yesButton = document.createElement("a");
	yesButton.id = "ghostConfirmYesButton";
	yesButton.innerHTML = includeTextBox ? "Confirm" : "Yes";
	yesButton.href = "javascript:" + methodToRun + "(true); removeGhostConfirm();";
	yesButton.className = "defaultButton";
	buttonDiv.appendChild(yesButton);
	
	var noButton = document.createElement("a");
	noButton.id = "ghostConfirmNoButton";
	noButton.innerHTML = "Cancel";
	noButton.href = "javascript:" + methodToRun + "(false); removeGhostConfirm();";
	noButton.className = "defaultButton";
	buttonDiv.appendChild(noButton);

	if (includeTextBox)
	{
		var textBoxDiv = document.createElement("div");

		var textBox = document.createElement("input");
		textBox.id = "ghostConfirmInput";
		textBox.addEventListener("keyup", function(event)
		{
			if (event.keyCode === 13)
			{
				event.preventDefault();
				document.getElementById("ghostConfirmYesButton").click();
			}
		});
		
		textBoxDiv.appendChild(textBox);
		confirmDiv.appendChild(textBoxDiv);
	}
	
	confirmDiv.id = "confirmDiv";
	confirmDiv.appendChild(buttonDiv);
	
	document.querySelector(elementToAppendTo).appendChild(confirmDiv);
}

function removeGhostConfirm()
{
	if (document.getElementById("confirmDiv") != null)
		document.getElementById("confirmDiv").parentNode.removeChild(document.getElementById("confirmDiv"));
}
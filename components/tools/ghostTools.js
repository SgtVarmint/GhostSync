function convertMinutesToHours(minutes)
{
	var hours = 0;
	
	while (minutes > 59)
	{
		minutes -= 60;
		hours++;
	}
	
	var minutesString = "";
	
	if (minutes < 10)
		minutesString = "0" + minutes;
	else
		minutesString = minutes;
	
	return hours + ":" + minutesString;
}

function getRandomNumber(length)
{
	length -= 1;
	let number = "1";
	for (let i = 0; i < length; i++)
	{
		number += "0";
	}
		
	let randomNumber = Math.floor((Math.random() * parseInt(number)) + 1);
	
	return randomNumber;
}
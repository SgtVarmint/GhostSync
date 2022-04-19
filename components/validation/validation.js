function formatUsername(username)
{	
	var formattedUsername = username;
	
	formattedUsername = formattedUsername.replaceAll("<", "");
	formattedUsername = formattedUsername.replaceAll(">", "");
	
	if(formattedUsername.length > 18)
	{
		formattedUsername = formattedUsername.substring(0, 18);
	}

	return formattedUsername;
}
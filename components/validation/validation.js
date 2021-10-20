function formatUsername(username)
{
	var formattedUsername;
	if(username.length > 18)
	{
		formattedUsername = username.substring(0, 18);
	}
	else
	{
		formattedUsername = username;
	}
	return formattedUsername;
}
//Emoji list at end of file

function reactionButtonClicked()
{
	if (document.getElementById("reactionMenuContainer").style.display == "block")
	{
		document.getElementById("reactionMenuContainer").style.display = "none";
	}
	else
	{
		document.getElementById("reactionMenuContainer").style.display = "block";
		document.getElementById("reactionMenuContainer").style.top = fullscreenEnabled ? "77%" : "72%";
	}
}

function processIncomingReaction(username, emojiIndex)
{
	if (reactionsAreActive())
	{
		//Format username for reactions so it is limited to 10
		var formattedUsername = username.length > 10 ? username.substring(0, 10) + ".." : username;
		
		var emoji = emojiList[emojiIndex];
		var randomId = Math.floor(Math.random() * 1000);
		var reactionElement = document.createElement("div");
		reactionElement.className = "reactionElement";
		reactionElement.id = randomId;
		reactionElement.innerHTML = "<span class='emojiText'>" + emoji + "</span>" + "<span style='visibility: hidden;'>" + emoji + "</span>" + " - " + formattedUsername;
		document.getElementById("reactionPanel").appendChild(reactionElement);
		setTimeout(function(){
			document.getElementById(reactionElement.id).parentNode.removeChild(document.getElementById(reactionElement.id));
			}, REACTION_STAY_TIME * 1000);
		document.getElementById("reactionPanel").appendChild(reactionElement);
	}
	else
	{
		//Ignore emoji creation
	}
}

function sendReaction(emoji)
{
	if (addFavoriteModeActive) //Add to favorites
	{
		var emojiAlreadyExists = false;
		for (var i = 0; i < favoriteEmojis.length; i++)
		{
			if (favoriteEmojis[i] == emoji)
			{
				emojiAlreadyExists = true;
			}
		}
		if (!emojiAlreadyExists)
		{
			favoriteEmojis.push(emoji);
			localStorage.setItem("favoriteEmojis", convertEmojiArrayToStorageFormat(favoriteEmojis));
			toast("Emoji added to favorites");
			refreshFavorites();
		}
		else
		{
			toast("Emoji is already in favorites!");
		}
	}
	else if (removeFavoriteModeActive) //Remove from favorites
	{
		var tempArray = new Array();
		for (var i = 0; i < favoriteEmojis.length; i++)
		{
			if (favoriteEmojis[i] != emoji)
			{
				tempArray.push(favoriteEmojis[i]);
			}
		}
		favoriteEmojis = tempArray;
		if (favoriteEmojis.length == 0)
		{
			localStorage.removeItem("favoriteEmojis");
		}
		else
		{
			localStorage.setItem("favoriteEmojis", convertEmojiArrayToStorageFormat(favoriteEmojis));
		}
		toast("Emoji removed from favorites");
		
		
		refreshFavorites();
	}
	else //Send emoji to server
	{
		if (reactionsAreActive())
		{
			var emojiIndex = "";
			for (var i = 0; i < emojiList.length; i++)
			{
				if (emoji == emojiList[i])
				{
					emojiIndex += i;
					break;
				}
			}
			queuedReaction = emojiIndex;
			reactionButtonClicked();
		}
		else
		{
			toast("Reactions are disabled in settings!");
		}
	}
}

function reactionsAreActive()
{
	if (localStorage.getItem("lobbyReactionsSetting") == "on")
		return true;
	else
		return false;
}

function addFavoriteButtonClick(forceEnd = false)
{
	if (addFavoriteModeActive || forceEnd == true)
	{
		addFavoriteModeActive = false;
		document.getElementById("addFavoriteButton").style.backgroundColor = "transparent";
	}
	else
	{
		addFavoriteModeActive = true;
		document.getElementById("addFavoriteButton").style.backgroundColor = "gray";
	}
}

function removeFavoriteButtonClick(forceEnd = false)
{
	if (removeFavoriteModeActive || forceEnd == true)
	{
		removeFavoriteModeActive = false;
		document.getElementById("removeFavoriteButton").style.backgroundColor = "transparent";
	}
	else
	{
		removeFavoriteModeActive = true;
		document.getElementById("removeFavoriteButton").style.backgroundColor = "gray";
	}
}

function showFavoriteEmojis()
{
	document.getElementById("reactionMenuFavorites").style.display = "block";
	document.getElementById("reactionMenuAll").style.display = "none";
	document.getElementById("reactionMenuFavoritesButton").style.backgroundColor = "#1e1e1e";
	document.getElementById("reactionMenuAllButton").style.backgroundColor = "gray";
	addFavoriteButtonClick(true);
}

function showAllEmojis()
{
	document.getElementById("reactionMenuFavorites").style.display = "none";
	document.getElementById("reactionMenuAll").style.display = "block";
	document.getElementById("reactionMenuFavoritesButton").style.backgroundColor = "gray";
	document.getElementById("reactionMenuAllButton").style.backgroundColor = "#1e1e1e";
	removeFavoriteButtonClick(true);
}

//This method inserts all of the emojis and clickable elements in the reaction menu
function initializeReactionMenu()
{
	//Section for all tab
	var addFavoriteButton = document.createElement("a");
	addFavoriteButton.innerHTML = "&#x2B;";
	addFavoriteButton.id = "addFavoriteButton";
	addFavoriteButton.className = "emojiElement";
	addFavoriteButton.href = "javascript:addFavoriteButtonClick()";
	document.getElementById("reactionMenuAll").appendChild(addFavoriteButton);
	for (var i = 0; i < emojiList.length; i++)
	{
		var emojiElement = document.createElement("a");
		emojiElement.innerHTML = emojiList[i];
		emojiElement.className = "emojiElement";
		emojiElement.href = "javascript:sendReaction('" + emojiList[i] + "')";
		document.getElementById("reactionMenuAll").appendChild(emojiElement);
	}
	//Section for favorites
	refreshFavorites();
}

function refreshFavorites()
{
	//Clear favorites array and reload from local storage
	convertStorageFormatToEmojiArray(localStorage.getItem("favoriteEmojis"));
	//Clear the favorites page
	document.getElementById("reactionMenuFavorites").innerHTML = "";
	
	if (favoriteEmojis.length != 0)
	{
		var removeFavoriteButton = document.createElement("a");
		removeFavoriteButton.innerHTML = "&#x2D;";
		removeFavoriteButton.id = "removeFavoriteButton";
		removeFavoriteButton.className = "emojiElement";
		removeFavoriteButton.href = "javascript:removeFavoriteButtonClick()";
		if (removeFavoriteModeActive)
			removeFavoriteButton.style.backgroundColor = "#1e1e1e";
		document.getElementById("reactionMenuFavorites").appendChild(removeFavoriteButton);
		for (var i = 0; i < favoriteEmojis.length; i++)
		{
			var emojiElement = document.createElement("a");
			emojiElement.innerHTML = favoriteEmojis[i];
			emojiElement.className = "emojiElement";
			emojiElement.href = "javascript:sendReaction('" + favoriteEmojis[i] + "')";
			document.getElementById("reactionMenuFavorites").appendChild(emojiElement);
		}
	}
}

//Emoji List
var emojiList = [
	"&#x1F603",
	"&#x1F601",
	"&#x1F606",
	"&#x1F605",
	"&#x1F923",
	"&#x1F642",
	"&#x1F643",
	"&#x1F609",
	"&#x1F60A",
	"&#x1F970",
	"&#x1F60D",
	"&#x1F618",
	"&#x1F60B",
	"&#x1F61B",
	"&#x1F61C",
	"&#x1F92A",
	"&#x1F61D",
	"&#x1F914",
	"&#x1F92B",
	"&#x1F610",
	"&#x1F611",
	"&#x1F614",
	"&#x1F634",
	"&#x1F60E",
	"&#x1F615",
	"&#x1F62E",
	"&#x1F626",
	"&#x1F625",
	"&#x1F622",
	"&#x1F624",
	"&#x1F642",
	"&#x1F4A9",
	"&#x2764",
	"&#x1F44C",
	"&#x1F90F",
	"&#x1F595",
	"&#x1F44D",
	"&#x1F44E",
	"&#x1F44F",
	"&#x1F408"
];
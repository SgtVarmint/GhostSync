var desktopModeActive = false;
var mobileModeActive = false;

function checkForMobile()
{
	document.getElementById("topNav").style.visibility = "visible";
	var mq = window.matchMedia( "(max-width: 992px)" );
	if (mq.matches && !mobile || theaterMode) //Mobile
	{
		if (mq.matches)
			document.getElementById("hideButtonContainer").style.display = "none";
		else if (theaterMode)
			document.getElementById("hideButtonContainer").style.display = "inline";
		
		mobile = true;
		
		//Navbar changes, skip if theaterMode
		if (!theaterMode)
		{
			var newNavBar = "";
			newNavBar += '<a class="navButton" href="/index.html" id="home">&#8962;</a>';
			newNavBar += '<a id="videoBrowserButton" class="navButton" href="javascript:videoBrowserButton();">&#x2630;</a>';
			newNavBar += '<a id="youtubeButton" class="navButton" href="javascript:youtubeButton();">&#x25b6;</a>';
			newNavBar += '<a id="settingsButton" class="navButton" href="javascript:settingsButton();">&#9881;</a>';
			document.getElementById("topNav").innerHTML = newNavBar;
			document.getElementById("topNav").style.visibility = "visible";
			let navButtons = document.getElementsByClassName("navButton");
			for (let i = 0; i < navButtons.length; i++)
			{
				navButtons[i].style.width = "10%";
			}
		}
		
		document.getElementById("users").style.clear = "left";
		document.getElementById("users").style.width = "100%";
		document.getElementById("users").style.marginTop = "125px";
		document.getElementById("queueArea").style.clear = "left";
		document.getElementById("queueArea").style.width = "98%";
		document.getElementById("queueArea").style.left = "1%";
		document.getElementById("player").style.width = "100%";
		
		document.getElementById("hideButton").src = "/graphics/HideButtonOpen.png";
		
		if (!mobileModeActive)
		{
			disableBackgroundFade();
		}
		
		mobileModeActive = true;
		desktopModeActive = false;
		
		//Fullscreen button
		//document.getElementById("fullscreenButton").onclick = function(){ toast("Fullscreen not supported on mobile") };
	}
	else if (!mq.matches && mobile)//Desktop
	{
		mobile = false;
		
		document.getElementById("hideButtonContainer").style.display = "inline";
		
		//Navbar changes
		var newNavBar = "";
		newNavBar += '<a class="navButton" href="/index.html" id="home">GhostSync</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a id="videoBrowserButton" class="navButton" href="javascript:videoBrowserButton();">Video Browser</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a id="youtubeButton" class="navButton" href="javascript:youtubeButton();">Youtube</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a id="settingsButton" class="navButton" href="javascript:settingsButton();">Settings</a>';
		document.getElementById("topNav").innerHTML = newNavBar;
		document.getElementById("topNav").style.visibility = "visible";
		let navButtons = document.getElementsByClassName("navButton");
		for (let i = 0; i < navButtons.length; i++)
		{
			navButtons[i].style.width = "17%";
		}
		
		document.getElementById("users").style.clear = "none";
		document.getElementById("users").style.width = "34%";
		document.getElementById("users").style.marginTop = "0";
		document.getElementById("queueArea").style.clear = "none";
		document.getElementById("queueArea").style.width = "34%";
		document.getElementById("queueArea").style.left = "0";
		document.getElementById("player").style.width = "65%";
		
		document.getElementById("hideButton").src = "/graphics/HideButton.png";

		if (!desktopModeActive)
		{
			disableBackgroundFade();
		}
		
		mobileModeActive = false;
		desktopModeActive = true;
		
		//Fullscreen button
		//document.getElementById("fullscreenButton").onclick = fullscreenButtonClicked;
	}
}

function checkForMobileHome()
{
	var mq = window.matchMedia( "(max-width: 992px)" );
	if (mq.matches) //Mobile
	{
		mobile = true;
		//Navbar changes
		var newNavBar = "";
		newNavBar += '<a class="navButton" href="/index.html" id="home">&#8962;</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a class="navButton" href="javascript: authenticationButton();">&#x1f513;</a>';
		document.getElementById("topNav").innerHTML = newNavBar;
		document.getElementById("topNav").style.visibility = "visible";
	}
	else if (!mq.matches)//Desktop
	{
		mobile = false;
		//Navbar changes
		var newNavBar = "";
		newNavBar += '<a class="navButton" href="/index.html" id="home">GhostSync</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a class="navButton" href="javascript: authenticationButton();">Authentication</a>';
		document.getElementById("topNav").innerHTML = newNavBar;
		document.getElementById("topNav").style.visibility = "visible";
	}
}
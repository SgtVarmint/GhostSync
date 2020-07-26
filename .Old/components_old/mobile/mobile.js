function checkForMobile()
{
	document.getElementById("topNav").style.visibility = "visible";
	var mq = window.matchMedia( "(max-width: 992px)" );
	if (mq.matches && !mobile) //Mobile
	{
		mobile = true;
		//Navbar changes
		var newNavBar = "";
		newNavBar += '<a class="navButton" href="/index.html" id="home">&#8962;</a>';
		newNavBar += '<a class="navButton" href="javascript:videoBrowserButton();">&#x2630;</a>';
		newNavBar += '<a class="navButton" href="javascript:youtubeButton();">&#x25b6;</a>';
		newNavBar += '<a class="navButton" href="javascript:settingsButton();">&#9881;</a>';
		document.getElementById("topNav").innerHTML = newNavBar;
		document.getElementById("topNav").style.visibility = "visible";
		
		//Fullscreen button
		document.getElementById("fullscreenButton").onclick = function(){ toast("Fullscreen not supported on mobile") };
	}
	else if (!mq.matches && mobile)//Desktop
	{
		mobile = false;
		//Navbar changes
		var newNavBar = "";
		newNavBar += '<a class="navButton" href="/index.html" id="home">GhostSync</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a class="navButton" href="javascript:videoBrowserButton();">Video Browser</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a class="navButton" href="javascript:youtubeButton();">Youtube</a>';
		newNavBar += '<span class="divider"></span>';
		newNavBar += '<a class="navButton" href="javascript:settingsButton();">Settings</a>';
		document.getElementById("topNav").innerHTML = newNavBar;
		document.getElementById("topNav").style.visibility = "visible";
		
		//Fullscreen button
		document.getElementById("fullscreenButton").onclick = fullscreenButtonClicked;
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
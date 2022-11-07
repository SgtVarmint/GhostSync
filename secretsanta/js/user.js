/**
 * userData["name"]:            String  Name of user
 * userData["recipient"]:       String  Who the user is buying gifts for
 * userData["giftsOrdered"]:    Boolean Has the user ordered their gifts?
 * userData["giftsShipped"]:    Boolean Have the gifts been shipped out?
 * userData["giftsDelivered"]:  Boolean Have the gifts been delivered?
 * userData["giftsRecieved"]:   Boolean Has the user recieved their gifts?
 */

//DONE
function serveUserPrompt()
{
    let userDiv = document.getElementById("user");
    userDiv.innerHTML = "";

    let text = document.createElement("p");
    text.innerHTML = "Enter your 20 digit identifier to login";

    let input = document.createElement("input");
    input.id = "loginInput";

    let button = document.createElement("button");
    button.id = "loginButton";
    button.innerHTML = "Login";
    button.onclick = loginButtonClick;

    userDiv.appendChild(text);
    userDiv.appendChild(input);
    userDiv.appendChild(button);
}

//DONE
function loginButtonClick()
{
    userLogin(document.getElementById("loginInput").value);
}

//DONE
function userLogin(userId)
{
    let response = "";
	var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		response = this.responseText;
        response = JSON.parse(atob(response));
        if (!response) //File not found
        {
            alert("User not found");
        }
        else //File found
        {
            document.getElementById("currentUser").value = userId;
            localStorage.setItem("userIdSS", userId);
            serveUserInfo(userId, response);
            serveStats();
        }
	}
	xhttp.open("POST", "/secretsanta/php/getUserInfo.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("userId="+userId);
}

//DONE
function serveUserInfo(userId, userData)
{
    let currentUsername = userData["name"];
    let userDiv = document.getElementById("user");
    userDiv.innerHTML = ""; 
    if (!userData["recipient"] || userData["recipient"] === "") //First time, must ask initial questions
    {
        let text = document.createElement("p");
        text.innerHTML = "Welcome to Secret Santa, " + currentUsername + "!  Enter the first name of your gift recipient:";

        let input = document.createElement("input");
        input.id = "recipientInput";

        let button = document.createElement("button");
        button.id = "recipientButton";
        button.innerHTML = "Update";
        button.onclick = recipientSet;

        userDiv.appendChild(text);
        userDiv.appendChild(input);
        userDiv.appendChild(button);
    }
    else //Serve normal view
    {
        let text1 = document.createElement("span");
        text1.innerHTML = "Your recipient: ";
        let recipient = document.createElement("span");
        recipient.id = "recipient";
        recipient.innerHTML = userData["recipient"];

        let div1 = document.createElement("div");
        div1.id = "recipientDiv";
        div1.appendChild(text1);
        div1.appendChild(recipient);

        let text2 = document.createElement("span");
        text2.innerHTML = "How many items should your recipient expect?";
        let packageNumberInput = document.createElement("input");
        packageNumberInput.type = "number";
        packageNumberInput.id = "packageNumber";
        packageNumberInput.value = userData["numPackages"];

        let div2 = document.createElement("div");
        div2.appendChild(text2);
        div2.appendChild(packageNumberInput);

        let text3 = document.createElement("span");
        text3.innerHTML = "Have you ordered your gift(s)?";
        let orderedCheck = document.createElement("input");
        orderedCheck.id = "giftsOrdered";
        orderedCheck.type = "checkbox";
        orderedCheck.checked = userData["giftsOrdered"];

        let div3 = document.createElement("div");
        div3.appendChild(text3);
        div3.appendChild(orderedCheck);

        let text4 = document.createElement("span");
        text4.innerHTML = "Have/has your gift(s) been shipped yet?";
        let shippedCheck = document.createElement("input");
        shippedCheck.id = "giftsShipped";
        shippedCheck.type = "checkbox";
        shippedCheck.checked = userData["giftsShipped"];

        let div4 = document.createElement("div");
        div4.appendChild(text4);
        div4.appendChild(shippedCheck);

        let text5 = document.createElement("span");
        text5.innerHTML = "Have/has your gift(s) been confirmed delivered yet?";
        let deliveredCheck = document.createElement("input");
        deliveredCheck.id = "giftsDelivered";
        deliveredCheck.type = "checkbox";
        deliveredCheck.checked = userData["giftsDelivered"];

        let div5 = document.createElement("div");
        div5.appendChild(text5);
        div5.appendChild(deliveredCheck);

        let text6 = document.createElement("span");
        text6.innerHTML = "Have you received your gift(s) yet?";
        let recievedCheck = document.createElement("input");
        recievedCheck.id = "giftsRecieved";
        recievedCheck.type = "checkbox";
        recievedCheck.checked = userData["giftsRecieved"];

        let div6 = document.createElement("div");
        div6.appendChild(text6);
        div6.appendChild(recievedCheck);

        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.onclick = userUpdate;

        let alertNotice = document.createElement("span");
        alertNotice.innerHTML = "";
        alertNotice.id = "buttonNotice";

        userDiv.appendChild(div1);
        userDiv.appendChild(div2);
        userDiv.appendChild(div3);
        userDiv.appendChild(div4);
        userDiv.appendChild(div5);
        userDiv.appendChild(div6);
        userDiv.appendChild(updateButton);
        userDiv.appendChild(document.createElement("br"));
        userDiv.appendChild(alertNotice);
        userDiv.appendChild(document.createElement("hr"));

        //Get individual info
        //let recipientId = getUserId(userInfo[0]);

        statArray = pullUserStats(userId);
        let numPackages = statArray["numPackages"];
        let giftsOrdered = statArray["giftsOrdered"];
        let giftsShipped = statArray["giftsShipped"];
        let giftsDelivered = statArray["giftsDelivered"];
        let recipientConfirmedRecieve = statArray["giftsRecieved"];
        
        let text7 = document.createElement("span");

        if (giftsDelivered)
        {
            text7.innerHTML = "According to your Secret Santa, you should have already received " + numPackages + " gift(s)!";
        }
        else if (giftsShipped)
        {
            text7.innerHTML = "According to your Secret Santa, your " + numPackages + " gift(s) has/have been shipped and is/are on the way to you!"
        }
        else if (giftsOrdered)
        {
            text7.innerHTML = "According to your Secret Santa, they have ordered your gift(s)!  You can expect " + numPackages + " gift(s) to be on your way soon!"
        }
        else
        {
            text7.innerHTML = "No updates from your Secret Santa yet.  Check here for updates on your gifts!";
        }
        
        userDiv.appendChild(text7);
        userDiv.appendChild(document.createElement("br"));
        userDiv.appendChild(document.createElement("hr"));

        let text8 = document.createElement("span");
        text8.innerHTML = recipientConfirmedRecieve ?
                            "Your recipient confirmed that they received their gift(s)!  Hurray!" :
                            "Your recipient is still waiting on receiving their gift(s)";

        userDiv.appendChild(text8);
    }
}

//DONE
function recipientSet()
{
    let recipient = document.getElementById("recipientInput").value;

    //Check if user exists first
    let userId = getUserId(recipient);

    if (!userId)
    {
        alert("User not found!  Make sure you spell their name correctly and capitalize the first letter");
        return;
    }

    let updateArray = {};
    updateArray["recipient"] = recipient;
    updateArray["numPackages"] = 0;
    updateArray["giftsOrdered"] = 0;
    updateArray["giftsShipped"] = 0;
    updateArray["giftsDelivered"] = 0;
    updateArray["giftsRecieved"] = 0;

    var updateJSON = JSON.stringify(updateArray);
    var currentUser = document.getElementById("currentUser").value;

    var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		serveUserInfo(document.getElementById("currentUser").value, updateArray);
	}
	xhttp.open("POST", "/secretsanta/php/updateUserInfo.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("userId=" + currentUser + "&userData=" + btoa(updateJSON));
}

//DONE
function userUpdate()
{
    let recipient = document.getElementById("recipient").innerHTML;
    let numPackages = document.getElementById("packageNumber").value;
    let giftsOrdered = document.getElementById("giftsOrdered").checked;
    let giftsShipped = document.getElementById("giftsShipped").checked;
    let giftsDelivered = document.getElementById("giftsDelivered").checked;
    let giftsRecieved = document.getElementById("giftsRecieved").checked;

    var updateArray = {};
    updateArray["recipient"] = getUserId(recipient);
    updateArray["numPackages"] = numPackages;
    updateArray["giftsOrdered"] = giftsOrdered;
    updateArray["giftsShipped"] = giftsShipped;
    updateArray["giftsDelivered"] = giftsDelivered;
    updateArray["giftsRecieved"] = giftsRecieved;

    var updateJSON = JSON.stringify(updateArray);
    var currentUser = document.getElementById("currentUser").value;

    var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
        if (this.responseText == "Success")
        {
            serveStats();
            document.getElementById("buttonNotice").style.color = "green";
            document.getElementById("buttonNotice").innerHTML = "Update Saved!";
            setTimeout(function(){ document.getElementById("buttonNotice").innerHTML = "" }, 2000);
        }
        else
        {
            console.log(this.responseText);
            document.getElementById("buttonNotice").style.color = "black";
            document.getElementById("buttonNotice").innerHTML = "Something went wrong..";
            setTimeout(function(){ document.getElementById("buttonNotice").innerHTML = "" }, 2000);
        }
	}
	xhttp.open("POST", "/secretsanta/php/updateUserInfo.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("userId=" + currentUser + "&userData=" + btoa(updateJSON));
}

//DONE
function getUserId(username)
{
    var encodedUserId;
    var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		encodedUserId = this.responseText;
	}
	xhttp.open("POST", "/secretsanta/php/getUserId.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name="+username);
    return atob(encodedUserId);
}
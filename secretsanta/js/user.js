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

//TODO
function serveUserInfo(userId, userData)
{
    let currentUsername = userData["name"];
    let userDiv = document.getElementById("user");
    userDiv.innerHTML = "";

    //userInfo = userData.split("^");
    //userInfo[0] = Who did this user get? (a name)
    //userInfo[1] = How many packages should the recipient expect? (number)
    //userInfo[2] = Has this user ordered the gift(s)? (boolean)
    //userInfo[3] = Did the item(s) ship yet? (boolean)
    //userInfo[4] = Delivery confirmed yet? (boolean)
    //userInfo[5] = Did this user recieve their gift(s) yet? (boolean)

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

        statArray = pullUserStats();

        let numberOfPackages = "0";
        let giftOrdered = false;
        let giftShipped = false;
        let giftDelivered = false;
    
        let thisUserId = document.getElementById("currentUser").value;

        for (let i = 0; i < statArray.length; i++)
        {
            let userInfo2 = statArray[i].split("^");
            //userInfo[0] = Who did this user get? (a name)
            //userInfo[1] = How many packages should the recipient expect? (number)
            //userInfo[2] = Has this user ordered the gift(s)? (boolean)
            //userInfo[3] = Did the item(s) ship yet? (boolean)
            //userInfo[4] = Delivery confirmed yet? (boolean)
            //userInfo[5] = Did this user recieve their gift(s) yet? (boolean)
            let tempUserId = getUserId(userInfo2[0]);
            if (tempUserId == thisUserId)
            {
                numberOfPackages = userInfo2[1];
                giftOrdered = userInfo2[2] == "1" ? true : false;
                giftShipped = userInfo2[3] == "1" ? true : false;
                giftDelivered = userInfo2[4] == "1" ? true : false;
                break;
            }
        }

        let text7 = document.createElement("span");

        if (giftDelivered)
        {
            text7.innerHTML = "According to your Secret Santa, you should have already received " + numberOfPackages + " gift(s)!";
        }
        else if (giftShipped)
        {
            text7.innerHTML = "According to your Secret Santa, your " + numberOfPackages + " gift(s) has/have been shipped and is/are on the way to you!"
        }
        else if (giftOrdered)
        {
            text7.innerHTML = "According to your Secret Santa, they have ordered your gift(s)!  You can expect " + numberOfPackages + " gift(s) to be on your way soon!"
        }
        else
        {
            text7.innerHTML = "No updates from your Secret Santa yet.  Check here for updates on your gifts!";
        }
        
        userDiv.appendChild(text7);
        userDiv.appendChild(document.createElement("br"));
        userDiv.appendChild(document.createElement("hr"));

        let recipientConfirmedRecieve = false;

        for (let i = 0; i < statArray.length; i++)
        {
            let userInfo2 = statArray[i].split("^");
            //userInfo[0] = Who did this user get? (a name)
            //userInfo[1] = How many packages should the recipient expect? (number)
            //userInfo[2] = Has this user ordered the gift(s)? (boolean)
            //userInfo[3] = Did the item(s) ship yet? (boolean)
            //userInfo[4] = Delivery confirmed yet? (boolean)
            //userInfo[5] = Did this user recieve their gift(s) yet? (boolean)
            //userInfo[6] = This user's ID
            let tempUserId = userInfo2[6];
            if (tempUserId == getUserId(userInfo[0]))
            {
                recipientConfirmedRecieve = userInfo2[5] == "1" ? true : false;
                break;
            }
        }

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
    let userId = "";

    var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		userId = this.responseText;
        userId = JSON.parse(atob(userId));
	}
	xhttp.open("POST", "/secretsanta/php/getUserId.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name="+recipient);

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
    updateArray["recipient"] = recipient;
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

//TODO
function getUsername(userId)
{
    let username = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        userData = this.responseText;
        return atob(username);
    }
    let userList = "";

	xhttp.open("GET", "/secretsanta/data/userLookup.txt", false);
    xhttp.send();

    let userArray = userList.split("\n");
    for (let i = 0; i < userArray.length; i++)
    {
        let userInfo = userArray[i].split("^");
        //userInfo[0] = userId
        //userInfo[1] = username
        if (userInfo[0] == userId)
        {
            let tempName = userInfo[1].trimEnd();
            return tempName;
        }
    }
    return "<UnknownUser>";
}

//TODO
function getUserInfo(userId){
    let userData = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        var data = this.responseText;
        userData = JSON.parse(atob(data));
    }
    xhttp.open("POST", "/secretsanta/php/getUserInfo.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("userId="+userId);
}

//TODO
//I think I cant return the value like this because even though userId is populated here, the return is empty :(
function getUserId(username)
{
    let userId = "";

    var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		userId = this.responseText;
        userId = atob(userId);
	}
	xhttp.open("POST", "/secretsanta/php/getUserId.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name="+username);
}
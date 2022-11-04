function serveStats()
{
    let stats = document.getElementById("stats");
    stats.innerHTML = "";

    statArray = pullUserStats();

    let orderedCount = 0;
    let shippedCount = 0;
    let deliveredCount = 0;
    let recievedCount = 0;

    for (let i = 0; i < statArray.length; i++)
    {
        let userInfo = statArray[i].split("^");
        //userInfo[0] = Who did this user get? (a name)
        //userInfo[1] = How many packages should the recipient expect? (number)
        //userInfo[2] = Has this user ordered the gift(s)? (boolean)
        //userInfo[3] = Did the item(s) ship yet? (boolean)
        //userInfo[4] = Delivery confirmed yet? (boolean)
        //userInfo[5] = Did this user recieve their gift(s) yet? (boolean)

        if (userInfo[2] == "1")
            orderedCount++;
        if (userInfo[3] == "1")
            shippedCount++;
        if (userInfo[4] == "1")
            deliveredCount++;
        if (userInfo[5] == "1")
            recievedCount++;
    }

    //stats.innerHTML = orderedCount + " - " + shippedCount + " - " + deliveredCount + " - " + recievedCount;

    let chart1 = document.createElement("div");
    chart1.id = "chart_div1";

    let chart2 = document.createElement("div");
    chart2.id = "chart_div2";

    let chart3 = document.createElement("div");
    chart3.id = "chart_div3";

    let chart4 = document.createElement("div");
    chart4.id = "chart_div4";

    stats.appendChild(chart1);
    stats.appendChild(chart2);
    stats.appendChild(chart3);
    stats.appendChild(chart4);

    let total = statArray.length;

    drawChart1(orderedCount, total - orderedCount);
    drawChart2(shippedCount, total - shippedCount);
    drawChart3(deliveredCount, total - deliveredCount);
    drawChart4(recievedCount, total - recievedCount);

    console.log(orderedCount + " : " + shippedCount + " : " + deliveredCount + " : " + recievedCount);

    document.querySelector("#chart_div1 > div").className = "pieChart";
    document.querySelector("#chart_div2 > div").className = "pieChart";
    document.querySelector("#chart_div3 > div").className = "pieChart";
    document.querySelector("#chart_div4 > div").className = "pieChart";
}

function pullUserStats()
{
    let userStatList = new Array();

    let userList = "";
    let userIdArray = new Array();

    var xhttp = new XMLHttpRequest();
	xhttp.onload = function(){
		userList = this.responseText;
	}
	xhttp.open("GET", "/secretsanta/data/userLookup.txt", false);
    xhttp.send();

    let userArray = userList.split("\n");
    for (let i = 0; i < userArray.length; i++)
    {
        let userInfo = userArray[i].split("^");
        //userInfo[0] = userId
        //userInfo[1] = username
        userIdArray.push(userInfo[0]);
    }


    for (let i = 0; i < userIdArray.length; i++)
    {
        var xhttp2 = new XMLHttpRequest();
        xhttp2.onload = function(){
            response = this.responseText;
            if (response.charAt(0) == "<") //File not found
            {
                console.log("Missing user file for stat gathering");
            }
            else //File found
            {
                let newResponse = response + "^" + userIdArray[i];
                userStatList.push(newResponse)
            }
        }
        xhttp2.open("GET", "/secretsanta/data/" + userIdArray[i] + ".txt", false);
        xhttp2.send();
    }

    return userStatList;
}
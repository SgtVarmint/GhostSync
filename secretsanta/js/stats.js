//DONE
function serveStats()
{
    let stats = document.getElementById("stats");
    stats.innerHTML = "";

    statArray = getGiftsStatus();

    let orderedCount = statArray["giftsOrdered"];
    let shippedCount = statArray["giftsShipped"];
    let deliveredCount = statArray["giftsDelivered"];
    let recievedCount = statArray["giftsRecieved"];
    let total = statArray["total"];

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

function getGiftsStatus(){
    var status = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        status = this.responseText;
        status = JSON.parse(atob(status));
    }

    xhttp.open("GET", "/secretsanta/php/getGiftsStatus.php", false);
    xhttp.send();
    return status;
}

//DONE
function pullUserStats(userId){
    var userList;
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        userList = this.responseText;
        userList = JSON.parse(atob(userList));
    }
    xhttp.open("POST", "/secretsanta/php/getUserInfo.php", false);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("userId="+userId+"&giver=true");

    return userList;
}
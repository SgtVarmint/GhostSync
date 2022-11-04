window.onload = function(){

    let userId = localStorage.getItem("userIdSS");
    if (userId != null)
    {
        document.getElementById("currentUser").value = userId;
        userLogin(userId);
    }
    else
    {
        serveUserPrompt();
    }
}